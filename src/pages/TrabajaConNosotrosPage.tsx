import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Briefcase,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  RefreshCw,
  X,
  FileText,
  Mail,
  CheckCircle2,
} from "lucide-react";

/* ─── Constants ────────────────────────────────────────────── */

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXT = ["pdf", "doc", "docx", "png", "jpg", "jpeg"];
const ALLOWED_ACCEPT = ".pdf,.doc,.docx,.png,.jpg,.jpeg";

const perks = [
  {
    icon: Briefcase,
    title: "Crecimiento profesional",
    desc: "Programas de desarrollo, mentoría y capacitación continua para impulsar tu carrera.",
  },
  {
    icon: Users,
    title: "Cultura colaborativa",
    desc: "Un equipo diverso, inclusivo y comprometido con la excelencia y la cercanía al cliente.",
  },
  {
    icon: TrendingUp,
    title: "Beneficios competitivos",
    desc: "Compensación atractiva, beneficios integrales y bienestar para ti y tu familia.",
  },
];

const steps = [
  {
    num: "01",
    title: "Aplica",
    desc: "Completa el formulario y adjunta tu hoja de vida o portafolio.",
  },
  {
    num: "02",
    title: "Conversamos",
    desc: "Nuestro equipo de Recursos Humanos revisará tu perfil y te contactará si encaja con una vacante.",
  },
  {
    num: "03",
    title: "Te integras",
    desc: "Vive la experiencia de pertenecer a una de las instituciones financieras líderes de Panamá.",
  },
];

/* ─── Schema ───────────────────────────────────────────────── */

const buildSchema = (captchaAnswer: number) =>
  z.object({
    name: z.string().trim().min(1, "Nombre requerido").max(100),
    phone: z.string().trim().min(1, "Teléfono requerido").max(30),
    email: z.string().trim().email("Correo inválido").max(255),
    message: z.string().trim().min(1, "Mensaje requerido").max(5000),
    captcha: z
      .string()
      .trim()
      .min(1, "Resuelve el captcha")
      .refine((v) => Number(v) === captchaAnswer, "Respuesta incorrecta"),
  });

type FormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
  captcha: string;
};

const formatBytes = (b: number) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
};

/* ─── Page ─────────────────────────────────────────────────── */

export default function TrabajaConNosotrosPage() {
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Captcha state
  const [captchaSeed, setCaptchaSeed] = useState(0);
  const captcha = useMemo(() => {
    // captchaSeed forces re-roll
    void captchaSeed;
    const a = Math.floor(Math.random() * 8) + 1;
    const b = Math.floor(Math.random() * 8) + 1;
    return { a, b, answer: a + b };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaSeed]);

  const schema = useMemo(() => buildSchema(captcha.answer), [captcha.answer]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "", captcha: "" },
  });

  const refreshCaptcha = () => {
    setCaptchaSeed((s) => s + 1);
    form.setValue("captcha", "");
  };

  const validateAndSetFile = useCallback((f: File | null) => {
    setFileError(null);
    if (!f) {
      setFile(null);
      return;
    }
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXT.includes(ext)) {
      setFileError("Formato no permitido. Usa PDF, DOC, DOCX, PNG o JPG.");
      return;
    }
    if (f.size > MAX_FILE_BYTES) {
      setFileError("El archivo excede los 5 MB permitidos.");
      return;
    }
    setFile(f);
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSetFile(f);
  };

  const onSubmit = async (values: FormValues) => {
    if (!file) {
      setFileError("Adjunta al menos un archivo.");
      return;
    }
    setSending(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("cv-files")
        .upload(path, file, { contentType: file.type || undefined });
      if (uploadErr) throw uploadErr;
      const { data: urlData } = supabase.storage.from("cv-files").getPublicUrl(path);
      const cv_url = urlData.publicUrl;

      const { error } = await supabase.from("job_applications").insert({
        name: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message,
        cv_url,
      });
      if (error) throw error;

      toast({
        title: "¡Aplicación enviada!",
        description: "Hemos recibido tu información. Te contactaremos pronto.",
      });
      form.reset();
      setFile(null);
      setFileError(null);
      refreshCaptcha();
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      toast({
        title: "Error",
        description: "No se pudo enviar tu aplicación. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Trabaja con Nosotros | Carreras en UniBank</title>
        <meta
          name="description"
          content="Únete al equipo UniBank. Envía tu hoja de vida y forma parte de una institución financiera líder en Panamá."
        />
        <link rel="canonical" href="https://unibank.com.pa/trabaja-con-nosotros" />
      </Helmet>

      <article className="min-h-screen bg-background">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0b0b0c] text-white">
          {/* decorative grid + glow */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div
            aria-hidden
            className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.18), transparent 70%)" }}
          />

          <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Carreras en UniBank
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-[68px]">
                Construye el futuro
                <br />
                de la banca <span className="text-primary">con nosotros</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                ¿Deseas formar parte del equipo UniBank? Llena los datos del formulario y serás
                añadido a nuestra base de datos de Recursos Humanos.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#aplicar"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30"
                >
                  Aplicar ahora
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#cultura"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/5"
                >
                  Conoce nuestra cultura
                </a>
              </div>

              {/* Stats */}
              <div className="mt-14 max-w-xl border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-bold tracking-tight">+30 años</div>
                  <div className="mt-1 text-sm text-white/60">creando oportunidades en Panamá</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Perks ──────────────────────────────────────────── */}
        <section id="cultura" className="border-b border-border bg-background py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Por qué UniBank
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Un lugar donde crecer y dejar huella
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Apostamos por las personas. Por eso construimos un entorno donde el talento
                encuentra propósito, retos y reconocimiento.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {perks.map((p) => (
                <div
                  key={p.title}
                  className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ────────────────────────────────────────── */}
        <section className="border-b border-border bg-muted/30 py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Cómo funciona
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Tu camino hacia UniBank, en 3 pasos
                </h2>
              </div>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`relative px-0 md:px-8 ${
                    i !== 0 ? "md:border-l md:border-border" : ""
                  }`}
                >
                  <div className="text-sm font-mono font-semibold text-primary">{s.num}</div>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Application form ──────────────────────────────── */}
        <section id="aplicar" className="bg-background py-24 px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
            {/* Left col */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Aplica ahora
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Cuéntanos sobre ti
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Comparte tu información y un archivo (CV, portafolio o carta) para que nuestro
                  equipo de Recursos Humanos pueda conocerte mejor.
                </p>

                <ul className="mt-8 space-y-4">
                  {[
                    "Confidencialidad total de tus datos",
                    "Te contactamos solo si hay una vacante afín",
                    "Tu perfil queda en nuestra base de talento",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    ¿Dudas sobre el proceso?
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Escríbenos a{" "}
                    <a
                      href="mailto:rrhh@unibank.com.pa"
                      className="font-medium text-primary hover:underline"
                    >
                      rrhh@unibank.com.pa
                    </a>
                  </p>
                </div>
              </div>
            </aside>

            {/* Right col — form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej. María Pérez" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono *</FormLabel>
                            <FormControl>
                              <Input placeholder="+507 6000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="tucorreo@ejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje *</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              className="resize-none"
                              placeholder="Cuéntanos sobre tu experiencia, intereses o el área en la que te gustaría aportar."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* File upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Archivos Adjuntos *
                      </label>

                      {!file ? (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => fileRef.current?.click()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                          }}
                          onDragLeave={() => setDragActive(false)}
                          onDrop={handleDrop}
                          className={`group cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                            dragActive
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50 hover:bg-muted/40"
                          }`}
                        >
                          <div
                            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                            style={{
                              background: "hsl(var(--primary) / 0.1)",
                              color: "hsl(var(--primary))",
                            }}
                          >
                            <UploadCloud className="h-6 w-6" />
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            Arrastra tu archivo aquí o{" "}
                            <span className="text-primary">selecciónalo</span>
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            Adjunta tu Hoja de vida, Portafolio o Carta de presentación.
                            <br />
                            Formatos: PDF, DOC, DOCX, PNG, JPG · Máximo 5 MB.
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/40 p-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className="flex h-10 w-10 flex-none items-center justify-center rounded-lg"
                              style={{
                                background: "hsl(var(--primary) / 0.1)",
                                color: "hsl(var(--primary))",
                              }}
                            >
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium text-foreground">
                                {file.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatBytes(file.size)}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFile(null);
                              setFileError(null);
                              if (fileRef.current) fileRef.current.value = "";
                            }}
                            className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                            aria-label="Quitar archivo"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        accept={ALLOWED_ACCEPT}
                        onChange={(e) => validateAndSetFile(e.target.files?.[0] ?? null)}
                      />
                      {fileError && (
                        <p className="text-sm font-medium text-destructive">{fileError}</p>
                      )}
                    </div>

                    {/* Captcha */}
                    <FormField
                      control={form.control}
                      name="captcha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verificación de seguridad *</FormLabel>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 select-none items-center gap-2 rounded-md border border-border bg-muted px-4 font-mono text-sm font-semibold text-foreground">
                              <span>
                                {captcha.a} + {captcha.b} =
                              </span>
                            </div>
                            <FormControl>
                              <Input
                                inputMode="numeric"
                                placeholder="?"
                                className="w-24"
                                {...field}
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={refreshCaptcha}
                              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              aria-label="Generar nuevo captcha"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted-foreground">
                        Al enviar aceptas que tus datos sean usados únicamente para procesos de
                        selección.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={sending}
                        className="w-full rounded-full px-8 sm:w-auto"
                      >
                        {sending ? "Enviando…" : "Enviar aplicación"}
                        {!sending && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
