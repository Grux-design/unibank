import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ReCaptcha, { type ReCaptchaHandle } from "@/components/atoms/ReCaptcha";
import type { Lang } from "@/components/layout/SiteLayout";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const { lang } = useOutletContext<{ lang: Lang }>();
  const [sending, setSending] = useState(false);

  const isEs = lang === "es";

  const t = {
    title: isEs ? "Contacto – Unibank" : "Contact – Unibank",
    meta: isEs ? "Comunícate con Unibank. Estamos aquí para ayudarte." : "Get in touch with Unibank. We're here to help.",
    h1: isEs ? "Contáctanos" : "Contact Us",
    sub: isEs
      ? "¿Tienes alguna pregunta? Estamos aquí para ayudarte. Completa el formulario y te responderemos a la brevedad."
      : "Have a question? We're here to help. Fill out the form and we'll get back to you shortly.",
    name: isEs ? "Nombre completo" : "Full name",
    email: "Email",
    subject: isEs ? "Asunto" : "Subject",
    message: isEs ? "Mensaje" : "Message",
    send: isEs ? "Enviar mensaje" : "Send message",
    sending: isEs ? "Enviando…" : "Sending…",
    successTitle: isEs ? "¡Mensaje enviado!" : "Message sent!",
    successDesc: isEs
      ? "Te hemos enviado una confirmación a tu correo."
      : "We've sent a confirmation to your email.",
    errorTitle: isEs ? "Error al enviar" : "Failed to send",
    errorDesc: isEs
      ? "Hubo un problema al enviar tu mensaje. Intenta de nuevo."
      : "There was a problem sending your message. Please try again.",
  };

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaHandle>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    if (!recaptchaToken) {
      toast({
        title: isEs ? "Verificación requerida" : "Verification required",
        description: isEs ? "Por favor completa el reCAPTCHA." : "Please complete the reCAPTCHA.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-email", {
        body: { ...values, lang, recaptchaToken },
      });
      if (error) throw error;
      toast({ title: t.successTitle, description: t.successDesc });
      form.reset();
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch {
      toast({ title: t.errorTitle, description: t.errorDesc, variant: "destructive" });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setSending(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.meta} />
        <link rel="canonical" href="https://unibank.com.pa/contact" />
      </Helmet>

      <article className="min-h-screen bg-background">
        <section className="bg-muted/30 border-b border-border pt-20 pb-10 md:pt-28 md:pb-16 lg:pt-32">
          <div className="site-container max-w-2xl">
            <h1 className="type-page-title text-foreground">
              {t.h1}
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">{t.sub}</p>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="site-container max-w-2xl">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.name}</FormLabel>
                          <FormControl><Input placeholder={isEs ? "Juan Pérez" : "John Doe"} {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.email}</FormLabel>
                          <FormControl><Input type="email" placeholder="juan@ejemplo.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.subject}</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.message}</FormLabel>
                        <FormControl>
                          <Textarea rows={6} className="resize-none min-h-[140px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ReCaptcha ref={recaptchaRef} onChange={setRecaptchaToken} />

                  <Button
                    type="submit"
                    disabled={sending || !recaptchaToken}
                    size="lg"
                    className="w-full rounded-xl sm:w-auto"
                  >
                    {sending ? t.sending : t.send}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
