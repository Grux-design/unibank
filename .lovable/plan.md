
## Plan: Redesigned Hover-Triggered Mega Menu

### What changes

**1. Hover trigger on the Menu pill (Header.tsx)**
- Replace `onClick` toggle with `onMouseEnter` / `onMouseLeave` on a wrapping `<div>` that covers both the pill and the mega menu panel — this prevents the menu from closing when the mouse moves from the button into the panel.
- Keep a small delay (100ms) before closing so users can move the mouse without the menu flickering shut.
- Keep click as fallback for keyboard/touch users.

**2. Full redesign of MegaMenu.tsx**
Inspired by the reference screenshots (multi-column layout, icon-prefixed rows, a featured visual card on the right, clean section headers):

Layout — two-column macro split:
```text
┌─────────────────────────────────────────────────────────────┐
│  [Personas] [Empresas]          tabs (pill switcher)        │
├───────────────────────────────────────┬─────────────────────┤
│  Col 1        Col 2        Col 3      │  Featured card      │
│  Cuentas      Crédito      Tarjetas   │  (Unsplash photo +  │
│  • item       • item       • item     │   headline + CTA)   │
│  • item       • item       • item     │                     │
│               Canales                 │                     │
│               Digitales               │                     │
├───────────────────────────────────────┴─────────────────────┤
│  Footer row: Sobre UniBank · Tarifas · Sucursales · Contacto│
└─────────────────────────────────────────────────────────────┘
```

Each menu item gets a small Lucide icon beside the label (e.g. `PiggyBank`, `CreditCard`, `Smartphone`, `Building2`, etc.) and a one-line description in muted text beneath.

The featured card on the right side will:
- Use an Unsplash photo (direct URL, no copy needed)
- Have a branded orange gradient overlay
- Show a short headline + "Ver más →" link

**3. Animation**
- Menu fades in + slides down 8px (`opacity-0 translate-y-2` → `opacity-100 translate-y-0`) using CSS transitions.
- Controlled by a `visible` state (mount first, then trigger transition tick) for smooth enter/exit.

### Files to edit
- `src/components/organisms/Header.tsx` — swap click → hover intent logic
- `src/components/organisms/MegaMenu.tsx` — full visual redesign
- `src/components/molecules/MegaMenuColumn.tsx` — update to accept icon + description per item
