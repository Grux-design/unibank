## Goal
Transform `/trabaja-con-nosotros` from the current basic layout into a top-notch, modern careers landing page inspired by leading HR platforms (Greenhouse, Lever, Notion Careers, Linear). The footer link already points here — no routing changes needed.

## Design direction
Editorial, generous whitespace, brand orange `#ff8136` accents on near-black `#000000F5`, Inter typography. Dark hero with a soft gradient + subtle grid texture, then a bright, focused application form section.

### Page structure

1. **Hero (dark, full-bleed)**
   - Eyebrow pill: "Carreras en UniBank"
   - Large headline: "Construye el futuro de la banca con nosotros"
   - Subheadline (the user's intro copy about joining the team / RR.HH. database)
   - Two trust stats (e.g. "+30 años creando oportunidades", "Sede principal en Avenida Balboa")
   - Floating glass-card decoration (reuse `HeroGlassCard` style language)
   - Anchor button "Aplicar ahora" → smooth-scroll to `#aplicar`

2. **Why UniBank strip** (3 perks, refined)
   - Keep `Briefcase / Users / TrendingUp` perks, restyled as bordered cards with hover lift, icon in tinted square (rounded-2xl), small uppercase label.

3. **Process steps** (new, 3 columns)
   - "01 Aplica" → "02 Conversamos" → "03 Te integras"
   - Numbered, minimal, hairline divider between cards on desktop.

4. **Application form section `#aplicar`** (hero of the page)
   - Two-column layout on desktop:
     - **Left (5 cols):** Sticky promotional column with headline "Cuéntanos sobre ti", supporting copy, contact email, and a small list of what happens next.
     - **Right (7 cols):** The form inside a soft card (`rounded-2xl`, `border-border/60`, subtle shadow).
   - Fields (per spec, all required):
     - Nombre *
     - Teléfono *
     - Email *
     - Mensaje * (Textarea)
     - **Archivos Adjuntos *** — drag-and-drop dropzone with hint text: *"Adjunta tu Hoja de vida, Portafolio o Carta de presentación. Formatos: PDF, DOC, DOCX, PNG, JPG. Máximo 5 MB."* Show file chip with name + size + remove (×) button after selection.
     - **Captcha** — lightweight math captcha ("¿Cuánto es 4 + 3?") with a refresh icon. Validated client-side via zod refinement. (No third-party key required; can upgrade to hCaptcha/Turnstile later if desired.)
   - Submit button full-width on mobile, auto on desktop, with loading state.

5. **Closing band**
   - Small reassurance line: "Tus datos se almacenan de forma segura y serán usados únicamente para procesos de selección."

### Technical changes

- **`src/pages/TrabajaConNosotrosPage.tsx`** (rewrite):
  - Update zod schema to require **all four text fields**, require a file (size ≤ 5 MB, allowed mime types), and require captcha answer to equal expected value.
  - Switch upload to support the new mime list (`pdf, doc, docx, png, jpg, jpeg`); keep using existing `cv-files` Supabase storage bucket and `job_applications` table (no DB migration needed — `cv_url` already stores the file).
  - Implement dropzone (native drag events, no new dependency) with visual states (idle / hover / file-selected / error).
  - Implement math captcha as local React state (`useMemo` to seed two integers, regenerate on refresh).
  - Add smooth scroll behavior for hero CTA → `#aplicar`.
  - Update Helmet copy.

- **No changes needed** to:
  - `src/App.tsx` (route already registered)
  - `src/data/footerData.ts` (already links to `/trabaja-con-nosotros`)
  - Supabase schema / storage (existing `job_applications` table + `cv-files` bucket cover requirements)

### Out of scope
- No real third-party captcha (hCaptcha/Cloudflare Turnstile) — using a math captcha to keep it dependency-free. Can be upgraded later if desired.
- No new perks/translations beyond what's listed.
- English version not added (page stays in Spanish, matching existing tone).
