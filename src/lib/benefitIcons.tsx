import type { ComponentType, SVGProps } from "react";
import {
  Bank as PhBank,
  Briefcase as PhBriefcase,
  Buildings as PhBuildings,
  BuildingOffice as PhBuildingOffice,
  Car as PhCar,
  ChartBar as PhChartBar,
  ChartLineUp as PhChartLineUp,
  Checks as PhChecks,
  ClipboardText as PhClipboardText,
  Clock as PhClock,
  CloudCheck as PhCloudCheck,
  CreditCard as PhCreditCard,
  CurrencyCircleDollar as PhCurrencyCircleDollar,
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
  Leaf as PhLeaf,
  Lightning as PhLightning,
  LockKey as PhLockKey,
  NotePencil as PhNotePencil,
  Package as PhPackage,
  Percent as PhPercent,
  PresentationChart as PhPresentationChart,
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
import {
  Award as DuoAward,
  Bank as DuoBank,
  Briefcase as DuoBriefcase,
  Building as DuoBuilding,
  ChartPie as DuoChartPie,
  CheckCircle as DuoCheckCircle,
  Clipboard as DuoClipboard,
  Clock as DuoClock,
  CoinStack as DuoCoinStack,
  CreditCard as DuoCreditCard,
  IdCard as DuoIdCard,
  Rocket as DuoRocket,
  Target as DuoTarget,
  UserCard as DuoUserCard,
  World as DuoWorld,
} from "@duo-icons/react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

export type BenefitIconComponent = ComponentType<IconProps>;

type PhosphorIcon = ComponentType<
  IconProps & { weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }
>;

/** Normalize Phosphor icons to a shared props shape with duotone weight. */
function phosphor(Icon: PhosphorIcon): BenefitIconComponent {
  function PhosphorBenefitIcon({ size = 28, color = "currentColor", ...props }: IconProps) {
    return <Icon size={size} color={color} weight="duotone" {...props} />;
  }
  PhosphorBenefitIcon.displayName = `Benefit(${Icon.displayName ?? "PhosphorIcon"})`;
  return PhosphorBenefitIcon;
}

/** Normalize Duo icons to the same props shape (no weight prop). */
function duo(Icon: ComponentType<IconProps>): BenefitIconComponent {
  function DuoBenefitIcon({ size = 28, color = "currentColor", ...props }: IconProps) {
    return <Icon size={size} color={color} {...props} />;
  }
  DuoBenefitIcon.displayName = `Benefit(${Icon.displayName ?? "DuoIcon"})`;
  return DuoBenefitIcon;
}

function normalizeTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Explicit title → icon (Phosphor preferred; Duo when it’s a better fit). */
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
  "ideal para metas definidas": duo(DuoTarget),
  "disponibilidad para clientes": duo(DuoClock),

  // Personas · Vivienda
  "seguridad y transparencia": phosphor(PhShieldCheck),
  "enfoque a largo plazo": phosphor(PhHouse),
  "acompanamiento especializado": phosphor(PhHandshake),

  // Personas · Auto
  "accesible a mas perfiles": phosphor(PhUsersThree),
  "desembolso eficiente": duo(DuoRocket),
  "control total": phosphor(PhChecks),

  // Personas · Mastercard
  "comodidad y control": phosphor(PhCreditCard),
  "asistencia 24 7": phosphor(PhClock),
  "respaldo internacional": duo(DuoWorld),

  // Empresas · Cuenta Jurídica Digital
  "control de flujo de caja": phosphor(PhChartLineUp),
  "seguridad avanzada": phosphor(PhShieldCheck),
  "autogestion de chequeras": phosphor(PhClipboardText),

  // Empresas · Préstamo Comercial
  "sectores diversos": phosphor(PhBuildings),
  "vision estrategica": phosphor(PhEye),
  "ecosistema unibank": duo(DuoBank),

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
  "impulso a la competitividad": duo(DuoRocket),
  "flexibilidad en equipos": phosphor(PhWrench),
  "eficiencia operativa": phosphor(PhLightning),
};

/** Keyword heuristics when an exact title isn’t mapped yet. */
const KEYWORD_ICONS: Array<{ keywords: string[]; icon: BenefitIconComponent }> = [
  { keywords: ["seguridad", "fraude", "proteccion", "respaldo"], icon: phosphor(PhShieldCheck) },
  { keywords: ["identidad", "biometr", "huella"], icon: phosphor(PhFingerprint) },
  { keywords: ["flujo", "caja", "liquidez", "cash"], icon: phosphor(PhWallet) },
  { keywords: ["chequera", "cheque", "autogestion"], icon: phosphor(PhNotePencil) },
  { keywords: ["planilla", "nomina", "equipo"], icon: phosphor(PhUsersThree) },
  { keywords: ["agro", "sostenib", "verde"], icon: phosphor(PhTree) },
  { keywords: ["leasing", "equipo", "maquina"], icon: phosphor(PhPackage) },
  { keywords: ["vivienda", "casa", "hipotec"], icon: phosphor(PhHouse) },
  { keywords: ["auto", "vehiculo", "carro"], icon: phosphor(PhCar) },
  { keywords: ["tarjeta", "mastercard", "debito"], icon: duo(DuoCreditCard) },
  { keywords: ["tasa", "interes", "rendimiento", "inversion"], icon: duo(DuoCoinStack) },
  { keywords: ["digital", "tramite", "online", "app"], icon: phosphor(PhCloudCheck) },
  { keywords: ["empresa", "comercial", "negocio"], icon: duo(DuoBriefcase) },
  { keywords: ["control", "gestion", "financ"], icon: duo(DuoChartPie) },
  { keywords: ["mercado", "valores", "perfil"], icon: phosphor(PhPresentationChart) },
  { keywords: ["certificado", "aprob"], icon: duo(DuoCheckCircle) },
  { keywords: ["documento", "clipboard"], icon: duo(DuoClipboard) },
  { keywords: ["id", "carnet"], icon: duo(DuoIdCard) },
  { keywords: ["cliente", "user", "persona"], icon: duo(DuoUserCard) },
  { keywords: ["premio", "exito"], icon: duo(DuoAward) },
  { keywords: ["edificio", "sector"], icon: duo(DuoBuilding) },
  { keywords: ["fabrica", "industria"], icon: phosphor(PhFactory) },
  { keywords: ["banco", "unibank"], icon: phosphor(PhBank) },
  { keywords: ["dinero", "moneda", "dolar"], icon: phosphor(PhCurrencyCircleDollar) },
  { keywords: ["maletin"], icon: phosphor(PhBriefcase) },
  { keywords: ["candado", "lock"], icon: phosphor(PhLockKey) },
  { keywords: ["meta", "objetivo"], icon: phosphor(PhTarget) },
  { keywords: ["tiempo", "plazo"], icon: phosphor(PhTimer) },
  { keywords: ["sparkle", "nuevo"], icon: phosphor(PhSparkle) },
];

const FALLBACK_ICON = phosphor(PhSparkle);

export function resolveBenefitIcon(title?: string | null): BenefitIconComponent {
  if (!title?.trim()) return FALLBACK_ICON;

  const key = normalizeTitle(title);
  const exact = TITLE_ICON_MAP[key];
  if (exact) return exact;

  for (const entry of KEYWORD_ICONS) {
    if (entry.keywords.some((keyword) => key.includes(keyword))) {
      return entry.icon;
    }
  }

  return FALLBACK_ICON;
}

export function BenefitIconTile({
  title,
  className = "",
}: {
  title?: string | null;
  className?: string;
}) {
  const Icon = resolveBenefitIcon(title);

  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-16 sm:w-16 ${className}`}
      aria-hidden
    >
      <Icon size={28} color="currentColor" className="text-primary" />
    </div>
  );
}
