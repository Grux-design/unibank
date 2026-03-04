
## Design System Tokens — Consolidated `tokens.json`

### What the 4 files contain (parsed from what was visible)

**color.styles.tokens.json**
- `brand-primary.brand-iso` → `#726f6e` (warm gray, ISO/secondary brand)
- `brand-primary.brand--main` → `#ff8136` (primary orange — will use this)
- Figma bases: `#fcfcfc`, `#ccc7c3`, `#ced6df`, `#a0aec0`, `#9fafc1`, `#525456`, `#0f0f0f`, `#801fff`
- Gradients: SuccessGradient, BlueGradient, gray-gradient-01, grad-header, grad-light (orange/warm)

**effect.styles.tokens.json**
- Shadows: xs, sm, md, lg, xl (all y-axis offset shadows with low-opacity blacks)

**text.styles.tokens.json**
- Overline (Regular, Medium)
- Caption (Regular, Italic, Medium, Semi)
- Button-md
- Body, Heading scales — all Inter font

**unibankTokens.Default.tokens.json**
- Screens (sm→2xl breakpoints)
- Border-radius scale (none → full, 14 steps)
- Max-width scale (0 → full)
- Spacing, font sizes, etc.

---

### Plan

**Single output file**: `src/tokens/tokens.json`

**Structure — 6 top-level groups:**

```
tokens.json
├── color
│   ├── brand          (primary, secondary, accent-purple, iso-gray)
│   ├── surface        (background, card, overlay, sidebar)
│   ├── text           (heading, body, muted, link, on-dark, on-brand)
│   ├── border         (default, strong, focus-ring)
│   ├── feedback       (success, error, warning, info + text/icon pairs)
│   └── interactive    (hover, active, disabled, focus)
├── gradient
│   ├── brand          (grad-light: orange warm gradient)
│   ├── header         (grad-header: dark gray gradient)
│   ├── success        (SuccessGradient: soft green)
│   └── blue           (BlueGradient: soft blue)
├── shadow             (xs, sm, md, lg, xl)
├── typography         (overline, caption, button-md, body-*, heading-*)
├── spacing            (from unibankTokens scale)
├── border-radius      (none → full, from unibankTokens)
└── breakpoint         (sm → 2xl)
```

**Each token will include:**
- `value` — raw value
- `type` — color / shadow / typography / dimension / gradient
- `description` — plain English
- `usage` — component/context examples
- `pairedWith` — companion tokens (for colors)

**Semantic naming convention**: `{group}-{role}-{variant?}`
Examples: `color-brand-primary`, `color-feedback-error`, `color-text-muted`, `shadow-md`

**Feedback colors** — not in raw files, so I'll derive them using standard accessible values consistent with the brand:
- success: `#16a34a` / bg `#f0fdf4` (matches SuccessGradient start)
- error: `#dc2626` / bg `#fef2f2`
- warning: `#d97706` / bg `#fffbeb`
- info: `#2563eb` / bg `#eff6ff` (matches BlueGradient start)

**Interactive states** — derived from brand-primary (#ff8136):
- hover: darkened `#e56a1f`
- active: `#cc5a10`
- disabled: `#fcd5b5` (light tint)
- focus-ring: `#ff8136` with opacity note

**Also creates**: `src/tokens/index.ts` — typed re-export so components can `import tokens from "@/tokens"` with full TS inference.

### Files to create
- `src/tokens/tokens.json` — full consolidated token file
- `src/tokens/index.ts` — typed TypeScript re-export

### Files NOT changed
- `src/index.css` — CSS variables stay as-is for now (a future task can sync them)
- `tailwind.config.ts` — untouched
- Any page or component files
