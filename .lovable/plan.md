
## What needs to change

The root problem is the route in `App.tsx` is hardcoded to `/personas/cuentas/:slug`. Navigating to `/personas/tarjetas/mastercard-black-debito` hits the 404 route. The network logs confirm this — requests to `fields.slug=:slug` are the literal fallback.

The breadcrumb label mapping in `HeroFormSection.tsx` already has `tarjetas: "Tarjetas"` and `prestamos: "Préstamos"`, so no changes needed there.

---

### Change — 1 file only

**`src/App.tsx`**

Replace the hardcoded route:
```
/personas/cuentas/:slug
```
with the dynamic pattern:
```
/personas/:category/:slug
```

This one change makes `/personas/tarjetas/mastercard-black-debito` and `/personas/prestamos/prestamo-de-auto-digital` (and any future category) resolve to `ProductDetailPage` and pass the correct `slug` to the Contentful query. The breadcrumbs will automatically render:

- Inicio > Personas > Tarjetas > Mastercard Black Débito  
- Inicio > Personas > Préstamos > Préstamo de Auto Digital

because `useLocation` parses the full URL path and `SEGMENT_LABELS` already maps those slugs.
