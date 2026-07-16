import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "@/lib/icons";

const PDF_URL = "https://unibank.com.pa/sites/default/files/attachment/tarifario_-enero.2026v2.0.pdf";

export default function TarifarioPage() {
  return (
    <>
      <Helmet>
        <title>Tarifario – UniBank</title>
        <meta name="description" content="Consulta el tarifario oficial de UniBank con las tasas y comisiones vigentes." />
        <link rel="canonical" href="https://unibank.com.pa/tarifario" />
      </Helmet>

      <article className="min-h-screen">
        <div className="bg-muted/30 border-b border-border">
          <div className="site-container py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Tarifario
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Consulta nuestras tasas, comisiones y tarifas vigentes.
            </p>
          </div>
        </div>

        <section className="bg-background py-16">
          <div className="site-container">
            {/* Download bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-xl border border-border/60 bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Tarifario – Enero 2026 v2.0</p>
                  <p className="text-xs text-muted-foreground">Documento PDF</p>
                </div>
              </div>
              <Button asChild>
                <a href={PDF_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" /> Descargar PDF
                </a>
              </Button>
            </div>

            {/* PDF viewer */}
            <div className="w-full rounded-xl overflow-hidden border border-border/60" style={{ height: "80vh" }}>
              <iframe
                src={PDF_URL}
                title="Tarifario UniBank"
                className="w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
