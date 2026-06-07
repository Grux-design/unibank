## Aplicar URLs de CTAs faltantes según Excel

Aplicaré los enlaces especificados en el Excel para los 20 CTAs identificados. Donde el comentario es "Remover elemento, no tenemos link para esto", el elemento se eliminará en lugar de añadirle href.

### Cambios por archivo

**`src/data/heroSlides.ts`** — añadir `ctaHref` y enlaces secundarios
- Slide "naranja" (Cuenta de Ahorros): `ctaHref: "https://onboard.unibank.com.pa/es/auth/login"`
- Slide "leasing": `ctaHref: "mailto:unileasing@unibank.com.pa"` + nuevo `ctaAltHref: "/grupo/unileasing"`
- Slide "hipoteca": `ctaHref: "https://api.whatsapp.com/send?phone=50763280229"` + `ctaAltHref: "/personas/credito/prestamo-de-vivienda"`
- Actualizar `Slide` interface con `ctaAltHref?: string`

**`src/components/molecules/HeroCTAGroup.tsx`** (o donde se renderice `ctaAlt`) — convertir el botón `ctaAlt` en `<Link>` cuando exista `ctaAltHref` (revisaré el componente real al editar para mantener consistencia con `ctaHref`).

**`src/components/organisms/ProductsSection.tsx`** — añadir `href` al componente `CtaLink` local y pasarlo en cada uso:
- Invertis: `https://www.invertissecurities.com/es/invertis-global-income-fund` (externo, target _blank)
- Vivienda: `/personas/credito/prestamo-de-vivienda`
- Mastercard: `/personas/otros-servicios/mastercard-black-debito`
- AutoLoanCard ya tiene href correcto

**`src/components/organisms/BusinessSection.tsx`** — añadir `href` en datos `services`:
- `prestamos`: `/empresas/financiamiento/prestamo-comercial`
- `valores`: `/empresas/otros-servicios/emision-de-valores`

**`src/data/megaMenuData.ts`** — cambiar `secondaryLinks` de `string[]` a `{ label, href }[]`:
- Eliminar "Sobre UniBank" (sin link, remover)
- "Tarifas y Tasas" → `/tarifario`
- "Sucursales" → `/sucursales`

**`src/components/molecules/MegaMenuCategoryGrid.tsx`** — usar `link.href` y `link.label` en el `.map`.

**`src/data/footerData.ts`**
- "Estados Financieros": sin URL → **remover** el item de la columna "Conócenos"
- `socialIcons`: actualizar hrefs a las URLs oficiales (Facebook, Instagram, LinkedIn, YouTube)

**`src/components/organisms/DigitalBanking.tsx`** — en `FEATURES`:
- `transfers.href` → `https://ebanking.unibank.com.pa/DIBS_UNIBANK_PANAMA/pages/loginP.jsp`
- `notifications` → **remover** la tarjeta entera (queda el array con 3 features). Confirmaré que el sticky scroll y carrusel móvil siguen funcionando con N=3.

### Fuera de alcance
- Cambios en CMS o backend.
- Cambios visuales: solo se ajustan datos y se renderiza correctamente el `href`.
