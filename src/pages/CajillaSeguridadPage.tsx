import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ShieldCheck } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { BenefitSectionTextures } from "@/components/atoms/BenefitSectionTextures";
import { Reveal } from "@/components/effects/Reveal";
import { PageMasthead, StaticPageSection } from "@/components/organisms/StaticPageLayout";
import {
  OrangePrefooterBanner,
  OrangePrefooterButton,
} from "@/components/organisms/OrangePrefooterBanner";
import { PageServiceIntro } from "@/components/sections/PageServiceIntro";
import { PageSizeOptions } from "@/components/sections/PageSizeOptions";
import { ProductSectionHeader } from "@/components/sections/ProductSectionHeader";
import { FeatureIconTile } from "@/lib/benefitIcons";
import { CTA_BUTTON_LAYOUT_CLASS } from "@/constants/ctaButtons";
import { cn } from "@/lib/utils";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400";
const KEY_IMAGE =
  "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900";

const servicePillars = [
  {
    title: "Acceso exclusivo",
    description: "Solo tú y tu llave controlan la apertura de tu cajilla.",
  },
  {
    title: "Bóveda blindada",
    description: "Protección permanente las 24 horas del día.",
  },
  {
    title: "Monitoreo permanente",
    description: "Cámaras especializadas en todo momento.",
  },
  {
    title: "Acceso privado",
    description: "Solo tú decides cuándo visitar tu cajilla.",
  },
];

const benefits = [
  {
    title: "Máxima seguridad",
    description: "Bóveda protegida mediante monitoreo permanente con cámaras especializadas.",
  },
  {
    title: "Confidencialidad total",
    description: "Acceso privado y controlado en cada visita a tu cajilla.",
  },
  {
    title: "Sala exclusiva",
    description: "Espacio diseñado para que accedas a tu cajilla con comodidad y discreción.",
  },
  {
    title: "Atención personalizada",
    description: "Acompañamiento de personal capacitado durante el uso del servicio.",
  },
  {
    title: "Respaldo bancario",
    description: "Tus pertenencias resguardadas por una institución sólida y confiable.",
  },
];

const sizes = [
  {
    label: "Tamaño estándar",
    widthIn: 5,
    heightIn: 10,
    depthIn: 24,
    description:
      "Ideal para documentos importantes, escrituras, joyería esencial y artículos de valor compactos.",
  },
  {
    label: "Tamaño amplio",
    widthIn: 10,
    heightIn: 10,
    depthIn: 24,
    description:
      "Mayor capacidad para colecciones, documentos voluminosos y objetos de valor de mayor tamaño.",
  },
];

const requirements = [
  "Mantener una cuenta activa en UniBank.",
  "El arrendamiento de la cajilla es a título personal.",
];

function FeatureStripGrid({
  count,
  children,
  className,
}: {
  count: number;
  children: ReactNode;
  className?: string;
}) {
  const gridClass =
    count === 1
      ? "grid-cols-1"
      : count === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : count === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  const divideClass =
    count <= 1
      ? ""
      : count >= 4
        ? "divide-y sm:divide-y lg:divide-y-0 divide-x divide-border"
        : "divide-y sm:divide-y-0 divide-x divide-border";

  return (
    <div
      className={cn(
        "page-section-card rounded-[20px] md:rounded-[24px] overflow-hidden border border-border w-full",
        className,
      )}
    >
      <div className={cn("grid w-full", gridClass, divideClass)}>{children}</div>
    </div>
  );
}

export default function CajillaSeguridadPage() {
  return (
    <>
      <Helmet>
        <title>Cajilla de Seguridad | Unibank</title>
        <meta
          name="description"
          content="Resguarda tus documentos, joyas y objetos de valor en las Cajillas de Seguridad de UniBank. Bóveda protegida, sala exclusiva y atención personalizada."
        />
        <meta property="og:title" content="Cajilla de Seguridad | Unibank" />
        <meta
          property="og:description"
          content="Protege lo que más valoras con el servicio de Cajillas de Seguridad de UniBank."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <PageMasthead
        eyebrow={
          <>
            <ShieldCheck size={14} />
            Servicio exclusivo
          </>
        }
        title="Cajillas de Seguridad"
        highlight="Protege lo que más valoras"
        subtitle="En UniBank entendemos que tus pertenencias más valiosas merecen el más alto nivel de protección. Por eso, ponemos a tu disposición nuestro servicio de Cajillas de Seguridad, diseñado para resguardar documentos importantes, joyas y objetos de valor con total confidencialidad y seguridad."
        imageSrc={HERO_IMAGE}
        imageAlt="Bóveda de seguridad bancaria UniBank"
      >
        <a href="#contacto" className={CTA_BUTTON_LAYOUT_CLASS}>
          <Button size="lg" className="h-[52px] px-8 text-[15px] w-full md:w-auto">
            Solicitar información
            <ChevronRight className="w-4 h-4" />
          </Button>
        </a>
      </PageMasthead>

      <PageServiceIntro
        bandIndex={0}
        eyebrow="El servicio"
        title="¿Qué es una Cajilla de Seguridad?"
        description={
          <>
            Un servicio de arrendamiento que te permite guardar tus bienes más preciados dentro de una
            bóveda bancaria altamente protegida, con acceso exclusivo y controlado para tu tranquilidad.
          </>
        }
        imageSrc={KEY_IMAGE}
        imageAlt="Llave de cajilla de seguridad bancaria UniBank"
        pillars={servicePillars}
      />

      <StaticPageSection
        bandIndex={1}
        surface="accent"
        paddingClassName="pt-10 md:pt-12 lg:pt-14 pb-10 md:pb-12 lg:pb-14"
        className="benefit-section-band"
      >
        <BenefitSectionTextures />
        <div className="site-container relative z-[1]">
          <Reveal y={20} duration={0.55}>
            <ProductSectionHeader
              tag="Beneficios"
              title="Beneficios del servicio"
              align="center"
              className="mb-3 md:mb-4"
            />
            <p className="text-center text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-9">
              Diseñado para brindarte tranquilidad absoluta sobre tus bienes más importantes.
            </p>
          </Reveal>

          <Reveal y={22} duration={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-y-0">
                {benefits.map((item, index) => (
                  <Reveal
                    key={item.title}
                    y={14}
                    duration={0.45}
                    staggerIndex={index}
                    amount={0.12}
                    className="group page-hover-cell flex flex-col items-center text-center gap-3.5 p-5 md:p-6 lg:p-8 rounded-2xl"
                  >
                    <FeatureIconTile
                      title={item.title}
                      description={item.description}
                      size="lg"
                      variant="accent"
                      lift
                    />
                    <div className="flex flex-col gap-2 max-w-[28ch]">
                      <h3 className="type-item-title m-0 text-foreground">{item.title}</h3>
                      <p className="m-0 text-sm md:text-[15px] leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
            </div>
          </Reveal>
        </div>
      </StaticPageSection>

      <PageSizeOptions
        bandIndex={2}
        eyebrow="Opciones"
        title="Tamaños disponibles"
        description="UniBank ofrece diferentes tamaños de cajillas para adaptarse a tus necesidades."
        options={sizes}
      />

      <StaticPageSection bandIndex={3}>
        <div className="site-container">
          <Reveal y={20} duration={0.55}>
            <ProductSectionHeader tag="Requisitos" title="Requisitos" align="center" />
          </Reveal>
          <Reveal y={16} duration={0.5} delay={0.05}>
            <FeatureStripGrid count={requirements.length} className="max-w-3xl mx-auto">
              {requirements.map((req, index) => (
                <Reveal
                  key={req}
                  y={14}
                  duration={0.45}
                  staggerIndex={index}
                  className="group page-hover-cell p-6 md:p-8 flex items-start gap-4 min-w-0 w-full"
                >
                  <FeatureIconTile
                    title={index === 0 ? "Cuenta activa" : "Arrendamiento personal"}
                    description={req}
                    size="sm"
                    variant="accent"
                    className="shrink-0 mt-0.5"
                  />
                  <p className="m-0 pt-1 text-sm md:text-base font-medium text-foreground leading-relaxed">
                    {req}
                  </p>
                </Reveal>
              ))}
            </FeatureStripGrid>
          </Reveal>
        </div>
      </StaticPageSection>

      <OrangePrefooterBanner
        id="contacto"
        eyebrow="Hablemos"
        title="¿Listo para resguardar lo que más valoras?"
        description={
          <>
            Solicita este exclusivo servicio a través de tu Gerente de Relación o visitando nuestra
            Casa Matriz en Avenida Balboa, planta baja del edificio Grand Bay Tower.
          </>
        }
      >
        <OrangePrefooterButton to="/contact">
          Solicitar información
          <ChevronRight className="w-4 h-4" />
        </OrangePrefooterButton>
      </OrangePrefooterBanner>
    </>
  );
}
