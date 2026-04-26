import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ShieldCheck, FileText, User, MessageSquare, CalendarIcon, Clock, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const MAX_FILE_MB = 20;
const ACCEPT = ".jpg,.jpeg,.png,.pdf,.doc,.docx,.ppt,.pptx,.mov,.mp3,.zip,.m4a,.mp4";

const relationships = ["Empleado", "Accionista", "Proveedor", "Cliente", "Miembro de la Junta Directiva", "Estudiante", "Otro"];
const locations = ["Casa Matriz", "Costa del Este", "Oficinas", "Otra"];
const companies = ["UniBank", "UniTrust", "UniLeasing", "Invertis Securities"];
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

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = [2024, 2025, 2026, 2027, 2028];
const hours12 = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

const schema = z.object({
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
  month: z.string().min(1, "Mes"),
  day: z.string().min(1, "Día"),
  year: z.string().min(1, "Año"),
  hour: z.string().min(1, "Hora"),
  minute: z.string().min(1, "Min"),
  period: z.enum(["AM", "PM"]),
  captcha_answer: z.string().min(1, "Responda la operación"),
  accepted_terms: z.boolean().refine((v) => v, "Debe aceptar los términos"),
});

type FormValues = z.infer<typeof schema>;

// ───────────────────────── Section wrapper ─────────────────────────
function Section({
  step,
  title,
  icon: Icon,
  active,
  done,
  children,
}: {
  step: number;
  title: string;
  icon: React.ElementType;
  active: boolean;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border transition-all duration-300",
        active ? "border-primary/30 bg-card shadow-sm" : "border-border/60 bg-muted/20",
        !active && !done && "opacity-60"
      )}
    >
      <header className="flex items-center gap-3 px-6 py-4 border-b border-border/60">
        <div
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
            done ? "bg-primary text-primary-foreground" : active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}
        >
          {done ? <CheckCircle2 className="w-5 h-5" /> : step}
        </div>
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
        </div>
      </header>
      {(active || done) && <div className="p-6 space-y-5">{children}</div>}
    </section>
  );
}

// ───────────────────────── Page ─────────────────────────
export default function CanalDenunciasPage() {
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Math captcha
  const [captcha, setCaptcha] = useState(() => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    return { a, b };
  });
  const refreshCaptcha = () =>
    setCaptcha({ a: Math.floor(Math.random() * 9) + 1, b: Math.floor(Math.random() * 9) + 1 });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
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
      month: "",
      day: "",
      year: "",
      hour: "",
      minute: "",
      period: "AM",
      captcha_answer: "",
      accepted_terms: false,
    },
  });

  const v = form.watch();

  // Step completion logic for progressive disclosure
  const step1Done = !!(v.relationship && v.location && v.company);
  const step2Done = !!v.is_anonymous;
  const step3Done = !!(v.reason && v.knowledge_source && v.description && v.description.length >= 10);
  const step4Done = !!(v.month && v.day && v.year && v.hour && v.minute && v.period);

  const handleFile = (f: File | null) => {
    if (!f) return setFile(null);
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      toast({ title: "Archivo muy grande", description: `Máximo ${MAX_FILE_MB} MB.`, variant: "destructive" });
      return;
    }
    setFile(f);
  };

  const onSubmit = async (values: FormValues) => {
    // Captcha check
    if (parseInt(values.captcha_answer, 10) !== captcha.a + captcha.b) {
      toast({ title: "Verificación incorrecta", description: "Resuelva la operación matemática.", variant: "destructive" });
      refreshCaptcha();
      form.setValue("captcha_answer", "");
      return;
    }

    setSending(true);
    try {
      let file_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("complaint-files").upload(path, file);
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from("complaint-files").getPublicUrl(path);
        file_url = urlData.publicUrl;
      }

      const monthIdx = (months.indexOf(values.month) + 1).toString().padStart(2, "0");
      const dayStr = values.day.padStart(2, "0");
      const incident_date = `${values.year}-${monthIdx}-${dayStr}`;

      let h = parseInt(values.hour, 10);
      if (values.period === "PM" && h !== 12) h += 12;
      if (values.period === "AM" && h === 12) h = 0;
      const incident_time = `${h.toString().padStart(2, "0")}:${values.minute}`;

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

      toast({ title: "Denuncia enviada", description: "Su denuncia ha sido recibida. Gracias por contribuir a la ética y transparencia." });
      form.reset();
      setFile(null);
      refreshCaptcha();
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      toast({ title: "Error", description: "No se pudo enviar la denuncia. Intente de nuevo.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Canal de Denuncias – UniBank</title>
        <meta name="description" content="Canal de denuncias de Grupo UniBank. Reporte situaciones que afecten la ética, moral y legalidad de forma confidencial." />
        <link rel="canonical" href="https://unibank.com.pa/canal-de-denuncias" />
      </Helmet>

      <article className="min-h-screen">
        {/* Hero */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Canal confidencial
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Canal de Denuncias</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Bienvenido al canal de denuncias de <strong>Grupo UniBank</strong>. La información será evaluada de manera confidencial, objetiva e imparcial.
            </p>
          </div>
        </div>

        {/* Form */}
        <section className="bg-background py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* ── Step 1: Contexto ── */}
                <Section step={1} title="Contexto de la denuncia" icon={FileText} active={true} done={step1Done}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField control={form.control} name="relationship" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relación *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="– Seleccionar –" /></SelectTrigger></FormControl>
                          <SelectContent>{relationships.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lugar de los hechos *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="– Seleccionar –" /></SelectTrigger></FormControl>
                          <SelectContent>{locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa relacionada *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="– Seleccionar –" /></SelectTrigger></FormControl>
                        <SelectContent>{companies.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </Section>

                {/* ── Step 2: Identidad ── */}
                <Section step={2} title="Identidad" icon={User} active={step1Done} done={step1Done && step2Done && (v.is_anonymous === "si" || !!(v.name || v.email || v.phone))}>
                  <FormField control={form.control} name="is_anonymous" render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Desea permanecer anónimo? *</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-3">
                          {[
                            { v: "si", label: "Sí, anónimo" },
                            { v: "no", label: "No, quiero identificarme" },
                          ].map((opt) => (
                            <label
                              key={opt.v}
                              htmlFor={`anon-${opt.v}`}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors",
                                field.value === opt.v ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                              )}
                            >
                              <RadioGroupItem value={opt.v} id={`anon-${opt.v}`} />
                              <span className="text-sm font-medium">{opt.label}</span>
                            </label>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )} />

                  {v.is_anonymous === "no" && (
                    <div className="space-y-5 pt-2 border-t border-border/60">
                      <p className="text-xs text-muted-foreground">Todos los datos de contacto son opcionales.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl><Input placeholder="Opcional" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl><Input placeholder="Opcional" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl><Input type="email" placeholder="Opcional" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  )}
                </Section>

                {/* ── Step 3: Detalle ── */}
                <Section step={3} title="Detalle de los hechos" icon={MessageSquare} active={step1Done && step2Done} done={step3Done}>
                  <FormField control={form.control} name="reason" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivo de denuncia *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="– Seleccionar –" /></SelectTrigger></FormControl>
                        <SelectContent>{reasons.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="knowledge_source" render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Cómo conoce los hechos? *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="– Seleccionar –" /></SelectTrigger></FormControl>
                        <SelectContent>{knowledgeSources.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción de los hechos *</FormLabel>
                      <FormControl>
                        <Textarea rows={6} className="resize-none" placeholder="Describa lo ocurrido con el mayor detalle posible…" {...field} />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <FormMessage />
                        <span>{field.value?.length || 0} / 5000</span>
                      </div>
                    </FormItem>
                  )} />
                </Section>

                {/* ── Step 4: Cuándo y soportes ── */}
                <Section step={4} title="¿Cuándo ocurrió? y soportes" icon={Calculator} active={step3Done} done={step4Done}>
                  <div className="space-y-2">
                    <FormLabel>Fecha del incidente *</FormLabel>
                    <div className="grid grid-cols-3 gap-3">
                      <FormField control={form.control} name="month" render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger><SelectValue placeholder="Mes" /></SelectTrigger>
                          <SelectContent>{months.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                        </Select>
                      )} />
                      <FormField control={form.control} name="day" render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger><SelectValue placeholder="Día" /></SelectTrigger>
                          <SelectContent>{days.map((d) => <SelectItem key={d} value={d.toString()}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                      )} />
                      <FormField control={form.control} name="year" render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger><SelectValue placeholder="Año" /></SelectTrigger>
                          <SelectContent>{years.map((y) => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                        </Select>
                      )} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Hora del incidente *</FormLabel>
                    <div className="grid grid-cols-3 gap-3">
                      <FormField control={form.control} name="hour" render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger><SelectValue placeholder="Hora" /></SelectTrigger>
                          <SelectContent>{hours12.map((h) => <SelectItem key={h} value={h.toString()}>{h}</SelectItem>)}</SelectContent>
                        </Select>
                      )} />
                      <FormField control={form.control} name="minute" render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger><SelectValue placeholder="Min" /></SelectTrigger>
                          <SelectContent className="max-h-60">{minutes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                        </Select>
                      )} />
                      <FormField control={form.control} name="period" render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent><SelectItem value="AM">AM</SelectItem><SelectItem value="PM">PM</SelectItem></SelectContent>
                        </Select>
                      )} />
                    </div>
                  </div>

                  {/* File upload */}
                  <div className="space-y-2 pt-2">
                    <FormLabel>Documentos de soporte (opcional)</FormLabel>
                    {file ? (
                      <div className="flex items-center justify-between gap-3 p-4 border border-border rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="w-5 h-5 text-primary shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                          className="p-1 rounded-md hover:bg-muted text-muted-foreground"
                          aria-label="Quitar archivo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 hover:bg-muted/20 transition-colors"
                        onClick={() => fileRef.current?.click()}
                      >
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-foreground font-medium">Haz clic o arrastra un archivo</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          jpg, png, pdf, doc, docx, ppt, pptx, mov, mp3, mp4, m4a, zip · máx {MAX_FILE_MB} MB
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

                {/* ── Step 5: Verificación y envío ── */}
                <Section step={5} title="Verificación y envío" icon={ShieldCheck} active={step4Done} done={false}>
                  {/* Math captcha */}
                  <FormField control={form.control} name="captcha_answer" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verificación de seguridad *</FormLabel>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border font-mono text-base">
                          <span>{captcha.a}</span><span>+</span><span>{captcha.b}</span><span>=</span>
                        </div>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="numeric"
                            placeholder="?"
                            className="w-24 text-center font-mono"
                            {...field}
                          />
                        </FormControl>
                        <Button type="button" variant="ghost" size="sm" onClick={() => { refreshCaptcha(); form.setValue("captcha_answer", ""); }}>
                          Otra
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="accepted_terms" render={({ field }) => (
                    <FormItem className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/60 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5 shrink-0" />
                      </FormControl>
                      <div className="space-y-1 flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground leading-relaxed">
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

                  <Button type="submit" disabled={sending} size="lg" className="w-full">
                    {sending ? "Enviando…" : "Enviar denuncia"}
                  </Button>
                </Section>

              </form>
            </Form>
          </div>
        </section>
      </article>
    </>
  );
}
