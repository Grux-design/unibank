import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Clock, ExternalLink } from "@/lib/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import avenidaBalboaImg from "@/assets/branches/avenida-balboa.jpeg";
import costaDelEsteImg from "@/assets/branches/costa-del-este.png";

interface Branch {
  name: string;
  image: string;
  address: string;
  phone: string;
  schedule: string[];
  atm: boolean;
  mapUrl: string;
}

const branches: Branch[] = [
  {
    name: "Oficina – Avenida Balboa",
    image: avenidaBalboaImg,
    address:
      "Avenida Balboa, Edificio Grand Bay Tower, Planta Baja, Ciudad de Panamá, República de Panamá",
    phone: "+(507) 297-6000",
    schedule: [
      "Lunes a Viernes: 8:00 a.m. a 4:00 p.m.",
      "Sábados: 9:00 a.m. a 12:00 p.m.",
    ],
    atm: true,
    mapUrl:
      "https://www.google.com/maps/place/Edificio+Unibank/@8.975728,-79.519815,18z/data=!4m2!3m1!1s0x0:0x3c8889aabe21c098",
  },
  {
    name: "Oficina – Costa del Este",
    image: costaDelEsteImg,
    address: "Avenida Centenario, Edificio Península Center Local #5",
    phone: "+(507) 302-0770",
    schedule: [
      "Lunes a Viernes: 8:00 a.m. a 4:00 p.m.",
      "Sábados: 9:00 a.m. a 12:00 p.m.",
    ],
    atm: true,
    mapUrl: "https://maps.app.goo.gl/haovNH532EB4Q8i36",
  },
];

export default function SucursalesPage() {
  return (
    <>
      <Helmet>
        <title>Sucursales – UniBank</title>
        <meta
          name="description"
          content="Encuentra la sucursal UniBank más cercana. Direcciones, teléfonos y horarios de atención."
        />
        <link rel="canonical" href="https://unibank.com.pa/sucursales" />
      </Helmet>

      <article className="min-h-screen">
        <div className="bg-muted/30 border-b border-border">
          <div className="site-container py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Nuestras Sucursales
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Visítanos en cualquiera de nuestras oficinas. Estamos aquí para atenderte.
            </p>
          </div>
        </div>

        <section className="bg-background py-16">
          <div className="site-container grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((b) => (
              <Card
                key={b.name}
                className="group border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={b.image}
                    alt={b.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {b.atm && (
                    <span className="absolute top-3 right-3 text-xs font-medium text-primary bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                      Cajero Automático 24 Horas
                    </span>
                  )}
                </div>

                <CardContent className="p-6 flex flex-col flex-1">
                  <h2 className="text-lg font-bold text-foreground mb-5 group-hover:text-primary transition-colors">
                    {b.name}
                  </h2>

                  <div className="space-y-5 flex-1 text-sm">
                    <div className="flex gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Ubicación
                        </p>
                        <p className="text-foreground/90 leading-relaxed">{b.address}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Teléfono
                        </p>
                        <p className="text-foreground/90">{b.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Horario
                        </p>
                        {b.schedule.map((s) => (
                          <p key={s} className="text-foreground/90">
                            {s}
                          </p>
                        ))}
                      </div>
                    </div>
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
