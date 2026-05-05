# Términos y Condiciones — Static Content Section

## Context

`/terminos-y-condiciones` is rendered by `src/pages/LegalPage.tsx`, which fetches its body from Contentful via `useContentfulPage` and slug map (`terminos-y-condiciones` → `terminos-y-condiciones-unibank`). Since I can't write to your Contentful space from Lovable, I'll render this content directly in the React app, beneath any existing Contentful body, only for the `terminos-y-condiciones` slug.

## What you'll see

A well-typeset legal document with:
- Section headers each paired with a small icon chip in brand orange
- Generous spacing, readable measure (max-width ~720px)
- Bulleted lists with orange markers
- Key terms (USER-ID, PASSWORD, TOKEN, UniBank, Ley 81 de 2019, etc.) bolded
- Inline link to **Aviso de Privacidad** at the end of "Protección de Datos"

Sections rendered (in order):
1. Aviso
2. Encriptación
3. Certificación
4. Autenticación (with bulleted Usuario/Imagen/Token sub-points)
5. Monitoreo
6. Recomendaciones generales de seguridad
7. Recomendaciones para el manejo del Token físico
8. Cajeros Automáticos
9. Transferencias Internacionales
10. Tarjetas Débito Clave | Mastercard
11. Protección de Datos (with link → `/aviso-de-privacidad`)

## Technical changes

1. **Create `src/components/legal/TerminosContent.tsx`**
   - Self-contained component exporting `<TerminosContent />`
   - Local `Section` helper: icon chip (`bg-primary/10 text-primary`, rounded), `h2` title, body
   - Local `Bullets` helper: `ul` with `marker:text-primary` for branded bullets
   - Uses `lucide-react` icons (ShieldCheck, Lock, Fingerprint, Activity, KeyRound, Banknote, Globe2, CreditCard, FileLock2)
   - Uses semantic tokens only (`text-foreground`, `text-muted-foreground`, `text-primary`, `bg-primary/10`)
   - Final paragraph uses `react-router-dom` `<Link to="/aviso-de-privacidad">` for the Aviso de Privacidad reference

2. **Edit `src/pages/LegalPage.tsx`**
   - Import `TerminosContent` and `useParams` slug
   - After the existing Contentful `content` block, conditionally render `<TerminosContent />` when `slug === "terminos-y-condiciones"`
   - This way: if Contentful body is empty, the static content still appears; if Contentful has body, the static content appears below it (no data loss either way)

No changes to routing, design tokens, or other pages.
