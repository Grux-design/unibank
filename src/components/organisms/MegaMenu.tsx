import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PiggyBank, CreditCard, Wallet, Smartphone, Bot,
  Landmark, TrendingUp, Building2, BarChart3, Globe,
  Car, Home, Banknote, ArrowRight, ShieldCheck, Users
} from "lucide-react";
import { MegaMenuColumn } from "@/components/molecules/MegaMenuColumn";
import { cn } from "@/lib/utils";

type Lang = "es" | "en";
type Tab = "personas" | "empresas";

interface MegaMenuProps {
  lang: Lang;
  visible: boolean;
}

const personasColumns = [
  {
    heading: { es: "Cuentas", en: "Accounts" },
    items: [
      { label: { es: "Cuenta de Ahorros", en: "Savings Account" }, description: { es: "Crece tu dinero con rendimientos competitivos", en: "Grow your money with competitive yields" }, href: "/cuentas/ahorros", Icon: PiggyBank },
      { label: { es: "Cuenta Corriente", en: "Checking Account" }, description: { es: "Gestiona tus finanzas diarias sin límites", en: "Manage your daily finances without limits" }, href: "/cuentas/corriente", Icon: Wallet },
      { label: { es: "Cuenta en USD", en: "USD Account" }, description: { es: "Opera en dólares con total seguridad", en: "Operate in dollars with full security" }, href: "/cuentas/usd", Icon: Globe },
    ],
  },
  {
    heading: { es: "Crédito", en: "Credit" },
    items: [
      { label: { es: "Crédito Personal", en: "Personal Loan" }, description: { es: "Financiamiento rápido para tus proyectos", en: "Fast financing for your projects" }, href: "/credito/personal", Icon: Banknote },
      { label: { es: "Crédito Hipotecario", en: "Mortgage" }, description: { es: "Haz realidad la casa de tus sueños", en: "Make your dream home a reality" }, href: "/credito/hipotecario", Icon: Home },
      { label: { es: "Crédito Auto", en: "Auto Loan" }, description: { es: "El vehículo que quieres al mejor plazo", en: "The vehicle you want at the best rate" }, href: "/credito/auto", Icon: Car },
    ],
  },
  {
    heading: { es: "Tarjetas & Digital", en: "Cards & Digital" },
    items: [
      { label: { es: "Tarjeta de Crédito", en: "Credit Card" }, description: { es: "Beneficios exclusivos en cada compra", en: "Exclusive benefits on every purchase" }, href: "/tarjetas/credito", Icon: CreditCard },
      { label: { es: "Banca en Línea", en: "Online Banking" }, description: { es: "Controla todo desde tu computadora", en: "Control everything from your computer" }, href: "/digital/banca-linea", Icon: Landmark },
      { label: { es: "App Móvil", en: "Mobile App" }, description: { es: "Tu banco en el bolsillo, siempre disponible", en: "Your bank in your pocket, always available" }, href: "/digital/app", Icon: Smartphone },
      { label: { es: "UniBot", en: "UniBot" }, description: { es: "Asistente inteligente 24/7", en: "Smart assistant 24/7" }, href: "/digital/unibot", Icon: Bot },
    ],
  },
];

const empresasColumns = [
  {
    heading: { es: "Cuentas", en: "Accounts" },
    items: [
      { label: { es: "Cuenta Corriente", en: "Checking Account" }, description: { es: "Gestión eficiente para tu empresa", en: "Efficient management for your company" }, href: "/empresas/cuenta-corriente", Icon: Building2 },
      { label: { es: "Cuenta Jurídica", en: "Legal Entity Account" }, description: { es: "Soluciones para personas jurídicas", en: "Solutions for legal entities" }, href: "/empresas/cuenta-juridica", Icon: ShieldCheck },
    ],
  },
  {
    heading: { es: "Financiamiento", en: "Financing" },
    items: [
      { label: { es: "UniLeasing", en: "UniLeasing" }, description: { es: "Renueva tu flota sin inmovilizar capital", en: "Renew your fleet without tying up capital" }, href: "/empresas/leasing", Icon: Car },
      { label: { es: "Crédito Empresarial", en: "Business Loan" }, description: { es: "Capital para hacer crecer tu negocio", en: "Capital to grow your business" }, href: "/empresas/credito", Icon: Banknote },
      { label: { es: "Línea de Crédito", en: "Credit Line" }, description: { es: "Liquidez inmediata cuando la necesitas", en: "Immediate liquidity when you need it" }, href: "/empresas/linea-credito", Icon: TrendingUp },
    ],
  },
  {
    heading: { es: "Inversiones & Digital", en: "Investments & Digital" },
    items: [
      { label: { es: "Plazo Fijo", en: "Fixed Term" }, description: { es: "Rendimientos garantizados para tu empresa", en: "Guaranteed returns for your company" }, href: "/inversiones/plazo-fijo", Icon: BarChart3 },
      { label: { es: "Fondos de Inversión", en: "Investment Funds" }, description: { es: "Diversifica con expertos del mercado", en: "Diversify with market experts" }, href: "/inversiones/fondos", Icon: TrendingUp },
      { label: { es: "Banca Empresarial", en: "Business Banking" }, description: { es: "Plataforma digital para empresas", en: "Digital platform for businesses" }, href: "/empresas/digital", Icon: Smartphone },
      { label: { es: "Pagos en Línea", en: "Online Payments" }, description: { es: "Cobra y paga de forma instantánea", en: "Collect and pay instantly" }, href: "/empresas/pagos", Icon: Globe },
    ],
  },
];

const featured = {
  personas: {
    es: { tag: "Nuevo", headline: "Abre tu cuenta en minutos, desde tu celular", sub: "Sin filas, sin papeleos. 100% digital.", cta: "Comenzar ahora", href: "/cuentas/ahorros" },
    en: { tag: "New", headline: "Open your account in minutes, from your phone", sub: "No lines, no paperwork. 100% digital.", cta: "Get started", href: "/cuentas/ahorros" },
    photo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  empresas: {
    es: { tag: "Empresas", headline: "Soluciones financieras que escalan con tu negocio", sub: "Crédito, inversión y banca digital en un solo lugar.", cta: "Ver soluciones", href: "/empresas/credito" },
    en: { tag: "Business", headline: "Financial solutions that scale with your business", sub: "Credit, investment and digital banking in one place.", cta: "See solutions", href: "/empresas/credito" },
    photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
};

const secondaryLinks = {
  es: [
    { label: "Sobre UniBank", href: "/about" },
    { label: "Tarifas", href: "/tarifas" },
    { label: "Sucursales", href: "/sucursales" },
    { label: "Contacto", href: "/contact" },
  ],
  en: [
    { label: "About UniBank", href: "/about" },
    { label: "Rates", href: "/tarifas" },
    { label: "Branches", href: "/sucursales" },
    { label: "Contact", href: "/contact" },
  ],
};

export function MegaMenu({ lang, visible }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<Tab>("personas");
  const columns = activeTab === "personas" ? personasColumns : empresasColumns;
  const feat = featured[activeTab][lang];
  const featPhoto = featured[activeTab].photo;

  return (
    /* Floating card anchored top-left, matching the reference screenshot proportions */
    <div
      className={cn(
        // Positioning: sits below the header bar, anchored to the left edge
        "absolute left-4 top-[calc(100%+8px)] z-40",
        // Floating card shape
        "w-[880px] max-w-[calc(100vw-2rem)] rounded-2xl",
        // Surface
        "bg-background border border-border",
        // Elevation matching the reference (deep, soft shadow)
        "shadow-[0_8px_40px_-8px_hsl(0_0%_0%/0.18),0_2px_8px_-2px_hsl(0_0%_0%/0.08)]",
        // Smooth enter/exit
        "transition-all duration-200 ease-out origin-top-left",
        visible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none"
      )}
      role="navigation"
      aria-label={lang === "es" ? "Menú principal" : "Main menu"}
    >
      <div className="p-5">
        {/* Tab row */}
        <div className="flex items-center gap-1 mb-5">
          {(["personas", "empresas"] as const).map((tab) => (
            <button
              key={tab}
              onMouseEnter={() => setActiveTab(tab)}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/50 hover:text-foreground hover:bg-muted"
              )}
              aria-pressed={activeTab === tab}
            >
              {tab === "personas"
                ? <><Users size={13} />{lang === "es" ? "Personas" : "Personal"}</>
                : <><Building2 size={13} />{lang === "es" ? "Empresas" : "Business"}</>
              }
            </button>
          ))}
        </div>

        {/* Content grid: 3 menu columns + featured card */}
        <div className="grid grid-cols-[1fr_1fr_1fr_220px] gap-3">
          {columns.map((col, i) => (
            <MegaMenuColumn
              key={`${activeTab}-${i}`}
              heading={col.heading[lang]}
              items={col.items.map((item) => ({
                label: item.label[lang],
                description: item.description[lang],
                href: item.href,
                Icon: item.Icon,
              }))}
            />
          ))}

          {/* Featured card */}
          <div className="relative overflow-hidden rounded-xl min-h-[200px]">
            <img
              src={featPhoto}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20_90%_30%/0.94)] via-[hsl(20_80%_42%/0.72)] to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-4 gap-2">
              <span className="inline-flex w-fit items-center rounded-full bg-primary-foreground/20 border border-primary-foreground/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground backdrop-blur-sm">
                {feat.tag}
              </span>
              <p className="text-[13px] font-bold text-primary-foreground leading-snug">
                {feat.headline}
              </p>
              <p className="text-[11px] text-primary-foreground/80 leading-snug">
                {feat.sub}
              </p>
              <Link
                to={feat.href}
                className="mt-1 inline-flex items-center gap-1.5 self-start rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 border border-primary-foreground/30 px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors backdrop-blur-sm"
              >
                {feat.cta}
                <ArrowRight size={10} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
          {secondaryLinks[lang].map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
