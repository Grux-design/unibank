import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Branch {
  name: string;
  address: string;
  phone: string;
  schedule: string[];
  atm: boolean;
  mapUrl: string;
}

const branches: Branch[] = [
  {
    name: "Oficina – Avenida Balboa",
    address: "Avenida Balboa, Edificio Grand Bay Tower, Planta Baja, Ciudad de Panamá",
    phone: "+(507) 297-6000",
    schedule: ["Lunes a Viernes: 8:00 a.m. a 4:00 p.m.", "Sábados: 9:00 a.m. a 12:00 p.m."],
    atm: true,
    mapUrl: "https://maps.google.com/?q=Avenida+Balboa+Grand+Bay+Tower+Panama",
  },
  {
    name: "Oficina – Costa del Este",
    address: "Avenida Centenario, Edificio Península Center Local #5",
    phone: "+(507) 302-0770",
    schedule: ["Lunes a Viernes: 8:00 a.m. a 4:00 p.m.", "Sábados: 9:00 a.m. a 12:00 p.m."],
    atm: true,
    mapUrl: "https://maps.google.com/?q=Peninsula+Center+Costa+del+Este+Panama",
  },
  {
    name: "Oficina – Vía España",
    address: "Vía España, Plaza Regency, Planta Baja, Local 6",
    phone: "+(507) 340-5600",
    schedule: ["Lunes a Viernes: 8:00 a.m. a 4:00 p.m.", "Sábados: 9:00 a.m. a 12:00 p.m."],
    atm: true,
    mapUrl: "https://maps.google.com/?q=Via+Espana+Plaza+Regency+Panama",
  },
  {
    name: "Oficina – El Dorado",
    address: "Boulevard El Dorado, Centro Comercial El Dorado, Planta Baja",
    phone: "+(507) 236-9300",
    schedule: ["Lunes a Viernes: 8:00 a.m. a 4:00 p.m.", "Sábados: 9:00 a.m. a 12:00 p.m."],
    atm: true,
    mapUrl: "https://maps.google.com/?q=Centro+Comercial+El+Dorado+Panama",
  },
  {
    name: "Oficina – David, Chiriquí",
    address: "Avenida Obaldia, David, Chiriquí",
    phone: "+(507) 774-6800",
    schedule: ["Lunes a Viernes: 8:00 a.m. a 4:00 p.m.", "Sábados: 9:00 a.m. a 12:00 p.m."],
    atm: true,
    mapUrl: "https://maps.google.com/?q=Avenida+Obaldia+David+Chiriqui+Panama",
  },
  {
    name: "Oficina – Santiago, Veraguas",
    address: "Avenida Central, Santiago, Veraguas",
    phone: "+(507) 998-0600",
    schedule: ["Lunes a Viernes: 8:00 a.m. a 4:00 p.m.", "Sábados: 9:00 a.m. a 12:00 p.m."],
    atm: true,
    mapUrl: "https://maps.google.com/?q=Avenida+Central+Santiago+Veraguas+Panama",
  },
];

export default function SucursalesPage() {
  return (
    <>
      <Helmet>
        <title>Sucursales – UniBank</title>
        <meta name="description" content="Encuentra la sucursal UniBank más cercana. Direcciones, teléfonos y horarios de atención." />
        <link rel="canonical" href="https://unibank.com.pa/sucursales" />
      </Helmet>

      <article className="min-h-screen">
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Nuestras Sucursales
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Visítanos en cualquiera de nuestras oficinas a nivel nacional. Estamos aquí para atenderte.
            </p>
          </div>
        </div>

        <section className="bg-background py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((b) => (
              <Card
                key={b.name}
                className="group border border-border/60 hover:border-primary/40 transition-colors duration-300 overflow-hidden"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <h2 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {b.name}
                  </h2>

                  <div className="space-y-3 flex-1 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <span>{b.phone}</span>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <div>
                        {b.schedule.map((s) => (
                          <p key={s}>{s}</p>
                        ))}
                      </div>
                    </div>
                    {b.atm && (
                      <p className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 w-fit">
                        Cajero Automático 24 Horas
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button size="sm" variant="outline" asChild className="flex-1">
                      <a href={`tel:${b.phone.replace(/[^+\d]/g, "")}`}>
                        <Phone className="w-3.5 h-3.5 mr-1" /> Llamar
                      </a>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <a href={b.mapUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" /> Ver Mapa
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
