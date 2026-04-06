

## Plan: Link all mega menu items to their product detail pages

### What changes

**1. `src/data/megaMenuData.ts`** — Add `slug` to `MenuItem` and `categorySlug` to `MenuCategory`

Add a `slug` field to each menu item and a `categorySlug` to each category, mapping to the Contentful page slugs and URL structure:

```
MenuItem { label, desc, tag, slug }
MenuCategory { name, categorySlug, items }
MenuSection { ..., featured: { ..., slug, categorySlug } }
```

Slug mapping based on Contentful pages (from screenshot):

**Personas:**
| Category (categorySlug) | Item | Slug |
|---|---|---|
| cuentas | Cuenta Naranja+ | cuenta-naranja-plus-digital |
| cuentas | Cuenta de Ahorro | cuenta-de-ahorro |
| cuentas | Cuenta Corriente | cuenta-corriente |
| cuentas | Depósito a Plazo | deposito-a-plazo-fijo |
| credito | Préstamo de Auto | prestamo-de-auto-digital |
| credito | Crédito Hipotecario | prestamo-de-vivienda |
| credito | Préstamo Personal | prestamo-personal |
| inversiones | Invertis Global Income Fund | invertis-global-income-fund |
| inversiones | Depósito a Plazo Fijo | deposito-a-plazo-fijo |
| tarjetas | Mastercard Black Débito | mastercard-black-debito |
| tarjetas | Tarjeta de Crédito | tarjeta-de-credito |
| canales-digitales | Banca Móvil UniBank | banca-movil-unibank |
| canales-digitales | ACH Xpress | ach-xpress |
| canales-digitales | Xpress Pagos | xpress-pagos |

**Empresas:**
| Category (categorySlug) | Item | Slug |
|---|---|---|
| cuentas | Cuenta Corriente Jurídica | cuenta-juridica-digital |
| cuentas | Cuenta de Ahorro Empresarial | cuenta-de-ahorro-empresarial |
| financiamiento | Préstamo Comercial | prestamo-comercial |
| financiamiento | UniLeasing | unileasing |
| financiamiento | Líneas de Crédito | linea-de-credito |
| financiamiento | Préstamo Agroindustrial | prestamo-agroindustrial |
| mercado-de-capitales | Emisión de Valores | emision-de-valores |
| mercado-de-capitales | Portafolio Corporativo | portafolio-corporativo |
| gestion | Pago de Planilla | pago-de-planilla |
| gestion | Pagos Masivos ACH | pagos-masivos-ach |
| gestion | Reportes Financieros | reportes-financieros |
| canales-digitales | Banca en Línea Empresarial | banca-en-linea-empresarial |
| canales-digitales | ACH Xpress | ach-xpress |
| canales-digitales | Xpress Pagos | xpress-pagos |

Featured cards: Cuenta Naranja+ → `/personas/cuentas/cuenta-naranja-plus-digital`, UniLeasing → `/empresas/financiamiento/unileasing`

**2. `src/components/molecules/MegaMenuCategoryGrid.tsx`** — Use `<Link>` instead of `<a href="#">`

- Import `Link` from `react-router-dom`
- Build href as `/${segment}/${cat.categorySlug}/${item.slug}`
- Pass `segment` ("personas" | "empresas") via the `isPersonas` prop

**3. `src/components/molecules/MegaMenuFeaturedCard.tsx`** — Link featured card CTA

- Use `<Link>` with the featured item's slug and categorySlug
- Pass segment info as a new prop

**4. `src/components/sections/HeroFormSection.tsx`** — Add missing breadcrumb labels

Add new entries to `SEGMENT_LABELS`: `financiamiento`, `mercado-de-capitales`, `gestion`, `canales-digitales`, `inversiones`, `credito`.

### Files touched
- `src/data/megaMenuData.ts`
- `src/components/molecules/MegaMenuCategoryGrid.tsx`
- `src/components/molecules/MegaMenuFeaturedCard.tsx`
- `src/components/sections/HeroFormSection.tsx`

