export type SustainabilityVectorKind = "finance" | "inclusion" | "environment";

const svgProps = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function VectorStage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="page-line-art flex h-[min(176px,34vw)] items-center justify-center"
      aria-hidden
    >
      <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none">
        {children}
      </div>
    </div>
  );
}

function ArtSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 96" className="h-[108px] w-[132px]" {...svgProps}>
      {children}
    </svg>
  );
}

/** Finanzas sostenibles — moneda + tendencia al alza + hoja */
function SustainableFinanceVector() {
  return (
    <VectorStage>
      <ArtSvg>
        <line x1="14" y1="80" x2="106" y2="80" />
        <polyline points="22,66 40,54 56,58 72,36 90,26" />
        <circle cx="32" cy="62" r="15" className="line-art-fill" />
        <path d="M25 62 H39 M32 55 V69" />
        <path
          d="M90 18 C96 12 104 16 102 24 C100 30 90 34 90 34 C90 34 80 30 78 24 C76 16 84 12 90 18 Z"
          className="line-art-fill"
        />
        <line x1="90" y1="22" x2="90" y2="29" />
      </ArtSvg>
    </VectorStage>
  );
}

/** Inclusión social — tres personas (icono universal legible) */
function SocialInclusionVector() {
  return (
    <VectorStage>
      <ArtSvg>
        <circle cx="28" cy="27" r="8.5" className="line-art-fill" />
        <path d="M14 72 C14 58 28 52 42 58 C42 72 14 72 Z" className="line-art-fill" />

        <circle cx="60" cy="23" r="9.5" className="line-art-fill" />
        <path d="M42 74 C42 56 60 48 78 56 C78 74 42 74 Z" className="line-art-fill" />

        <circle cx="92" cy="27" r="8.5" className="line-art-fill" />
        <path d="M78 72 C78 58 92 52 106 58 C106 72 78 72 Z" className="line-art-fill" />
      </ArtSvg>
    </VectorStage>
  );
}

/** Medio ambiente — hoja grande y clara */
function EnvironmentLeafVector() {
  return (
    <VectorStage>
      <ArtSvg>
        <path
          d="M60 12 C82 16 94 36 92 56 C90 72 76 84 60 88 C44 84 30 72 28 56 C26 36 38 16 60 12 Z"
          className="line-art-fill"
        />
        <line x1="60" y1="22" x2="60" y2="80" />
        <path d="M60 32 C50 40 44 50 42 62" />
        <path d="M60 40 C70 48 76 58 78 70" />
        <path d="M60 48 C54 54 50 62 48 72" />
        <path d="M60 56 C66 62 70 68 72 76" />
      </ArtSvg>
    </VectorStage>
  );
}

export function SustainabilityLineArt({ kind }: { kind: SustainabilityVectorKind }) {
  switch (kind) {
    case "finance":
      return <SustainableFinanceVector />;
    case "inclusion":
      return <SocialInclusionVector />;
    case "environment":
      return <EnvironmentLeafVector />;
  }
}
