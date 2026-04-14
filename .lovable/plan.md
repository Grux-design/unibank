

## Crear 6 páginas institucionales y enlazarlas desde el footer

### Contexto
Las 6 páginas de la columna "Conócenos" del footer no tienen `href` ni páginas asociadas. Se creará una página institucional genérica reutilizable con contenido placeholder para cada una, y se enlazarán desde el footer.

### Páginas y rutas

| Página | Slug (ruta) |
|--------|-------------|
| Junta Directiva | `/junta-directiva` |
| UniLíderes | `/unilideres` |
| Sostenibilidad | `/sostenibilidad` |
| Gestión de Riesgo Operativo | `/gestion-de-riesgo-operativo` |
| Cumplimiento Normativo | `/cumplimiento-normativo` |
| Manual de Gobierno Corporativo | `/manual-de-gobierno-corporativo` |

### Archivos a crear/editar

1. **Crear `src/pages/InstitutionalPage.tsx`**
   - Componente que recibe el slug de la URL y renderiza contenido estático según un mapa interno
   - Cada página tendrá: hero con título, sección de contenido con texto placeholder descriptivo
   - Mismo estilo visual que LegalPage (hero con fondo muted, contenido centrado)
   - Usa `react-helmet-async` para SEO

2. **Crear `src/data/institutionalPages.ts`**
   - Mapa de datos con slug, título, descripción meta, y contenido (párrafos placeholder) para cada página
   - Contenido placeholder relevante al tema de cada página (ej: "Nuestra Junta Directiva está comprometida con...")

3. **Editar `src/App.tsx`**
   - Agregar ruta `/institucional/:slug` con el nuevo componente `InstitutionalPage`
   - Ubicarla antes de `/:slug` para que no sea capturada por LegalPage

4. **Editar `src/data/footerData.ts`**
   - Agregar `href` a cada uno de los 6 items del footer apuntando a `/institucional/{slug}`

5. **Editar `src/components/molecules/FooterNavColumn.tsx`**
   - Para links internos (que empiezan con `/`), usar React Router `Link` en vez de `<a>` para navegación SPA

