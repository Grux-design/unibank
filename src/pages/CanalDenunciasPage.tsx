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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

const schema = z.object({
  relationship: z.string().min(1, "Seleccione una opción"),
  location: z.string().min(1, "Seleccione una opción"),
  company: z.string().min(1, "Seleccione una opción"),
  is_anonymous: z.enum(["si", "no"]),
  name: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email("Correo inválido").max(255).optional().or(z.literal("")),
  reason: z.string().min(1, "Seleccione un motivo"),
  description: z.string().trim().min(1, "Descripción requerida").max(5000),
  incident_date: z.string().min(1, "Fecha requerida"),
  incident_time: z.string().optional(),
  accepted_terms: z.boolean().refine((v) => v, "Debe aceptar los términos"),
});

type FormValues = z.infer<typeof schema>;

const relationships = ["Colaborador", "Proveedor", "Accionista", "Miembro de Junta Directiva", "Cliente", "Practicante/Estudiante", "Otro"];
const locations = ["Panamá", "Costa Rica", "Colombia", "Otro"];
const companies = ["UniBank", "UniConnect", "UniTrust", "Univivir", "UniLeasing", "Grupo Invertis"];
const reasons = ["Fraude", "Corrupción", "Lavado de dinero", "Acoso laboral", "Discriminación", "Conflicto de interés", "Robo", "Otro"];

export default function CanalDenunciasPage() {
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      relationship: "",
      location: "",
      company: "",
      is_anonymous: "no",
      name: "",
      phone: "",
      email: "",
      reason: "",
      description: "",
      incident_date: "",
      incident_time: "",
      accepted_terms: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
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
        incident_date: values.incident_date,
        incident_time: values.incident_time || null,
        file_url,
        accepted_terms: values.accepted_terms,
      });
      if (error) throw error;

      toast({ title: "Denuncia enviada", description: "Su denuncia ha sido recibida. Gracias por contribuir a la ética y transparencia." });
      form.reset();
      setFile(null);
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
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Canal de Denuncias
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Bienvenido al canal de denuncias de <strong>Grupo UniBank</strong>. La información será evaluada de manera confidencial, objetiva e imparcial.
            </p>
          </div>
        </div>

        <section className="bg-background py-16 px-4 sm:px-6">
          <Card className="max-w-3xl mx-auto border-border/60">
            <CardContent className="p-6 sm:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  {/* Relación */}
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

                  {/* Lugar */}
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lugar donde ocurrieron los hechos *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="– Seleccionar –" /></SelectTrigger></FormControl>
                        <SelectContent>{locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Empresa */}
                  <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa relacionada a la denuncia *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="– Seleccionar –" /></SelectTrigger></FormControl>
                        <SelectContent>{companies.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Anonimato */}
                  <FormField control={form.control} name="is_anonymous" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anonimato *</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="si" id="anon-si" />
                            <label htmlFor="anon-si" className="text-sm">Sí</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="no" id="anon-no" />
                            <label htmlFor="anon-no" className="text-sm">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )} />

                  {/* Datos personales */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo</FormLabel>
                        <FormControl><Input placeholder="(opcional)" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl><Input placeholder="(opcional)" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl><Input type="email" placeholder="(opcional)" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Motivo */}
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

                  {/* Descripción */}
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción de los hechos *</FormLabel>
                      <FormControl><Textarea rows={6} className="resize-none" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Fecha y hora */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField control={form.control} name="incident_date" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha del incidente *</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="incident_time" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora (aprox.)</FormLabel>
                        <FormControl><Input type="time" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Archivo */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Incluir documentos de soporte</label>
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 transition-colors"
                      onClick={() => fileRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {file ? file.name : "Haz clic o arrastra un archivo aquí"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Máximo 20 MB · jpg, png, pdf, doc, docx</p>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  {/* Aceptación */}
                  <FormField control={form.control} name="accepted_terms" render={({ field }) => (
                    <FormItem className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                      </FormControl>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Por este medio yo(nosotros) DECLARO(AMOS) que la información proporcionada al banco por mi (nosotros) es veraz, correcta, verdadera y por tanto válida. Certifico que he(mos) leído y entendido a cabalidad todas las condiciones estipuladas en el Acuerdo de Servicio y Políticas de Privacidad del grupo financiero.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button type="submit" disabled={sending} className="w-full sm:w-auto">
                    {sending ? "Enviando…" : "Enviar denuncia"}
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
