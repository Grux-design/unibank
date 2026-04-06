## Rediseñar Cookie Banner: bottom-right card + panel flotante

### Problema actual

El `BannerToast` está centrado horizontalmente (`left: 50%, transform: translateX(-50%)`) con layout horizontal de 3 botones. El `PreferencesPanel` es un bottom sheet full-width. Ambos difieren del diseño en los screenshots.

### Cambios necesarios en `src/components/organisms/CookieBanner.tsx`

**1. BannerToast → Card bottom-right vertical**

- Posición: `bottom: 24px, right: 24px` (quitar `left: 50%` y `transform`)
- Ancho: ~380px (card compacta, no 560px)
- Layout vertical:
  - Row: cookie icon badge + "Usamos cookies" / "UniBank Panamá"
  - Párrafo descriptivo con link "Política de Cookies"
  - Divider
  - Botón primario full-width "Aceptar todas" (48px height, border-radius 16px)
  - Botón ghost/outline full-width "Configurar Cookies"
- Quitar el botón "Rechazar todo" del banner inicial (solo aparece en el panel)

**2. PreferencesPanel → Floating card bottom-right (no bottom sheet)**

- Cambiar de bottom sheet full-width a panel flotante: `bottom: 24px, right: 24px`, width ~420px, border-radius 20px
- Header: "Centro de privacidad" con cookie icon + botón cerrar (×)
- Body scrollable con:
  - Intro text + link "Política de Cookies"
  - Botón primario "Permitir todas" full-width
  - Título "Gestionar preferencias de consentimiento"
  - 4 categorías expandibles (chevron + label + toggle/badge)
- Footer: botón outline "Confirmar mis preferencias" + texto regulador "Superintendencia de Bancos de Panamá · Ley 81 de 2019"
- Quitar overlay/backdrop oscuro (el panel es flotante, no modal)  
  
Al presionar el botón Saber más, debe llevar a la página de politicas de cookies cuya ruta es: /politica-de-cookies

### Archivo a editar

- `src/components/organisms/CookieBanner.tsx`