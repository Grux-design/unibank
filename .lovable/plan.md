

## 3 cambios en el Mega Menu

### 1. Alinear toggle a la izquierda
En `MegaMenuTabBar.tsx`, cambiar `justifyContent: "center"` a `justifyContent: "flex-start"` en el contenedor exterior.

### 2. Eliminar white spaces excesivos
Los screenshots muestran espacios vacíos debajo de categorías con pocos items (ej. "Crédito" solo tiene 2 items, "Cuentas" en Empresas solo tiene 1). El problema es el gap vertical de `24px` entre filas del grid y que las categorías se distribuyen en un grid 2x2 con filas de altura uniforme.

Cambios en `MegaMenuCategoryGrid.tsx`:
- Reducir el gap vertical del grid de `24px` a `16px`
- Cambiar de `grid` a un layout de 2 columnas con `flex` o `columns`, donde cada columna apila sus categorías sin forzar alturas iguales entre filas. Concretamente: usar CSS `column-count: 2` o dividir manualmente las categorías en 2 columnas (izquierda: categorías 0,2; derecha: categorías 1,3) para que cada columna fluya independientemente sin gaps forzados.

### 3. Color de section labels en Empresas
En `MegaMenuCategoryGrid.tsx`, cambiar `categoryColor` para que sea siempre `#FF8136` en ambos segmentos, eliminando la condición que lo pone gris para Empresas.

### Archivos a editar
- `src/components/molecules/MegaMenuTabBar.tsx` (cambio 1)
- `src/components/molecules/MegaMenuCategoryGrid.tsx` (cambios 2 y 3)

