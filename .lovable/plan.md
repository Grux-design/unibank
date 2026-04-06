

## Rediseñar el banner CTA naranja en DigitalBanking

### Cambios de layout y estilo (líneas ~622-724 de `DigitalBanking.tsx`)

**Layout**: Cambiar de la estructura actual (content row + bottom info bar) a un layout de 2 columnas:
- **Columna izquierda**: Eyebrow uppercase pequeño ("¿LISTO PARA TRANSFORMAR TU EXPERIENCIA BANCARIA?") + headline grande y bold ("Contáctanos\nhoy mismo.")
- **Columna derecha**: Botones de teléfono y WhatsApp (con fondo blanco semi-transparente `rgba(255,255,255,0.15)` en vez de ghost/outline) + texto de horario y sucursales debajo de los botones

**Eliminar la barra inferior** (info bar con `background: rgba(0,0,0,0.12)`), moviendo su contenido al panel derecho.

**Tipografía**:
- Eyebrow: ~13px, uppercase, `letterSpacing: 0.08em`, `color: rgba(255,255,255,0.85)`
- Headline: ~48px (desktop) / ~32px (mobile), `fontWeight: 800`, blanco
- Info text: ~14px, `color: rgba(255,255,255,0.7)`

**Botones**: Cambiar `CtaGhostBtn` de border outline a fondo `rgba(255,255,255,0.15)` con `border: none`, `borderRadius: 14px`, padding más generoso.

**Padding general**: Aumentar padding interno a `~56px 64px` (desktop).

### Archivo a editar
- `src/components/organisms/DigitalBanking.tsx` (líneas 622-724)

