
Refactor `src/pages/SucursalesPage.tsx` to match the official Unibank info: keep only **Oficina – Avenida Balboa** and **Oficina – Costa del Este**, remove the other four (Vía España, El Dorado, David, Santiago), add featured images at the top of each card, and update content per the user's specs.

### 1. Add image assets
- Copy `user-uploads://Oficina_-_Avenida_Balboa.jpeg` → `src/assets/branches/avenida-balboa.jpeg`
- Copy `user-uploads://Oficina_-_Costa_del_Este.png` → `src/assets/branches/costa-del-este.png`
- Import them as ES6 modules at the top of `SucursalesPage.tsx`

### 2. Update branches data
Reduce the `branches` array to 2 entries, each with a new `image` field:

- **Avenida Balboa**
  - Address: "Avenida Balboa, Edificio Grand Bay Tower, Planta Baja, Ciudad de Panamá, República de Panamá"
  - Phone: `+(507) 297-6000`
  - Schedule: Lunes a Viernes 8:00 a.m. – 4:00 p.m.; Sábados 9:00 a.m. – 12:00 p.m.
  - Map: `https://www.google.com/maps/place/Edificio+Unibank/@8.975728,-79.519815,18z/data=!4m2!3m1!1s0x0:0x3c8889aabe21c098`
  - Image: `avenida-balboa.jpeg`

- **Costa del Este**
  - Address: "Avenida Centenario, Edificio Península Center Local #5"
  - Phone: `+(507) 302-0770`
  - Schedule: same as above
  - Map: `https://maps.app.goo.gl/haovNH532EB4Q8i36`
  - Image: `costa-del-este.png`

### 3. Update Card UI
- Add a featured image at the top of each `Card`:
  - `<div className="relative aspect-[16/10] overflow-hidden">` with `<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />`
  - Move "Cajero Automático 24 Horas" badge as a floating overlay top-right on the image (`absolute top-3 right-3`) with a subtle backdrop-blur background for clean readability
- Restructure the body to use small uppercase eyebrow labels (Ubicación / Teléfono / Horario) above each value, matching the structure the user provided
- Adjust grid: since there are now only 2 cards, change from `lg:grid-cols-3` → `md:grid-cols-2` and tighten container to `max-w-5xl` so cards remain visually balanced
- Keep the existing "Llamar" and "Ver Mapa" buttons row at the bottom (using the new tel/map URLs)

### 4. No other files affected
Routing and navigation already point to `/sucursales`; no other changes required.
