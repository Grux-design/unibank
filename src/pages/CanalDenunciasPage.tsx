import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ReCaptcha, { type ReCaptchaHandle } from "@/components/atoms/ReCaptcha";
import { isRecaptchaBypassed } from "@/lib/recaptcha";
import { StaticPageFrame, StaticPageSection } from "@/components/organisms/StaticPageLayout";
import { CTA_BUTTON_LAYOUT_CLASS } from "@/constants/ctaButtons";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  UploadCloud,
  ShieldCheck,
  FileText,
  User,
  MessageSquare,
  Calendar as CalendarIcon,
  Clock,
  X,
  CheckCircle2,
  Info,
  Lock,
  ForbiddenCircle,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const MAX_FILE_MB = 20;
const ACCEPT = ".jpg,.jpeg,.png,.pdf,.doc,.docx,.ppt,.pptx,.mov,.mp3,.zip,.m4a,.mp4";

const relationships = ["Empleado", "Accionista", "Proveedor", "Cliente", "Miembro de la Junta Directiva", "Estudiante", "Otro"];
const locations = ["Casa Matriz", "Costa del Este", "Oficinas", "Otra"];
const companies = ["UniBank", "UniTrust", "Uni Leasing", "Invertis Securities", "UniVivir"];
const reasons = [
  "Incumplimiento al Código de Ética",
  "Corrupción, Soborno y Cohecho",
  "Conflictos de interés / actividades fuera del Grupo",
  "Prevención de Blanqueo de Capitales y Financiamiento del Terrorismo, Financiamiento de Armas de Destrucción Masiva / Evasión Fiscal",
  "Competencia Desleal",
  "Privacidad / Seguridad de la Información / Confidencialidad",
  "Fraude",
  "Ciberseguridad",
  "Desigualdad de oportunidades",
  "Discriminación",
  "Acoso Sexual o por razón de sexo",
  "Acoso laboral",
  "Represalias",
  "Maltrato Físico o Psicológico",
  "Falsificación de Información (Interna o Externa)",
  "Otro",
];
const knowledgeSources = ["Me sucedió a mí", "Lo he visto", "Lo he escuchado", "Me lo han dicho", "Vi un documento", "Otro"];

import {
  FIELD_DATE_TRIGGER_CLASS,
  FIELD_EMPTY_LABEL_CLASS,
  FIELD_SELECT_CONTENT_CLASS,
  FIELD_SELECT_TRIGGER_CLASS,
  FIELD_SELECT_VALUE_CLASS,
  FIELD_SLOT_CLASS,
  FIELD_TEXTAREA_INSET_CLASS,
  FIELD_TEXTAREA_WRAPPER_CLASS,
  FORM_BODY_CLASS,
  FORM_FIELDS_STACK_CLASS,
  FORM_ITEM_CLASS,
} from "@/constants/formFields";

const FORM_PLACEHOLDERS = {
  relationship: "Seleccione su relación con el grupo",
  location: "Seleccione el lugar de los hechos",
  company: "Seleccione la empresa relacionada",
  name: "Ej.: María González",
  phone: "Ej.: 6000-0000",
  email: "Ej.: nombre@correo.com",
  reason: "Seleccione el motivo de la denuncia",
  knowledgeSource: "Indique cómo conoce los hechos",
  description:
    "Describa qué ocurrió, quién participó, cuándo sucedió y cualquier detalle que considere relevante…",
  incidentDate: "Seleccione la fecha del incidente",
  incidentTime: "Seleccione la hora del incidente",
} as const;

const FIELD_POPOVER_CONTENT_CLASS =
  "w-auto rounded-[12px] border border-[var(--surface-border)] bg-[var(--surface-page)] p-0 shadow-none";

const TIME_PICKER_HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const TIME_PICKER_MINUTES = Array.from({ length: 60 }, (_, i) => i);

const TIME_PICKER_ITEM_CLASS =
  "flex h-9 w-12 shrink-0 items-center justify-center rounded-lg text-sm tabular-nums transition-colors";

function TimePickerColumn({
  label,
  children,
  scrollRef,
}: {
  label: string;
  children: React.ReactNode;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="border-b border-[var(--surface-border)] px-2 py-2 text-center text-xs font-medium text-muted-foreground">
        {label}
      </div>
      <div
        ref={scrollRef}
        className="h-56 overflow-y-auto overscroll-contain px-2 py-2 [scrollbar-width:thin]"
      >
        <div className="flex flex-col items-center gap-0.5">{children}</div>
      </div>
    </div>
  );
}

function to24Hour(hour12: number, isAm: boolean): number {
  if (isAm) return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

function parseIncidentTime(value: string) {
  if (!/^\d{2}:\d{2}$/.test(value)) {
    return { hour24: 12, minute: 0 };
  }
  return {
    hour24: parseInt(value.slice(0, 2), 10),
    minute: parseInt(value.slice(3, 5), 10),
  };
}

function formatIncidentTime(hour24: number, minute: number) {
  return `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatIncidentTimeDisplay(value: string) {
  const { hour24, minute } = parseIncidentTime(value);
  const hour12 = hour24 % 12 || 12;
  const suffix = hour24 < 12 ? "AM" : "PM";
  return `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function IncidentTimePicker({
  value,
  onChange,
  onBlur,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hourScrollRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);
  const selectedHourRef = useRef<HTMLButtonElement>(null);
  const selectedMinuteRef = useRef<HTMLButtonElement>(null);
  const { hour24, minute } = parseIncidentTime(value);
  const hour12 = hour24 % 12 || 12;
  const isAm = hour24 < 12;

  useEffect(() => {
    if (!open) return;

    const scrollSelected = (
      container: HTMLDivElement | null,
      item: HTMLButtonElement | null,
    ) => {
      if (!container || !item) return;
      const offset = item.offsetTop - container.clientHeight / 2 + item.clientHeight / 2;
      container.scrollTop = Math.max(0, offset);
    };

    requestAnimationFrame(() => {
      scrollSelected(hourScrollRef.current, selectedHourRef.current);
      scrollSelected(minuteScrollRef.current, selectedMinuteRef.current);
    });
  }, [open, hour12, minute]);

  const updateTime = (nextHour12: number, nextMinute: number, nextIsAm: boolean) => {
    onChange(formatIncidentTime(to24Hour(nextHour12, nextIsAm), nextMinute));
  };

  const pickerItemClass = (selected: boolean) =>
    cn(
      TIME_PICKER_ITEM_CLASS,
      selected
        ? "bg-primary font-medium text-primary-foreground"
        : "text-foreground hover:bg-[var(--surface-subtle)]",
    );

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) onBlur?.();
      }}
    >
      <PopoverTrigger asChild>
        <FormControl>
          <button
            type="button"
            className={cn(FIELD_DATE_TRIGGER_CLASS, !value && FIELD_EMPTY_LABEL_CLASS)}
          >
            <Clock className="mr-2 h-4 w-4 shrink-0 opacity-60" />
            {value ? formatIncidentTimeDisplay(value) : <span>{FORM_PLACEHOLDERS.incidentTime}</span>}
          </button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent sideOffset={8} align="start" className={cn(FIELD_POPOVER_CONTENT_CLASS, "w-auto p-0")}>
        <div className="flex divide-x divide-[var(--surface-border)]">
          <TimePickerColumn label="Hora" scrollRef={hourScrollRef}>
            {TIME_PICKER_HOURS.map((h) => (
              <button
                key={h}
                ref={h === hour12 ? selectedHourRef : undefined}
                type="button"
                onClick={() => updateTime(h, minute, isAm)}
                className={pickerItemClass(h === hour12)}
              >
                {String(h).padStart(2, "0")}
              </button>
            ))}
          </TimePickerColumn>

          <TimePickerColumn label="Min" scrollRef={minuteScrollRef}>
            {TIME_PICKER_MINUTES.map((m) => (
              <button
                key={m}
                ref={m === minute ? selectedMinuteRef : undefined}
                type="button"
                onClick={() => updateTime(hour12, m, isAm)}
                className={pickerItemClass(m === minute)}
              >
                {String(m).padStart(2, "0")}
              </button>
            ))}
          </TimePickerColumn>

          <div className="flex min-w-[3.5rem] flex-col">
            <div className="border-b border-[var(--surface-border)] px-2 py-2 text-center text-xs font-medium text-muted-foreground">
              &nbsp;
            </div>
            <div className="flex h-56 flex-col items-center justify-start gap-0.5 px-2 py-2">
              {(["AM", "PM"] as const).map((period) => {
                const periodIsAm = period === "AM";
                return (
                  <button
                    key={period}
                    type="button"
                    onClick={() => updateTime(hour12, minute, periodIsAm)}
                    className={pickerItemClass(isAm === periodIsAm)}
                  >
                    {period}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const FIELD_CALENDAR_CLASS_NAMES = {
  caption_label: "text-sm font-semibold text-foreground",
  head_cell: "w-9 text-muted-foreground text-[0.8rem] font-normal",
  nav_button:
    "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--surface-border)] bg-transparent p-0 text-foreground opacity-80 hover:bg-[var(--surface-subtle)] hover:opacity-100",
  cell: "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
  day: "inline-flex h-9 w-9 items-center justify-center rounded-lg p-0 font-normal text-foreground hover:bg-[var(--surface-subtle)] aria-selected:opacity-100",
  day_selected:
    "!rounded-lg bg-primary text-primary-foreground hover:!rounded-lg hover:bg-primary hover:text-primary-foreground focus:!rounded-lg focus:bg-primary focus:text-primary-foreground",
  day_today:
    "rounded-lg bg-[var(--surface-accent)] font-medium text-foreground aria-selected:bg-primary aria-selected:text-primary-foreground",
  day_outside: "text-muted-foreground opacity-40",
  day_disabled: "text-muted-foreground opacity-30",
};

/** Form copy scale — aligns labels, body, hints and legal text */
const FORM_TITLE_CLASS = "type-item-title-sm text-foreground";

const INFO_BANNER_TITLE_CLASS = "text-base font-semibold leading-snug text-foreground";
const INFO_BANNER_BODY_CLASS = "text-sm font-normal leading-[1.65] text-foreground";

function InfoBanner({
  title,
  children,
  icon: Icon = Info,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "rounded-xl border border-blue-200 bg-blue-50 px-4 py-3.5 sm:px-5 sm:py-4",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 pt-0.5">
          {title && <p className={INFO_BANNER_TITLE_CLASS}>{title}</p>}
          <div className={cn(INFO_BANNER_BODY_CLASS, title && "mt-2")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarCommitmentBanner() {
  return (
    <InfoBanner title="Compromiso UniBank" icon={ShieldCheck}>
      Cada reporte se revisa con objetividad y confidencialidad, sin represalias hacia quien denuncia
      de buena fe.
    </InfoBanner>
  );
}

const trustPoints = [
  {
    icon: Lock,
    title: "Confidencialidad",
    description: "Tratamiento confidencial, objetivo e imparcial.",
  },
  {
    icon: ShieldCheck,
    title: "Denuncias anónimas",
    description: "Puede reportar sin identificarse si lo prefiere.",
  },
  {
    icon: ForbiddenCircle,
    title: "Sin represalias",
    description: "Canal seguro para quien denuncia de buena fe.",
  },
];

const schema = z
  .object({
    relationship: z.string().min(1, "Seleccione una opción"),
    location: z.string().min(1, "Seleccione una opción"),
    company: z.string().min(1, "Seleccione una opción"),
    is_anonymous: z.enum(["si", "no"]),
    name: z.string().max(100).optional(),
    phone: z.string().max(30).optional(),
    email: z.string().email("Correo inválido").max(255).optional().or(z.literal("")),
    reason: z.string().min(1, "Seleccione un motivo"),
    knowledge_source: z.string().min(1, "Seleccione una opción"),
    description: z.string().trim().min(10, "Mínimo 10 caracteres").max(5000),
    incident_date: z.date({ required_error: "Seleccione una fecha" }),
    incident_time: z.string().regex(/^\d{2}:\d{2}$/, "Hora requerida"),
    accepted_terms: z.boolean().refine((v) => v, "Debe aceptar los términos"),
  })
  .superRefine((data, ctx) => {
    if (data.is_anonymous !== "no") return;

    if (!data.name?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nombre requerido", path: ["name"] });
    }
    if (!data.phone?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Teléfono requerido", path: ["phone"] });
    }
    if (!data.email?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Correo requerido", path: ["email"] });
    }
  });

type FormValues = z.infer<typeof schema>;

function isIdentityStepComplete(values: Pick<FormValues, "is_anonymous" | "name" | "phone" | "email">) {
  if (values.is_anonymous === "si") return true;
  return !!(values.name?.trim() && values.phone?.trim() && values.email?.trim());
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// ───────────────────────── Form progress ─────────────────────────
function FormProgress({ percent, currentStep }: { percent: number; currentStep: number }) {
  return (
    <div className="mb-8 md:mb-10">
      <p className="mb-2 text-left text-sm text-muted-foreground">
        Paso: {currentStep}/5
      </p>
      <div className="flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--surface-subtle)]">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{percent}%</span>
      </div>
    </div>
  );
}

// ───────────────────────── Field group ─────────────────────────
function FormFieldGroup({
  label,
  hint,
  children,
}: {
  label?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-page)] p-5 sm:p-6">
      {label && (
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          {hint && <p className={cn("mt-1.5", FORM_BODY_CLASS)}>{hint}</p>}
        </div>
      )}
      <div className="space-y-5 sm:space-y-6">{children}</div>
    </div>
  );
}

// ───────────────────────── Section wrapper ─────────────────────────
function Section({
  title,
  subtitle,
  icon: Icon,
  active,
  done,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  active: boolean;
  done: boolean;
  children: React.ReactNode;
}) {
  const showContent = active || done;

  return (
    <section
      className={cn(
        "rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-page)] p-5 sm:p-6",
        !active && !done && "pointer-events-none opacity-50",
      )}
    >
      <header className={cn("flex items-start gap-3.5", showContent && "mb-6")}>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            done || active
              ? "bg-primary text-primary-foreground"
              : "bg-[var(--surface-subtle)] text-muted-foreground",
          )}
        >
          {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className={FORM_TITLE_CLASS}>{title}</h2>
          {subtitle && <p className={cn("mt-0.5", FORM_BODY_CLASS)}>{subtitle}</p>}
        </div>
      </header>
      {showContent && <div className={FORM_FIELDS_STACK_CLASS}>{children}</div>}
    </section>
  );
}

// ───────────────────────── Reason info panel ─────────────────────────
function ReasonInfoPanel({ reason }: { reason: string }) {
  if (reason === "Corrupción, Soborno y Cohecho") {
    return (
      <div className="space-y-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-page)] p-5 text-sm text-foreground/90 animate-in fade-in slide-in-from-top-1 duration-300">
        <div className="flex items-center gap-2 font-semibold text-primary">
          <Info className="h-4 w-4" /> Información sobre este motivo
        </div>

        <div>
          <h4 className="font-semibold text-foreground">Corrupción</h4>
          <p className={cn("mt-1", FORM_BODY_CLASS)}>
            La corrupción se refiere al abuso de poder o posición para obtener beneficios personales, generalmente a través de actos ilegales o inmorales. Este fenómeno puede ocurrir en diversos ámbitos, como el político, el empresarial y el social.
          </p>
          <ul className={cn("mt-2 list-disc space-y-1 pl-5", FORM_BODY_CLASS)}>
            <li><strong>Soborno:</strong> Un funcionario público acepta dinero a cambio de otorgar contratos gubernamentales.</li>
            <li><strong>Malversación:</strong> Un empleado desfalca fondos de una empresa para uso personal.</li>
            <li><strong>Tráfico de influencias:</strong> Un político utiliza su posición para asegurar un puesto de trabajo para un familiar.</li>
            <li><strong>Evasión fiscal:</strong> Una empresa oculta ingresos para pagar menos impuestos.</li>
            <li><strong>Extorsión:</strong> Un oficial de policía exige dinero a cambio de no imponer una multa.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">Soborno</h4>
          <p className={cn("mt-1 italic", FORM_BODY_CLASS)}>
            Refiérase sin limitarse al Libro Segundo de los Delitos Título VII – Delitos contra el Orden Económico, Capítulos III Delitos Financieros y IV Blanqueo de Capitales del Código Penal de Panamá.
          </p>
          <p className={cn("mt-2", FORM_BODY_CLASS)}>
            El soborno es la acción de corromper a alguien mediante dinero, regalos o favores para obtener algo a cambio, generalmente de manera ilegal o inmoral. Es una forma de corrupción que implica el uso indebido de influencias o poder para obtener beneficios personales o empresariales.
          </p>
          <ul className={cn("mt-2 list-disc space-y-1 pl-5", FORM_BODY_CLASS)}>
            <li><strong>Soborno a funcionarios públicos:</strong> Un empresario paga a un funcionario para ganar una licitación o contrato gubernamental.</li>
            <li><strong>Soborno a jueces o abogados:</strong> Ofrecer dinero a un juez para obtener un fallo favorable en un caso judicial.</li>
            <li><strong>Soborno en el ámbito empresarial:</strong> Un vendedor soborna al encargado de compras de una empresa para que elija su producto sobre el de la competencia.</li>
            <li><strong>Soborno en el deporte:</strong> Pagar a un deportista para influir en el resultado de un partido.</li>
            <li><strong>Soborno en la salud:</strong> Ofrecer dinero a un profesional de la salud para recibir atención preferencial.</li>
          </ul>
          <p className={cn("mt-2 italic", FORM_BODY_CLASS)}>
            Refiérase sin limitarse al Libro Segundo de los Delitos Título VII – Delitos contra el Orden Económico, Capítulo IV Blanqueo de Capitales del Código Penal de Panamá.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">Cohecho</h4>
          <p className={cn("mt-1", FORM_BODY_CLASS)}>
            El cohecho es un delito que implica ofrecer, prometer o dar a un funcionario público dinero, regalos u otros beneficios para que realice o deje de realizar una acción en el ejercicio de sus funciones. Este delito puede ser tanto activo como pasivo:
          </p>
          <ul className={cn("mt-2 list-disc space-y-1 pl-5", FORM_BODY_CLASS)}>
            <li><strong>Cohecho activo:</strong> Cuando una persona ofrece o da el soborno.</li>
            <li><strong>Cohecho pasivo:</strong> Cuando el funcionario público recibe o acepta el soborno.</li>
            <li><strong>Cohecho en licitaciones:</strong> Un empresario ofrece dinero a un funcionario para ganar una licitación pública.</li>
            <li><strong>Cohecho judicial:</strong> Un abogado soborna a un juez para obtener un fallo favorable en un caso.</li>
            <li><strong>Cohecho en inspecciones:</strong> Un comerciante paga a un inspector para evitar una multa por incumplimientos.</li>
            <li><strong>Cohecho en permisos:</strong> Un ciudadano ofrece dinero a un funcionario para acelerar la obtención de un permiso de construcción.</li>
          </ul>
          <p className={cn("mt-2 italic", FORM_BODY_CLASS)}>
            Refiérase sin limitarse al Libro Segundo de los Delitos Título X - Delitos Contra la Administración Pública del Código Penal de Panamá.
          </p>
        </div>
      </div>
    );
  }

  if (reason === "Prevención de Blanqueo de Capitales y Financiamiento del Terrorismo, Financiamiento de Armas de Destrucción Masiva / Evasión Fiscal") {
    return (
      <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-page)] p-5 text-sm text-foreground/90 animate-in fade-in slide-in-from-top-1 duration-300">
        <div className="mb-2 flex items-center gap-2 font-semibold text-primary">
          <Info className="h-4 w-4" /> Información sobre este motivo
        </div>
        <p className={FORM_BODY_CLASS}>
          Para conocer más sobre las Señales de Alerta contra el Blanqueo de Capitales, Financiamiento del Terrorismo y el Financiamiento de la Proliferación de Armas de Destrucción Masiva ver el siguiente documento:{" "}
          <a
            href="https://www.uaf.gob.pa/tmp/file/487/Catalogo-de-Senales-de-Alerta.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline"
          >
            Catálogo de Señales
          </a>.
        </p>
      </div>
    );
  }

  return null;
}

// ───────────────────────── Success state ─────────────────────────
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="page-section-card rounded-2xl p-8 text-center sm:rounded-3xl sm:p-10 md:p-12">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-accent)] text-primary">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h2 className="type-content-section-headline text-foreground">Denuncia recibida</h2>
      <p className={cn("mx-auto mt-4 max-w-md", FORM_BODY_CLASS)}>
        Su denuncia ha sido enviada correctamente. Gracias por contribuir a la ética y transparencia de Grupo UniBank.
      </p>
      <Button
        type="button"
        size="lg"
        variant="outline"
        onClick={onReset}
        className={cn("mt-8 rounded-xl", CTA_BUTTON_LAYOUT_CLASS)}
      >
        Enviar otra denuncia
      </Button>
    </div>
  );
}

// ───────────────────────── Page ─────────────────────────
export default function CanalDenunciasPage() {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaHandle>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      relationship: "",
      location: "",
      company: "",
      is_anonymous: "no",
      name: "",
      phone: "",
      email: "",
      reason: "",
      knowledge_source: "",
      description: "",
      incident_date: undefined as unknown as Date,
      incident_time: "",
      accepted_terms: false,
    },
  });

  const v = form.watch();

  const step1Done = !!(v.relationship && v.location && v.company);
  const step2Done = isIdentityStepComplete(v);
  const step3Done = !!(v.reason && v.knowledge_source && v.description && v.description.length >= 10);
  const step4Done = !!(v.incident_date && v.incident_time);
  const recaptchaReady = isRecaptchaBypassed() || Boolean(recaptchaToken);

  const step1Complete = step1Done;
  const step2Complete = step1Complete && step2Done;
  const step3Complete = step2Complete && step3Done;
  const step4Complete = step3Complete && step4Done;
  const step5Complete = step4Complete && v.accepted_terms && recaptchaReady;

  const currentStep = !step1Complete ? 1 : !step2Complete ? 2 : !step3Complete ? 3 : !step4Complete ? 4 : 5;
  const progressPercent = step5Complete
    ? 100
    : step4Complete
      ? 80
      : step3Complete
        ? 60
        : step2Complete
          ? 40
          : step1Complete
            ? 20
            : 5;

  const handleFile = (f: File | null) => {
    if (!f) return setFile(null);
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      toast({ title: "Archivo muy grande", description: `Máximo ${MAX_FILE_MB} MB.`, variant: "destructive" });
      return;
    }
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const onSubmit = async (values: FormValues) => {
    const bypassRecaptcha = isRecaptchaBypassed();

    if (!bypassRecaptcha && !recaptchaToken) {
      toast({ title: "Verificación requerida", description: "Por favor completa el reCAPTCHA.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      if (!bypassRecaptcha) {
        const { data: verifyData, error: verifyError } = await supabase.functions.invoke("verify-recaptcha", {
          body: { token: recaptchaToken },
        });
        if (verifyError || !verifyData?.success) {
          toast({ title: "Verificación fallida", description: "No se pudo validar reCAPTCHA. Intente de nuevo.", variant: "destructive" });
          recaptchaRef.current?.reset();
          setRecaptchaToken(null);
          setSending(false);
          return;
        }
      }

      let file_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("complaint-files").upload(path, file);
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from("complaint-files").getPublicUrl(path);
        file_url = urlData.publicUrl;
      }

      const incident_date = format(values.incident_date, "yyyy-MM-dd");
      const incident_time = values.incident_time;

      const { error } = await supabase.from("complaints").insert({
        relationship: values.relationship,
        location: values.location,
        company: values.company,
        is_anonymous: values.is_anonymous === "si",
        name: values.name || null,
        phone: values.phone || null,
        email: values.email || null,
        reason: values.reason,
        description: values.description,
        incident_date,
        incident_time,
        file_url,
        accepted_terms: values.accepted_terms,
      });
      if (error) throw error;

      try {
        const { error: mailErr } = await supabase.functions.invoke("send-complaint", {
          body: {
            relationship: values.relationship,
            location: values.location,
            company: values.company,
            isAnonymous: values.is_anonymous === "si",
            name: values.name || null,
            phone: values.phone || null,
            email: values.email || null,
            reason: values.reason,
            knowledgeSource: values.knowledge_source,
            description: values.description,
            incidentDate: incident_date,
            incidentTime: incident_time,
            fileUrl: file_url,
            fileName: file?.name ?? null,
            recaptchaToken,
          },
        });
        if (mailErr) console.error("send-complaint failed:", mailErr);
      } catch (mailEx) {
        console.error("send-complaint exception:", mailEx);
      }

      toast({ title: "Denuncia enviada", description: "Su denuncia ha sido recibida. Gracias por contribuir a la ética y transparencia." });
      form.reset();
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setSubmitted(true);
    } catch {
      toast({ title: "Error", description: "No se pudo enviar la denuncia. Intente de nuevo.", variant: "destructive" });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setSending(false);
    }
  };

  const handleNewComplaint = () => {
    setSubmitted(false);
  };

  return (
    <>
      <Helmet>
        <title>Canal de Denuncias – UniBank</title>
        <meta name="description" content="Canal de denuncias de Grupo UniBank. Reporte situaciones que afecten la ética, moral y legalidad de forma confidencial." />
        <link rel="canonical" href="https://unibank.com.pa/canal-de-denuncias" />
      </Helmet>

      <StaticPageFrame page="canal-denuncias">
        <StaticPageSection bandIndex={0}>
          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <aside className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-28 lg:self-start lg:gap-10">
                <div>
                  <div className="type-section-tag">Antes de reportar</div>
                  <h2 className={cn("mt-4", FORM_TITLE_CLASS)}>
                    Un canal seguro para todos
                  </h2>
                  <p className={cn("mt-5", FORM_BODY_CLASS)}>
                    Colaboradores, proveedores, accionistas, clientes y otras partes interesadas de{" "}
                    <strong className="font-medium text-foreground">Grupo UniBank</strong> pueden
                    reportar por este canal.
                  </p>
                </div>

                <ul className="m-0 flex list-none flex-col gap-5 p-0 lg:gap-6">
                  {trustPoints.map(({ icon: Icon, title, description }) => (
                    <li key={title} className="flex items-start gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-subtle)] text-primary">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-sm font-medium text-foreground">{title}</p>
                        <p className={cn("mt-1.5", FORM_BODY_CLASS)}>
                          {description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <SidebarCommitmentBanner />
              </aside>

              {/* Form column */}
              <div className="lg:col-span-8">
                {submitted ? (
                  <SuccessState onReset={handleNewComplaint} />
                ) : (
                  <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-page)] p-5 sm:rounded-3xl sm:p-6 lg:p-8 xl:p-10">
                    <div className="mb-6 text-left">
                      <h2 className={FORM_TITLE_CLASS}>
                        Complete su denuncia
                      </h2>
                      <p className={cn("mt-2", FORM_BODY_CLASS)}>
                        Complete cada sección en orden. Los campos marcados con * son obligatorios.
                      </p>
                    </div>

                    <FormProgress percent={progressPercent} currentStep={currentStep} />

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Step 1 */}
                        <Section
                          title="Contexto de la denuncia"
                          subtitle="Información general"
                          icon={FileText}
                          active={true}
                          done={step1Complete}
                        >
                          <FormFieldGroup label="Información general" hint="Indique su relación con el grupo y dónde ocurrieron los hechos.">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <FormField control={form.control} name="relationship" render={({ field }) => (
                                <FormItem className={FORM_ITEM_CLASS}>
                                  <FormLabel>Relación *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl><SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}><SelectValue placeholder={FORM_PLACEHOLDERS.relationship} className={FIELD_SELECT_VALUE_CLASS} /></SelectTrigger></FormControl>
                                    <SelectContent sideOffset={8} className={FIELD_SELECT_CONTENT_CLASS}>{relationships.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )} />

                              <FormField control={form.control} name="location" render={({ field }) => (
                                <FormItem className={FORM_ITEM_CLASS}>
                                  <FormLabel>Lugar de los hechos *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl><SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}><SelectValue placeholder={FORM_PLACEHOLDERS.location} className={FIELD_SELECT_VALUE_CLASS} /></SelectTrigger></FormControl>
                                    <SelectContent sideOffset={8} className={FIELD_SELECT_CONTENT_CLASS}>{locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </div>

                            <FormField control={form.control} name="company" render={({ field }) => (
                              <FormItem className={FORM_ITEM_CLASS}>
                                <FormLabel>Empresa relacionada *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl><SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}><SelectValue placeholder={FORM_PLACEHOLDERS.company} className={FIELD_SELECT_VALUE_CLASS} /></SelectTrigger></FormControl>
                                  <SelectContent sideOffset={8} className={FIELD_SELECT_CONTENT_CLASS}>{companies.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </FormFieldGroup>
                        </Section>

                        {/* Step 2 */}
                        <Section
                          title="Identidad"
                          subtitle="Preferencias de contacto"
                          icon={User}
                          active={step1Complete}
                          done={step2Complete}
                        >
                          <FormField control={form.control} name="is_anonymous" render={({ field }) => (
                            <FormItem className={FORM_ITEM_CLASS}>
                              <div className={cn("flex items-center justify-between gap-4", FIELD_SLOT_CLASS)}>
                                <div className="min-w-0 flex-1">
                                  <FormLabel>¿Desea permanecer anónimo? *</FormLabel>
                                  <p className={cn("mt-0.5", FORM_BODY_CLASS)}>
                                    {field.value === "si"
                                      ? "No compartiremos su identidad"
                                      : "Indique sus datos de contacto para dar seguimiento a su denuncia"}
                                  </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                  <span className="text-sm font-medium text-muted-foreground">
                                    {field.value === "si" ? "Sí" : "No"}
                                  </span>
                                  <FormControl>
                                    <Switch
                                      checked={field.value === "si"}
                                      onCheckedChange={(checked) => field.onChange(checked ? "si" : "no")}
                                    />
                                  </FormControl>
                                </div>
                              </div>
                            </FormItem>
                          )} />

                          {v.is_anonymous === "no" && (
                            <FormFieldGroup label="Datos de contacto" hint="Obligatorios si no desea permanecer anónimo.">
                              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                  <FormItem className={FORM_ITEM_CLASS}>
                                    <FormLabel>Nombre completo *</FormLabel>
                                    <FormControl><Input placeholder={FORM_PLACEHOLDERS.name} {...field} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )} />
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                  <FormItem className={FORM_ITEM_CLASS}>
                                    <FormLabel>Teléfono *</FormLabel>
                                    <FormControl><Input placeholder={FORM_PLACEHOLDERS.phone} {...field} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )} />
                              </div>
                              <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem className={FORM_ITEM_CLASS}>
                                  <FormLabel>Correo electrónico *</FormLabel>
                                  <FormControl><Input type="email" placeholder={FORM_PLACEHOLDERS.email} {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </FormFieldGroup>
                          )}
                        </Section>

                        {/* Step 3 */}
                        <Section
                          title="Detalle de los hechos"
                          subtitle="Motivo y descripción"
                          icon={MessageSquare}
                          active={step2Complete}
                          done={step3Complete}
                        >
                          <FormField control={form.control} name="reason" render={({ field }) => (
                            <FormItem className={FORM_ITEM_CLASS}>
                              <FormLabel>Motivo de denuncia *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl><SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}><SelectValue placeholder={FORM_PLACEHOLDERS.reason} className={FIELD_SELECT_VALUE_CLASS} /></SelectTrigger></FormControl>
                                <SelectContent sideOffset={8} className={FIELD_SELECT_CONTENT_CLASS}>{reasons.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />

                          {v.reason && <ReasonInfoPanel reason={v.reason} />}

                          <FormField control={form.control} name="knowledge_source" render={({ field }) => (
                            <FormItem className={FORM_ITEM_CLASS}>
                              <FormLabel>¿Cómo conoce los hechos? *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl><SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}><SelectValue placeholder={FORM_PLACEHOLDERS.knowledgeSource} className={FIELD_SELECT_VALUE_CLASS} /></SelectTrigger></FormControl>
                                <SelectContent sideOffset={8} className={FIELD_SELECT_CONTENT_CLASS}>{knowledgeSources.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem className={FORM_ITEM_CLASS}>
                              <FormLabel>Descripción de los hechos *</FormLabel>
                              <div className={FIELD_TEXTAREA_WRAPPER_CLASS}>
                                <FormControl>
                                  <Textarea rows={6} className={FIELD_TEXTAREA_INSET_CLASS} placeholder={FORM_PLACEHOLDERS.description} {...field} />
                                </FormControl>
                              </div>
                              <div className={cn("flex justify-between pt-1", FORM_BODY_CLASS)}>
                                <FormMessage />
                                <span>{field.value?.length || 0} / 5000</span>
                              </div>
                            </FormItem>
                          )} />
                        </Section>

                        {/* Step 4 */}
                        <Section
                          title="¿Cuándo ocurrió? y soportes"
                          subtitle="Fecha, hora y documentos"
                          icon={CalendarIcon}
                          active={step3Complete}
                          done={step4Complete}
                        >
                          <FormFieldGroup label="Fecha y hora del incidente">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <FormField control={form.control} name="incident_date" render={({ field }) => (
                                <FormItem className={cn(FORM_ITEM_CLASS, "flex flex-col")}>
                                  <FormLabel>Fecha del incidente *</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <button
                                          type="button"
                                          className={cn(
                                            FIELD_DATE_TRIGGER_CLASS,
                                            !field.value && FIELD_EMPTY_LABEL_CLASS,
                                          )}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-60" />
                                          {field.value ? format(field.value, "PPP", { locale: es }) : (
                                            <span>{FORM_PLACEHOLDERS.incidentDate}</span>
                                          )}
                                        </button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent sideOffset={8} align="start" className={FIELD_POPOVER_CONTENT_CLASS}>
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                                        initialFocus
                                        locale={es}
                                        className="pointer-events-auto p-3"
                                        classNames={FIELD_CALENDAR_CLASS_NAMES}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )} />

                              <FormField control={form.control} name="incident_time" render={({ field }) => (
                                <FormItem className={cn(FORM_ITEM_CLASS, "flex flex-col")}>
                                  <FormLabel>Hora del incidente *</FormLabel>
                                  <IncidentTimePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </div>
                          </FormFieldGroup>

                          <div className="space-y-2">
                            <FormLabel>Documentos de soporte (opcional)</FormLabel>
                            {file ? (
                              <div className={cn("flex items-center justify-between gap-3", FIELD_SLOT_CLASS)}>
                                <div className="flex min-w-0 items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-accent)] text-primary">
                                    <FileText className="h-5 w-5" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                                    <p className={FORM_BODY_CLASS}>{formatBytes(file.size)}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                                  aria-label="Quitar archivo"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div
                                role="button"
                                tabIndex={0}
                                onClick={() => fileRef.current?.click()}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
                                }}
                                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                onDragLeave={() => setDragActive(false)}
                                onDrop={handleDrop}
                                className={cn(
                                  "cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors sm:p-8",
                                  dragActive
                                    ? "border-primary bg-[var(--surface-accent)]"
                                    : "border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:border-primary/35 hover:bg-[var(--surface-accent)]/60",
                                )}
                              >
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-accent)] text-primary">
                                  <UploadCloud className="h-6 w-6" />
                                </div>
                                <p className="text-sm font-medium text-foreground">
                                  Arrastre su archivo aquí o{" "}
                                  <span className="text-primary">selecciónelo</span>
                                </p>
                                <p className={cn("mt-2", FORM_BODY_CLASS)}>
                                  Formatos: JPG, PNG, PDF, DOC, DOCX, PPT, PPTX, MOV, MP3, MP4, M4A, ZIP · máx. {MAX_FILE_MB} MB
                                </p>
                              </div>
                            )}
                            <input
                              ref={fileRef}
                              type="file"
                              className="hidden"
                              accept={ACCEPT}
                              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                            />
                          </div>
                        </Section>

                        {/* Step 5 */}
                        <Section
                          title="Verificación y envío"
                          subtitle="Confirmación final"
                          icon={ShieldCheck}
                          active={step4Complete}
                          done={step5Complete}
                        >
                          <p className={FORM_BODY_CLASS}>
                            Este sitio está protegido por reCAPTCHA y se aplican la{" "}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Política de Privacidad</a>{" "}
                            y los{" "}
                            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Términos de Servicio</a> de Google.
                          </p>

                          <FormField control={form.control} name="accepted_terms" render={({ field }) => (
                            <FormItem className={cn("flex items-start gap-3 space-y-0", FIELD_SLOT_CLASS)}>
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5 shrink-0" />
                              </FormControl>
                              <div className="min-w-0 flex-1 space-y-1">
                                <p className={FORM_BODY_CLASS}>
                                  Por este medio yo(nosotros) DECLARO(AMOS) que la información proporcionada al banco por mi (nosotros) es veraz, correcta, verdadera y por tanto válida. Certifico que he(mos) leído y entendido a cabalidad todas las condiciones estipuladas en el Acuerdo de Servicio y Políticas de Privacidad del grupo financiero que están disponibles al público en la página web del banco:{" "}
                                  <a
                                    href="https://www.unibank.com.pa/es/politicas-de-privacidad-y-seguridad"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline underline-offset-2"
                                  >
                                    Políticas de Privacidad y Seguridad
                                  </a>
                                  , las cuales abarcan las disposiciones de la Ley 81 de 2019 sobre protección de datos personales y sus reglamentos.
                                </p>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )} />

                          {isRecaptchaBypassed() ? (
                            <InfoBanner>
                              Entorno local: reCAPTCHA no está disponible en localhost. Puede enviar el
                              formulario para pruebas.
                            </InfoBanner>
                          ) : (
                            <div className="space-y-2">
                              <ReCaptcha ref={recaptchaRef} onChange={setRecaptchaToken} />
                              {!recaptchaReady && (
                                <p className={FORM_BODY_CLASS}>
                                  Marque «No soy un robot» para habilitar el envío.
                                </p>
                              )}
                            </div>
                          )}

                          <div className="flex flex-col gap-4 border-t border-[var(--surface-border)] pt-6 md:flex-row md:items-center md:justify-between">
                            <p className={cn(FORM_BODY_CLASS, "md:max-w-[50%]")}>
                              Al enviar, confirma que la información proporcionada es veraz y acepta los términos indicados.
                            </p>
                            <Button
                              type="submit"
                              disabled={sending || !recaptchaReady || !v.accepted_terms}
                              size="lg"
                              className={cn("rounded-xl px-8 md:self-start", CTA_BUTTON_LAYOUT_CLASS)}
                            >
                              {sending ? "Enviando…" : "Enviar denuncia"}
                            </Button>
                          </div>
                        </Section>
                      </form>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </StaticPageSection>
      </StaticPageFrame>
    </>
  );
}
