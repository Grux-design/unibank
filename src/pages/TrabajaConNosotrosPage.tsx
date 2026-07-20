import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ReCaptcha, { type ReCaptchaHandle } from "@/components/atoms/ReCaptcha";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Briefcase,
  Users,
  TrendingUp,
  X,
  FileText,
  Mail,
  CheckCircle2,
  type Icon,
} from "@/lib/icons";
import { StaticPageFrame, StaticPageSection } from "@/components/organisms/StaticPageLayout";
import { Reveal } from "@/components/effects/Reveal";
import {
  FIELD_SLOT_CLASS,
  FIELD_TEXTAREA_INSET_CLASS,
  FIELD_TEXTAREA_WRAPPER_CLASS,
  FORM_BODY_CLASS,
  FORM_FIELDS_STACK_CLASS,
  FORM_ITEM_CLASS,
} from "@/constants/formFields";
import { cn } from "@/lib/utils";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXT = ["pdf", "doc", "docx", "png", "jpg", "jpeg"];
const ALLOWED_ACCEPT = ".pdf,.doc,.docx,.png,.jpg,.jpeg";

const perks: { icon: Icon; title: string; desc: string }[] = [
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
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Nombre requerido").max(100),
  phone: z.string().trim().min(1, "Teléfono requerido").max(30),
  email: z.string().trim().email("Correo inválido").max(255),
  message: z.string().trim().min(1, "Mensaje requerido").max(5000),
});

type FormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const formatBytes = (b: number) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
};

function SectionIntro({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="type-section-tag">{tag}</div>
      <h2 className="mt-3 type-content-section-headline text-balance text-foreground">{title}</h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ProcessScrollSection() {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToStep = useCallback((index: number) => {
    stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  useEffect(() => {
    const updateActiveStep = () => {
      const viewportCenter = window.innerHeight * 0.45;
      let closestIndex = 0;
      let closestDistance = Infinity;

      stepRefs.current.forEach((element, index) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const distance = Math.abs(stepCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, []);

  const progress = ((activeIndex + 1) / steps.length) * 100;

  return (
    <div className="site-container flex flex-col gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16">
      <aside className="md:w-2/5 lg:w-[38%] md:sticky md:top-20 md:self-start lg:top-28">
        <SectionIntro
          tag="Cómo funciona"
          title="Tu camino hacia UniBank, en 3 pasos"
          description="Un proceso simple: aplicas, conversamos y, si hay fit, te integras al equipo."
        />
      </aside>

      <div
        className="relative min-w-0 flex-1"
        role="group"
        aria-label="Pasos del proceso"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-[9px] w-0.5 rounded-full bg-[var(--surface-border)] md:left-[11px]"
          aria-hidden
        >
          <div
            className="w-full rounded-full bg-primary transition-[height] duration-500 ease-out"
            style={{ height: `${progress}%` }}
          />
        </div>

        <ol className="m-0 flex list-none flex-col p-0">
          {steps.map((step, index) => {
            const isActive = activeIndex === index;
            const isComplete = index < activeIndex;

            return (
              <li
                key={step.num}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                className="grid grid-cols-[1.25rem_1fr] gap-x-4 md:grid-cols-[1.5rem_1fr] md:gap-x-5"
              >
                <div className="relative flex justify-center pt-1.5 md:pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToStep(index)}
                    aria-label={`Paso ${step.num}: ${step.title}`}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "relative z-10 size-3 shrink-0 rounded-full border-2 transition-colors md:size-3.5",
                      isComplete || isActive
                        ? "border-primary bg-primary"
                        : "border-[var(--surface-border)] bg-background",
                      isActive && "ring-4 ring-primary/15",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "border-b border-[var(--surface-border)] py-8 transition-opacity duration-500 last:border-b-0 md:py-10",
                    isActive ? "opacity-100" : "opacity-45",
                  )}
                >
                  <Reveal y={16} duration={0.5} staggerIndex={index}>
                    <button
                      type="button"
                      onClick={() => scrollToStep(index)}
                      className="w-full text-left"
                    >
                      <p
                        className={cn(
                          "font-mono text-sm font-semibold tabular-nums transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {step.num}
                      </p>
                      <h3 className="mt-2 type-item-title text-foreground">{step.title}</h3>
                      <p className="mt-3 max-w-prose text-sm leading-relaxed text-pretty text-muted-foreground md:text-[15px]">
                        {step.desc}
                      </p>
                    </button>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function PerkCard({ icon: Icon, title, desc }: { icon: Icon; title: string; desc: string }) {
  return (
    <div className="page-section-card h-full rounded-[24px] p-6 md:p-8">
      <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </span>
      <h3 className="type-item-title text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground md:text-[15px]">
        {desc}
      </p>
    </div>
  );
}

export default function TrabajaConNosotrosPage() {
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaHandle>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

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
    if (!recaptchaToken) {
      toast({
        title: "Verificación requerida",
        description: "Por favor completa el reCAPTCHA.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
        "verify-recaptcha",
        { body: { token: recaptchaToken } },
      );
      if (verifyError || !verifyData?.success) {
        toast({
          title: "Verificación fallida",
          description: "No se pudo validar reCAPTCHA. Intenta de nuevo.",
          variant: "destructive",
        });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        setSending(false);
        return;
      }

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

      try {
        const { error: emailErr } = await supabase.functions.invoke("send-job-application", {
          body: {
            name: values.name,
            phone: values.phone,
            email: values.email,
            message: values.message,
            cvUrl: cv_url,
            cvFileName: file.name,
            recaptchaToken,
          },
        });
        if (emailErr) console.error("send-job-application failed:", emailErr);
      } catch (e) {
        console.error("send-job-application threw:", e);
      }

      toast({
        title: "¡Aplicación enviada!",
        description: "Hemos recibido tu información. Te contactaremos pronto.",
      });
      form.reset();
      setFile(null);
      setFileError(null);
      if (fileRef.current) fileRef.current.value = "";
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch {
      toast({
        title: "Error",
        description: "No se pudo enviar tu aplicación. Intenta de nuevo.",
        variant: "destructive",
      });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
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

      <StaticPageFrame page="trabaja-con-nosotros">
        <StaticPageSection bandIndex={0} id="cultura" surface="white">
          <div className="site-container flex flex-col gap-10 md:gap-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionIntro
                tag="Por qué UniBank"
                title="Un lugar donde crecer y dejar huella"
                description="Apostamos por las personas. Por eso construimos un entorno donde el talento encuentra propósito, retos y reconocimiento."
              />
              <div className="shrink-0 border-t border-[var(--surface-border)] pt-5 md:border-t-0 md:border-l md:pl-8 md:pt-0">
                <div className="type-stat-display text-foreground">+30 años</div>
                <p className="mt-1 text-sm text-muted-foreground">creando oportunidades en Panamá</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {perks.map((perk) => (
                <li key={perk.title}>
                  <PerkCard {...perk} />
                </li>
              ))}
            </ul>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={1} surface="white">
          <ProcessScrollSection />
        </StaticPageSection>

        <StaticPageSection bandIndex={2} id="aplicar" surface="white">
          <div className="site-container grid gap-10 lg:grid-cols-12 lg:gap-12">
            <aside className="order-last lg:order-none lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionIntro
                  tag="Aplica ahora"
                  title="Cuéntanos sobre ti"
                  description="Comparte tu información y un archivo (CV, portafolio o carta) para que nuestro equipo de Recursos Humanos pueda conocerte mejor."
                />

                <ul className="mt-8 space-y-4">
                  {[
                    "Confidencialidad total de tus datos",
                    "Te contactamos solo si hay una vacante afín",
                    "Tu perfil queda en nuestra base de talento",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="mt-0.5 shrink-0 text-primary">
                        <CheckCircle2 className="size-5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="page-section-card mt-10 rounded-[24px] p-5 md:p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="text-primary">
                      <Mail className="size-4" />
                    </span>
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

            <div className="order-first lg:order-none lg:col-span-7">
              <div className="page-section-card rounded-[24px] p-5 sm:p-6 lg:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className={FORM_FIELDS_STACK_CLASS}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className={FORM_ITEM_CLASS}>
                          <FormLabel>Nombre completo *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ej. María Pérez"
                              {...field}
                            />
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
                          <FormItem className={FORM_ITEM_CLASS}>
                            <FormLabel>Teléfono *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+507 6000-0000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className={FORM_ITEM_CLASS}>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="tucorreo@ejemplo.com"
                                {...field}
                              />
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
                        <FormItem className={FORM_ITEM_CLASS}>
                          <FormLabel>Mensaje *</FormLabel>
                          <div className={FIELD_TEXTAREA_WRAPPER_CLASS}>
                            <FormControl>
                              <Textarea
                                rows={6}
                                className={FIELD_TEXTAREA_INSET_CLASS}
                                placeholder="Cuéntanos sobre tu experiencia, intereses o el área en la que te gustaría aportar."
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className={FORM_ITEM_CLASS}>
                      <FormLabel>Archivos adjuntos *</FormLabel>

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
                          className={cn(
                            "cursor-pointer rounded-[12px] border-2 border-dashed p-6 text-center transition-colors sm:p-8",
                            dragActive
                              ? "border-primary bg-[var(--surface-accent)]"
                              : "border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:border-primary/35 hover:bg-[var(--surface-accent)]/60",
                          )}
                        >
                          <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-[var(--surface-accent)] text-primary">
                            <UploadCloud className="size-6" />
                          </span>
                          <p className="text-sm font-medium text-foreground">
                            Arrastra tu archivo aquí o{" "}
                            <span className="text-primary">selecciónalo</span>
                          </p>
                          <p className={cn("mt-2", FORM_BODY_CLASS)}>
                            Adjunta tu hoja de vida, portafolio o carta de presentación.
                            <br />
                            Formatos: PDF, DOC, DOCX, PNG, JPG · Máximo 5 MB.
                          </p>
                        </div>
                      ) : (
                        <div className={cn("flex items-center justify-between gap-3", FIELD_SLOT_CLASS)}>
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-accent)] text-primary">
                              <FileText className="size-5" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                              <p className={FORM_BODY_CLASS}>{formatBytes(file.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFile(null);
                              setFileError(null);
                              if (fileRef.current) fileRef.current.value = "";
                            }}
                            className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                            aria-label="Quitar archivo"
                          >
                            <X className="size-4" />
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
                      {fileError ? (
                        <p className="text-sm font-medium text-destructive">{fileError}</p>
                      ) : null}
                    </div>

                    <p className={FORM_BODY_CLASS}>
                      Este sitio está protegido por reCAPTCHA y se aplican la{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Política de Privacidad
                      </a>{" "}
                      y los{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Términos de Servicio
                      </a>{" "}
                      de Google.
                    </p>

                    <ReCaptcha ref={recaptchaRef} onChange={setRecaptchaToken} />

                    <div className="flex flex-col gap-4 border-t border-[var(--surface-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted-foreground sm:max-w-[55%]">
                        Al enviar aceptas que tus datos sean usados únicamente para procesos de
                        selección.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={sending || !recaptchaToken}
                        className="w-full md:w-auto md:self-start"
                      >
                        {sending ? "Enviando…" : "Enviar aplicación"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </StaticPageSection>
      </StaticPageFrame>
    </>
  );
}
