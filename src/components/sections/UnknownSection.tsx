import type { ResolvedSection } from "@/integrations/contentful/types";

interface Props {
  section: ResolvedSection;
}

export function UnknownSection({ section }: Props) {
  // Only render in development — silent in production
  if (!import.meta.env.DEV) return null;

  return (
    <div
      style={{
        margin: "24px clamp(16px, 3.9vw, 72px)",
        padding: "24px 28px",
        border: "2px dashed hsl(var(--primary))",
        borderRadius: 16,
        background: "hsl(var(--primary) / 0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "hsl(var(--primary))",
        }}
      >
        ⚠ Unknown Section Type
      </p>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: "hsl(var(--foreground))",
          fontFamily: "monospace",
        }}
      >
        type: <strong>"{section.type}"</strong>
      </p>
      {section.internalName && (
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: "hsl(var(--muted-foreground))",
          }}
        >
          internalName: "{section.internalName}"
        </p>
      )}
      <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
        Add a renderer for this type in{" "}
        <code>src/components/organisms/PageBuilder.tsx</code>
      </p>
    </div>
  );
}
