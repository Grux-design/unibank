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
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Briefcase, Users, TrendingUp } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Nombre requerido").max(100),
  phone: z.string().trim().min(1, "Teléfono requerido").max(30),
  email: z.string().trim().email("Correo inválido").max(255),
  message: z.string().trim().min(1, "Mensaje requerido").max(5000),
});

type FormValues = z.infer<typeof schema>;

const perks = [
  { icon: Briefcase, title: "Crecimiento profesional", desc: "Programas de desarrollo y capacitación continua." },
  { icon: Users, title: "Cultura colaborativa", desc: "Un equipo diverso, inclusivo y comprometido." },
  { icon: TrendingUp, title: "Beneficios competitivos", desc: "Compensación atractiva y beneficios integrales." },
];

export default function TrabajaConNosotrosPage() {
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSending(true);
    try {
      let cv_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("cv-files").upload(path, file);
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from("cv-files").getPublicUrl(path);
        cv_url = urlData.publicUrl;
      }

      const { error } = await supabase.from("job_applications").insert({
        name: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message,
        cv_url,
      });
      if (error) throw error;

      toast({ title: "¡Aplicación enviada!", description: "Hemos recibido tu información. Te contactaremos pronto." });
      form.reset();
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      toast({ title: "Error", description: "No se pudo enviar tu aplicación. Intenta de nuevo.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Trabaja con Nosotros – UniBank</title>
        <meta name="description" content="Únete al equipo UniBank. Envía tu hoja de vida y forma parte de una institución financiera líder en Panamá." />
        <link rel="canonical" href="https://unibank.com.pa/trabaja-con-nosotros" />
      </Helmet>

      <article className="min-h-screen">
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Trabaja con Nosotros
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Deseas formar parte del equipo UniBank? Llena el formulario y serás añadido a nuestra base de datos de Recursos Humanos.
            </p>
          </div>
        </div>

        {/* Perks */}
        <section className="bg-background py-12 px-4 sm:px-6 border-b border-border">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {perks.map((p) => (
              <div key={p.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="bg-background py-16 px-4 sm:px-6">
          <Card className="max-w-2xl mx-auto border-border/60">
            <CardContent className="p-6 sm:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono *</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje / Carta de presentación *</FormLabel>
                      <FormControl><Textarea rows={6} className="resize-none" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* CV upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hoja de vida (CV)</label>
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 transition-colors"
                      onClick={() => fileRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {file ? file.name : "Haz clic para adjuntar tu CV"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Máximo 2 MB · pdf, doc, docx</p>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  <Button type="submit" disabled={sending} className="w-full sm:w-auto">
                    {sending ? "Enviando…" : "Enviar aplicación"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </article>
    </>
  );
}
