
## Plan: "Abre tu cuenta" — Animated Dropdown + Minimalist Menu

### What to change in `NavActions.tsx`

**Trigger button behavior:**
- Switch from click-toggle to hover-open (`onMouseEnter` / `onMouseLeave` on the wrapper div)
- Keep click as fallback for keyboard/touch
- The `Plus` icon animates: `rotate-45` when open (becomes an `×` shape), with `transition-transform duration-200`

**Dropdown animation:**
- Remove the conditional render (`{accountOpen && ...}`) — always render but use CSS to show/hide
- Animate with: `opacity-0 scale-95 pointer-events-none` → `opacity-100 scale-100 pointer-events-auto`
- Transform origin: `origin-top-right`
- Transition: `transition-all duration-200 ease-out`

**Dropdown content — minimalist redesign:**
- Remove emoji icons entirely
- White background instead of orange (`bg-white`) with a subtle shadow (`shadow-lg`)
- Small overline label at top: `"Tipo de cuenta"` in `text-xs text-foreground/40 uppercase tracking-widest px-4 pt-3 pb-1`
- Account links: plain text, `text-sm font-medium text-foreground`, `px-4 py-2.5`, hover: `bg-foreground/5 rounded-lg`
- A thin separator line between the two accounts
- Dropdown width: `w-52`
- Bottom padding: `pb-2`

**Icon animation on the pill:**
- Wrap `Plus` in `<span className={cn("transition-transform duration-200", accountOpen && "rotate-45")}>`

### Files to edit
- `src/components/molecules/NavActions.tsx` — hover trigger, icon rotation, animated dropdown, minimalist items
