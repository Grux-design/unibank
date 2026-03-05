
## Plan: Site-Wide Search Overlay

### Reference analysis
The screenshots show a command-palette-style search overlay:
- Dark rounded container, full-width input with a search icon on the left and an "Esc" kbd badge on the right
- Results list below a divider: each row has an icon on the left, **bold title** on top, muted subtitle below
- Highlighted/hovered row has a slightly lighter background
- When typing, filtered results update live
- Empty state when no results match
- "Navigating..." loading label with a spinner and a stop button (for future use, we'll just show it as a static UI element on navigation)

### Architecture

**New file: `src/components/organisms/SearchOverlay.tsx`**
Full-screen backdrop (`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm`) with a centered card (`max-w-lg w-full mx-auto mt-24`). The card has:
- Top row: `<Search>` icon + `<input>` + `<kbd>Esc</kbd>` badge
- Thin `<hr>` separator
- Scrollable results list (max-h ~[320px])
- Each result row: icon (from lucide, category-specific) + title (bold) + subtitle (muted, smaller)
- Hover: `bg-foreground/5 rounded-lg` highlight
- Empty state: centered icon + "No results found" message

**Site index (static data, defined inside the component):**
```ts
const siteIndex = [
  { title: "Inicio",          subtitle: "Página principal",             href: "/",         icon: Home },
  { title: "Nosotros",        subtitle: "Quiénes somos",                href: "/about",    icon: Users },
  { title: "Servicios",       subtitle: "Productos y soluciones",       href: "/services", icon: Briefcase },
  { title: "Blog",            subtitle: "Artículos y noticias",         href: "/blog",     icon: FileText },
  { title: "Contacto",        subtitle: "Escríbenos o llámanos",        href: "/contact",  icon: Phone },
  { title: "Cuenta de Ahorros", subtitle: "Para personas naturales",   href: "/cuenta-ahorros", icon: PiggyBank },
  { title: "Cuenta Jurídica", subtitle: "Para empresas y negocios",     href: "/cuenta-juridica", icon: Building2 },
  { title: "Banca en Línea",  subtitle: "Accede a tu cuenta",          href: "/login",    icon: Lock },
]
```
Filtered in real time via `.filter()` on query string (title + subtitle, case-insensitive).

**Interaction:**
- Opens when clicking the search button in `NavActions`
- Closes on Esc key, backdrop click, or after navigating
- `useNavigate` + `useEffect` to close after route change

**Wiring:**
- Lift `searchOpen` state to `NavActions` (already self-contained) — pass `onSearchOpen` from `NavActions` to a trigger button
- Actually simpler: keep all state inside `NavActions`, render `<SearchOverlay>` as a portal sibling there using a `useState` flag

**"Navigating..." state:**
- When user clicks a result, set `navigating = true` for ~800ms showing the bottom bar: spinner + "Navigating..." text + stop circle icon — then close

### Files to create/edit

1. **Create** `src/components/organisms/SearchOverlay.tsx` — full overlay component
2. **Edit** `src/components/molecules/NavActions.tsx` — add `searchOpen` state, wire search button `onClick`, render `<SearchOverlay>` 

### Animation
- Overlay backdrop: `opacity-0` → `opacity-100`, duration-200
- Card: `opacity-0 scale-95 translate-y-2` → `opacity-100 scale-100 translate-y-0`, duration-200 ease-out
- Results: immediate (no stagger needed, keeps it snappy)
- "Navigating..." bar: slides up from bottom of card
