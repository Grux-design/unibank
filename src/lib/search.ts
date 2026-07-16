/** Accent-insensitive, case-insensitive string normalization for search. */
export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeQuery(query: string): string[] {
  return normalizeSearchText(query)
    .split(" ")
    .filter((token) => token.length > 0);
}

export interface SearchableEntry {
  label: string;
  desc: string;
  href: string;
  category?: string;
  tags?: string[];
  synonyms?: string[];
  priority?: number;
}

export interface ScoredSearchResult<T extends SearchableEntry> {
  item: T;
  score: number;
}

function buildHaystack(entry: SearchableEntry): {
  label: string;
  desc: string;
  href: string;
  category: string;
  tags: string;
  synonyms: string;
  all: string;
} {
  const label = normalizeSearchText(entry.label);
  const desc = normalizeSearchText(entry.desc);
  const href = normalizeSearchText(entry.href.replace(/\//g, " "));
  const category = normalizeSearchText(entry.category ?? "");
  const tags = normalizeSearchText((entry.tags ?? []).join(" "));
  const synonyms = normalizeSearchText((entry.synonyms ?? []).join(" "));
  return {
    label,
    desc,
    href,
    category,
    tags,
    synonyms,
    all: [label, desc, href, category, tags, synonyms].filter(Boolean).join(" "),
  };
}

function scoreToken(token: string, fields: ReturnType<typeof buildHaystack>): number {
  if (fields.label === token) return 120;
  if (fields.label.startsWith(token) || fields.label.split(" ").includes(token)) return 90;
  if (fields.label.includes(token)) return 70;
  if (fields.synonyms.split(" ").includes(token) || fields.synonyms.includes(token)) return 60;
  if (fields.tags.split(" ").includes(token) || fields.tags.includes(token)) return 45;
  if (fields.category.includes(token)) return 30;
  if (fields.href.includes(token)) return 25;
  if (fields.desc.includes(token)) return 20;
  if (fields.all.includes(token)) return 10;
  return 0;
}

/**
 * Filter and rank searchable entries.
 * - Empty query returns the catalog sorted by priority (higher first), then label.
 * - Multi-word queries require every token to match somewhere (AND).
 * - Accent folding so "credito" matches "crédito".
 */
export function searchEntries<T extends SearchableEntry>(
  entries: T[],
  query: string,
  options?: { limit?: number },
): T[] {
  const limit = options?.limit ?? 40;
  const tokens = tokenizeQuery(query);

  if (tokens.length === 0) {
    return [...entries]
      .sort((a, b) => {
        const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);
        if (priorityDiff !== 0) return priorityDiff;
        return a.label.localeCompare(b.label, "es");
      })
      .slice(0, limit);
  }

  const scored: ScoredSearchResult<T>[] = [];

  for (const entry of entries) {
    const fields = buildHaystack(entry);
    let total = 0;
    let matchedAll = true;

    for (const token of tokens) {
      const tokenScore = scoreToken(token, fields);
      if (tokenScore === 0) {
        matchedAll = false;
        break;
      }
      total += tokenScore;
    }

    if (!matchedAll) continue;

    // Prefer exact / near-exact label matches and higher priority pages.
    if (fields.label === tokens.join(" ")) total += 80;
    total += (entry.priority ?? 0) * 3;

    scored.push({ item: entry, score: total });
  }

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.label.localeCompare(b.item.label, "es");
    })
    .slice(0, limit)
    .map((result) => result.item);
}
