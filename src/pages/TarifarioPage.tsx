import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "@/lib/icons";
import { PageMasthead, StaticPageSection } from "@/components/organisms/StaticPageLayout";

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
        <PageMasthead
          align="center"
          title="Tarifario"
          subtitle="Consulta nuestras tasas, comisiones y tarifas vigentes."
        />

        <StaticPageSection bandIndex={0}>
          <div className="site-container">
            <div className="page-section-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 md:mb-8 p-4 rounded-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm">Tarifario – Enero 2026 v2.0</p>
                  <p className="text-xs text-muted-foreground">Documento PDF</p>
                </div>
              </div>
              <Button asChild className="w-full sm:w-auto flex-shrink-0">
                <a href={PDF_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" /> Descargar PDF
                </a>
              </Button>
            </div>

            <div className="page-section-card w-full rounded-xl overflow-hidden h-[55vh] md:h-[75vh] lg:h-[80vh]">
              <iframe
                src={PDF_URL}
                title="Tarifario UniBank"
                className="w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          </div>
        </StaticPageSection>
      </article>
    </>
  );
}
