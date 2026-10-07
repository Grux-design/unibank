import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Youtube, FileText, Download } from "@/lib/icons";
import { Reveal } from "@/components/effects/Reveal";

interface TutorialConfig {
  videoId: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  thumbnailUrl?: string;
}

const TUTORIALS: Record<string, TutorialConfig> = {
  "cuenta-de-ahorros": {
    videoId: "F4C6YiN1OcU",
    title: "Aprende cómo usar tu Cuenta de Ahorros Digital",
    tagline: "TUTORIAL PASO A PASO",
    description: "Te mostramos cómo abrir y gestionar tu cuenta digital en pocos minutos de forma totalmente segura y 100% online.",
    duration: "2:45 min",
    thumbnailUrl: "/ahorros-tutorial-thumbnail.png",
  },
  "prestamo-de-auto-digital": {
    videoId: "WzTza8XB2oI",
    title: "Conoce el proceso del Préstamo de Auto Digital",
    tagline: "GUÍA RÁPIDA",
    description: "Sigue esta guía visual paso a paso para simular, solicitar y obtener la aprobación de tu préstamo de auto en línea.",
    duration: "3:10 min",
    thumbnailUrl: "/auto-tutorial-thumbnail.png",
  },
};

interface PdfGuide {
  title: string;
  url: string;
}

const PDF_GUIDES: Record<string, PdfGuide[]> = {
  "cuenta-de-ahorros": [
    {
      title: "Guía para afiliación UniToken",
      url: "https://uniconnect.unibank.com.pa/wp-content/uploads/2023/11/Guia-Afiliacion-UniToken.-Nov23.pdf",
    },
    {
      title: "Guía para afiliación Banca en Línea",
      url: "https://uniconnect.unibank.com.pa/wp-content/uploads/2026/01/Guia-Afiliacion-Banca-en-Linea.-V.Jun_.2024-15.pdf",
    },
  ],
};

export function ProductTutorialBanner({ slug }: { slug?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!slug) return null;

  const config = TUTORIALS[slug];
  if (!config) return null;

  const guides = PDF_GUIDES[slug] || [];
  const hasGuides = guides.length > 0;

  return (
    <section className="w-full py-10 md:py-16 bg-background">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Left/Main Block: Video Tutorial */}
          <Reveal y={20} duration={0.6} className={hasGuides ? "lg:col-span-2" : "lg:col-span-3"}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button
                  className="group relative w-full h-full text-left overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#1F1E1E] text-white p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 border border-white/10 hover:border-primary/30 transition-all duration-300 shadow-lg cursor-pointer"
                  style={{
                    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {/* Background glow animation */}
                  <div className="absolute -inset-px bg-gradient-to-r from-primary/10 via-transparent to-primary/5 rounded-[24px] md:rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Left: Text Content */}
                  <div className="flex-1 space-y-3 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold tracking-wider text-primary uppercase">
                      {config.tagline}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                      {config.title}
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                      {config.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                        Duración: {config.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                        Video HD
                      </span>
                    </div>
                  </div>

                  {/* Right: Visual Play Button / Preview */}
                  <div className="relative shrink-0 w-full md:w-[220px] lg:w-[260px] aspect-[16/9] md:aspect-[4/3] rounded-[18px] overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300 z-10 shadow-inner">
                    {config.thumbnailUrl ? (
                      <img
                        src={config.thumbnailUrl}
                        alt="Video Thumbnail"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 opacity-90" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,54,0.12)_0%,transparent_70%)]" />
                      </>
                    )}

                    {/* Red play circle badge */}
                    <div className="relative w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:bg-primary-hover group-hover:scale-110 transition-all duration-300 z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-7 h-7 ml-1"
                      >
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                      </svg>
                    </div>

                    <span className="absolute bottom-3 right-3 text-[10px] tracking-widest text-zinc-300 font-semibold uppercase flex items-center gap-1 z-10 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Youtube className="w-3.5 h-3.5 text-primary" />
                      Reproducir
                    </span>
                  </div>
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-[850px] p-0 overflow-hidden bg-black border-zinc-800 rounded-2xl shadow-2xl">
                <div className="aspect-[16/9] w-full">
                  {isOpen && (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${config.videoId}?autoplay=1&rel=0`}
                      title={config.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </Reveal>

          {/* Right Block: PDF Guides (only if present) */}
          {hasGuides && (
            <Reveal y={20} duration={0.6} delay={0.1} className="lg:col-span-1">
              <div
                className="h-full flex flex-col justify-between rounded-[24px] md:rounded-[32px] bg-[#1F1E1E] text-white p-6 md:p-8 border border-white/10 shadow-lg relative overflow-hidden"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="space-y-4 z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                    RECURSOS
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                      Guías y Manuales en PDF
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Descarga instructivos rápidos de configuración.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {guides.map((guide, idx) => (
                      <a
                        key={idx}
                        href={guide.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/item flex items-center gap-3 p-3 rounded-xl bg-zinc-800/40 hover:bg-zinc-800 border border-white/5 hover:border-primary/20 transition-all duration-200"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-200 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate group-hover/item:text-primary transition-colors">
                            {guide.title}
                          </p>
                          <p className="text-[10px] text-zinc-500 uppercase mt-0.5">
                            Formato PDF
                          </p>
                        </div>
                        <Download className="w-4 h-4 text-zinc-500 group-hover/item:text-white transition-colors shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-zinc-600 mt-6 z-10 select-none">
                  UniBank © 2026 · Guías oficiales
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
