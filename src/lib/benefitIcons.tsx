import type { ComponentType, SVGProps } from "react";
import {
  Bank as PhBank,
  Briefcase as PhBriefcase,
  Buildings as PhBuildings,
  BuildingOffice as PhBuildingOffice,
  Car as PhCar,
  ChartBar as PhChartBar,
  ChartLineUp as PhChartLineUp,
  ChartPie as PhChartPie,
  Checks as PhChecks,
  CheckCircle as PhCheckCircle,
  ClipboardText as PhClipboardText,
  Clock as PhClock,
  CloudCheck as PhCloudCheck,
  Coins as PhCoins,
  CreditCard as PhCreditCard,
  CurrencyCircleDollar as PhCurrencyCircleDollar,
  DeviceMobile as PhDeviceMobile,
  Drop as PhDrop,
  Eye as PhEye,
  Factory as PhFactory,
  FileText as PhFileText,
  Fingerprint as PhFingerprint,
  FlowArrow as PhFlowArrow,
  GearSix as PhGearSix,
  Globe as PhGlobe,
  Handshake as PhHandshake,
  House as PhHouse,
  IdentificationCard as PhIdentificationCard,
  Leaf as PhLeaf,
  Lightning as PhLightning,
  LockKey as PhLockKey,
  Medal as PhMedal,
  NotePencil as PhNotePencil,
  Package as PhPackage,
  Percent as PhPercent,
  PresentationChart as PhPresentationChart,
  RocketLaunch as PhRocketLaunch,
  Shield as PhShield,
  ShieldCheck as PhShieldCheck,
  Sparkle as PhSparkle,
  Target as PhTarget,
  Timer as PhTimer,
  TrendUp as PhTrendUp,
  Tree as PhTree,
  UsersThree as PhUsersThree,
  Vault as PhVault,
  Wallet as PhWallet,
  Wrench as PhWrench,
} from "@phosphor-icons/react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

export type BenefitIconComponent = ComponentType<IconProps>;
export type FeatureIconTileSize = "sm" | "md" | "lg";
export type FeatureIconTileVariant = "muted" | "accent";

type PhosphorIcon = ComponentType<
  IconProps & { weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }
>;

/** Normalize Phosphor icons — always solid (fill), never duotone/outlined. */
function phosphor(Icon: PhosphorIcon): BenefitIconComponent {
  function PhosphorBenefitIcon({ size = 28, color = "currentColor", ...props }: IconProps) {
    return <Icon size={size} color={color} weight="fill" {...props} />;
  }
  PhosphorBenefitIcon.displayName = `Benefit(${Icon.displayName ?? "PhosphorIcon"})`;
  return PhosphorBenefitIcon;
}

function normalizeTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Explicit title → icon.
 * Phosphor only: @duo-icons/react requires React 19 and crashes this React 18 app.
 */
const TITLE_ICON_MAP: Record<string, BenefitIconComponent> = {
  // Personas · Cuenta de Ahorros
  "sin tramites presenciales": phosphor(PhCloudCheck),
  "rendimiento superior": phosphor(PhTrendUp),
  "seguridad de identidad": phosphor(PhFingerprint),

  // Personas · Cuenta Corriente
  "ideal para movimientos frecuentes": phosphor(PhFlowArrow),
  "soporte personal y comercial": phosphor(PhHandshake),

  // Personas · Depósito a Plazo Fijo
  "tasa de interes inalterable": phosphor(PhPercent),
  "ideal para metas definidas": phosphor(PhTarget),
  "disponibilidad para clientes": phosphor(PhClock),

  // Personas · Vivienda
  "seguridad y transparencia": phosphor(PhShieldCheck),
  "enfoque a largo plazo": phosphor(PhHouse),
  "acompanamiento especializado": phosphor(PhHandshake),

  // Personas · Vivienda · Proceso
  "compra de vivienda": phosphor(PhHouse),
  "construccion de vivienda": phosphor(PhWrench),
  "mejoras al hogar": phosphor(PhSparkle),
  "refinanciamiento hipotecario": phosphor(PhCurrencyCircleDollar),

  // Personas · Auto · Características
  "proceso 100 digital": phosphor(PhCloudCheck),
  "rapidez en la gestion": phosphor(PhLightning),
  "sin papeleo fisico": phosphor(PhFileText),
  "gestion desde cualquier dispositivo": phosphor(PhDeviceMobile),

  // Personas · Auto · Proceso
  "concesionarios aliados": phosphor(PhHandshake),
  "validacion de identidad": phosphor(PhFingerprint),
  "atencion personalizada": phosphor(PhUsersThree),

  // Personas · Auto · Beneficios
  "accesible a mas perfiles": phosphor(PhUsersThree),
  "desembolso eficiente": phosphor(PhRocketLaunch),
  "control total": phosphor(PhChecks),

  // Personas · Mastercard · Características
  "compras globales": phosphor(PhGlobe),
  "experiencias mastercard": phosphor(PhSparkle),

  // Personas · Mastercard · Proceso
  "compras por internet": phosphor(PhCreditCard),
  "beneficios de viaje": phosphor(PhGlobe),
  "estilo de vida": phosphor(PhSparkle),

  // Personas · Mastercard · Beneficios
  "comodidad y control": phosphor(PhCreditCard),
  "asistencia 24 7": phosphor(PhClock),
  "respaldo internacional": phosphor(PhGlobe),

  // Empresas · Cuenta Jurídica Digital
  "control de flujo de caja": phosphor(PhChartLineUp),
  "seguridad avanzada": phosphor(PhShieldCheck),
  "autogestion de chequeras": phosphor(PhClipboardText),

  // Empresas · Préstamo Comercial
  "sectores diversos": phosphor(PhBuildings),
  "vision estrategica": phosphor(PhEye),
  "ecosistema unibank": phosphor(PhBank),

  // Empresas · Línea de Crédito
  "liquidez permanente": phosphor(PhDrop),
  "control financiero": phosphor(PhPresentationChart),
  "respaldo solido": phosphor(PhVault),

  // Empresas · Agroindustrial
  "amplia cobertura": phosphor(PhGlobe),
  "sostenibilidad real": phosphor(PhLeaf),
  "integracion total": phosphor(PhGearSix),

  // Empresas · Emisión de Valores
  "visibilidad de mercado": phosphor(PhChartBar),
  "perfil financiero": phosphor(PhFileText),
  "inversion estrategica": phosphor(PhTrendUp),

  // Empresas · Planilla
  "reduccion de riesgos": phosphor(PhShield),
  "autonomia empresarial": phosphor(PhBuildingOffice),
  "comodidad para el equipo": phosphor(PhUsersThree),

  // Empresas · UniLeasing
  "impulso a la competitividad": phosphor(PhRocketLaunch),
  "flexibilidad en equipos": phosphor(PhWrench),
  "eficiencia operativa": phosphor(PhLightning),
};

/** Keyword heuristics when an exact title isn’t mapped yet. */
const KEYWORD_ICONS: Array<{ keywords: string[]; icon: BenefitIconComponent }> = [
  { keywords: ["seguridad", "fraude", "proteccion", "respaldo"], icon: phosphor(PhShieldCheck) },
  { keywords: ["identidad", "biometr", "huella", "validacion"], icon: phosphor(PhFingerprint) },
  { keywords: ["flujo", "caja", "liquidez", "cash"], icon: phosphor(PhWallet) },
  { keywords: ["chequera", "cheque", "autogestion"], icon: phosphor(PhNotePencil) },
  { keywords: ["planilla", "nomina", "equipo"], icon: phosphor(PhUsersThree) },
  { keywords: ["agro", "sostenib", "verde"], icon: phosphor(PhTree) },
  { keywords: ["leasing", "equipo", "maquina"], icon: phosphor(PhPackage) },
  { keywords: ["vivienda", "casa", "hipotec"], icon: phosphor(PhHouse) },
  { keywords: ["construc", "obra"], icon: phosphor(PhWrench) },
  { keywords: ["mejora", "remodel"], icon: phosphor(PhSparkle) },
  { keywords: ["refinanc"], icon: phosphor(PhCurrencyCircleDollar) },
  { keywords: ["compra"], icon: phosphor(PhHouse) },
  { keywords: ["auto", "vehiculo", "carro", "concesionario"], icon: phosphor(PhCar) },
  { keywords: ["tarjeta", "mastercard", "debito"], icon: phosphor(PhCreditCard) },
  { keywords: ["tasa", "interes", "rendimiento", "inversion"], icon: phosphor(PhCoins) },
  { keywords: ["digital", "online", "app", "cloud"], icon: phosphor(PhCloudCheck) },
  { keywords: ["papeleo", "papel", "documento", "tramite"], icon: phosphor(PhFileText) },
  { keywords: ["rapidez", "agil", "veloc", "eficiente"], icon: phosphor(PhLightning) },
  { keywords: ["dispositivo", "mobile", "celular", "tablet"], icon: phosphor(PhDeviceMobile) },
  { keywords: ["personalizada", "atencion", "acompanamiento", "aliado"], icon: phosphor(PhHandshake) },
  { keywords: ["empresa", "comercial", "negocio"], icon: phosphor(PhBriefcase) },
  { keywords: ["control", "gestion", "financ"], icon: phosphor(PhChartPie) },
  { keywords: ["mercado", "valores", "perfil"], icon: phosphor(PhPresentationChart) },
  { keywords: ["certificado", "aprob"], icon: phosphor(PhCheckCircle) },
  { keywords: ["clipboard"], icon: phosphor(PhClipboardText) },
  { keywords: ["carnet"], icon: phosphor(PhIdentificationCard) },
  { keywords: ["cliente", "persona", "perfil"], icon: phosphor(PhUsersThree) },
  { keywords: ["premio", "exito"], icon: phosphor(PhMedal) },
  { keywords: ["edificio", "sector"], icon: phosphor(PhBuildings) },
  { keywords: ["fabrica", "industria"], icon: phosphor(PhFactory) },
  { keywords: ["banco", "unibank"], icon: phosphor(PhBank) },
  { keywords: ["dinero", "moneda", "dolar"], icon: phosphor(PhCurrencyCircleDollar) },
  { keywords: ["maletin"], icon: phosphor(PhBriefcase) },
  { keywords: ["candado", "lock"], icon: phosphor(PhLockKey) },
  { keywords: ["meta", "objetivo"], icon: phosphor(PhTarget) },
  { keywords: ["tiempo", "plazo", "24"], icon: phosphor(PhTimer) },
  { keywords: ["internacional", "global"], icon: phosphor(PhGlobe) },
  { keywords: ["sparkle", "nuevo"], icon: phosphor(PhSparkle) },
];

const FALLBACK_ICON = phosphor(PhSparkle);

const TILE_SIZE: Record<FeatureIconTileSize, { box: string; icon: number; cms: string }> = {
  sm: { box: "h-10 w-10", icon: 18, cms: "h-[18px] w-[18px]" },
  md: { box: "h-12 w-12", icon: 22, cms: "h-[22px] w-[22px]" },
  lg: { box: "h-14 w-14 md:h-[60px] md:w-[60px]", icon: 26, cms: "h-[26px] w-[26px]" },
};

function lookupIcon(text?: string | null): BenefitIconComponent | null {
  if (!text?.trim()) return null;

  const key = normalizeTitle(text);
  const exact = TITLE_ICON_MAP[key];
  if (exact) return exact;

  for (const entry of KEYWORD_ICONS) {
    if (entry.keywords.some((keyword) => key.includes(keyword))) {
      return entry.icon;
    }
  }

  return null;
}

export function isBenefitIconMapped(title?: string | null, description?: string | null): boolean {
  return Boolean(lookupIcon(title) ?? lookupIcon(description));
}

export function resolveBenefitIcon(
  title?: string | null,
  description?: string | null,
): BenefitIconComponent {
  return lookupIcon(title) ?? lookupIcon(description) ?? FALLBACK_ICON;
}

export function resolveCmsAssetUrl(url?: string): string | null {
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

/** Flat, muted icon tile — shared across CMS product sections. */
export function FeatureIconTile({
  title,
  description,
  cmsIconUrl,
  index,
  size = "md",
  variant = "muted",
  className = "",
  lift = false,
}: {
  title?: string | null;
  description?: string | null;
  cmsIconUrl?: string | null;
  index?: number;
  size?: FeatureIconTileSize;
  variant?: FeatureIconTileVariant;
  className?: string;
  lift?: boolean;
}) {
  const Icon = resolveBenefitIcon(title, description);
  const cfg = TILE_SIZE[size];
  const usePhosphor = isBenefitIconMapped(title, description);
  const isAccent = variant === "accent";

  const tileClass = [
    "flex items-center justify-center",
    cfg.box,
    isAccent ? "rounded-2xl bg-primary/10" : "rounded-xl bg-[var(--surface-page)]",
    lift ? "page-icon-lift" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconClass = isAccent ? "text-primary" : "text-foreground/45";
  const cmsClass = isAccent
    ? `${cfg.cms} object-contain`
    : `${cfg.cms} object-contain opacity-60 grayscale-[0.15]`;

  return (
    <div className={`relative shrink-0 ${className}`.trim()} aria-hidden>
      <div className={tileClass}>
        {usePhosphor ? (
          <Icon size={cfg.icon} className={iconClass} />
        ) : cmsIconUrl ? (
          <img src={cmsIconUrl} alt="" className={cmsClass} />
        ) : (
          <Icon size={cfg.icon} className={iconClass} />
        )}
      </div>

      {index !== undefined && (
        <span className="absolute -bottom-1 -right-1 flex h-[18px] min-w-[18px] px-0.5 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-subtle)] text-[9px] font-semibold leading-none text-muted-foreground">
          {index + 1}
        </span>
      )}
    </div>
  );
}

/** @deprecated Use FeatureIconTile — kept for existing imports. */
export function BenefitIconTile({
  title,
  description,
  className = "",
}: {
  title?: string | null;
  description?: string | null;
  className?: string;
}) {
  return (
    <FeatureIconTile
      title={title}
      description={description}
      size="md"
      className={className}
    />
  );
}
