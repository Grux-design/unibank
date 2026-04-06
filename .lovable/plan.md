

## Implementar Cookie Banner con persistencia en localStorage

### Resumen
Agregar el componente `CookieBanner` al layout principal. El banner se muestra al cargar la página si no hay consentimiento guardado en `localStorage`. Al limpiar cache/cookies, reaparece automáticamente.

### Plan

1. **Crear `src/components/organisms/CookieBanner.tsx`** — Copiar el primer archivo proporcionado (el componente autocontenido con `BannerToast`, `PreferencesPanel`, `CategoryItem`, etc.) tal cual fue entregado por el usuario.

2. **Crear `src/components/organisms/CookieConsent.tsx`** — Copiar el segundo archivo proporcionado (el componente con el panel flotante de configuración y política de cookies).

3. **Modificar `src/components/layout/SiteLayout.tsx`** — Importar y renderizar `<CookieBanner />` después del `<Footer />`, dentro del layout. Esto asegura que aparezca en todas las páginas.

### Archivos a crear/editar
- **Crear** `src/components/organisms/CookieBanner.tsx`
- **Crear** `src/components/organisms/CookieConsent.tsx`
- **Editar** `src/components/layout/SiteLayout.tsx` — agregar `<CookieBanner />` al final del layout

### Comportamiento
- Si `localStorage` tiene la key `unibank_cookie_consent` con versión válida → banner oculto
- Si no existe o se limpia → banner visible automáticamente
- Las preferencias se persisten en `localStorage` al aceptar/rechazar/guardar

