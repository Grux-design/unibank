import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { getRecaptchaToken } from "@/lib/recaptcha";
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

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSending(true);
    try {
      const recaptchaToken = await getRecaptchaToken("contact");
      const { error } = await supabase.functions.invoke("send-email", {
        body: { ...values, lang, recaptchaToken },
      });
      if (error) throw error;
      toast({ title: t.successTitle, description: t.successDesc });
      form.reset();
    } catch {
      toast({ title: t.errorTitle, description: t.errorDesc, variant: "destructive" });
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

      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-3">{t.h1}</h1>
          <p className="text-muted-foreground mb-10">{t.sub}</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                      <Textarea rows={6} className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={sending} className="w-full sm:w-auto">
                {sending ? t.sending : t.send}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
