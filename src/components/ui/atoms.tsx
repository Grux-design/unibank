import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

/* ── SectionTag ─────────────────────────────────────────── */
export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: 99,
        background: "hsl(20 100% 95%)",
        color: "var(--fun-orange)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--fun-orange)",
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

/* ── SectionHeading ─────────────────────────────────────── */
interface SectionHeadingProps {
  tag?: React.ReactNode;
  headline: React.ReactNode;
  body?: string;
  cta?: React.ReactNode;
  px?: number | string;
  mb?: number | string;
  align?: "left" | "center";
}

export function SectionHeading({ tag, headline, body, cta, px = 0, mb = 40, align = "left" }: SectionHeadingProps) {
  const textAlign = align === "center" ? "center" : "left";
  const alignItems = align === "center" ? "center" : "flex-start";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems,
        gap: 16,
        paddingLeft: px,
        paddingRight: px,
        marginBottom: mb,
      }}
    >
      {tag && <SectionTag>{tag}</SectionTag>}
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: "var(--uni-dark)",
          textAlign,
        }}
      >
        {headline}
      </h2>
      {body && (
        <p
          style={{
            margin: 0,
            fontSize: "clamp(14px, 1.5vw, 17px)",
            lineHeight: 1.65,
            color: "var(--uni-dark-soft)",
            maxWidth: 580,
            textAlign,
          }}
        >
          {body}
        </p>
      )}
      {cta && cta}
    </div>
  );
}

/* ── LinkArrow ──────────────────────────────────────────── */
export function LinkArrow({ children, href = "#" }: { children: React.ReactNode; href?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: "var(--fun-orange)",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.004em",
        textDecoration: "none",
        transform: hov ? "translateX(4px)" : "translateX(0)",
        transition: "transform 0.22s ease",
        userSelect: "none",
      }}
    >
      {children}
      <ArrowRight size={13} strokeWidth={2.5} />
    </a>
  );
}

/* ── BtnPrimary ─────────────────────────────────────────── */
export function BtnPrimary({
  children,
  href = "#",
  fullWidth,
}: {
  children: React.ReactNode;
  href?: string;
  fullWidth?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "0 28px",
        height: "var(--btn-height)",
        borderRadius: "var(--btn-border-radius)",
        background: hov ? "hsl(20 100% 45%)" : "var(--fun-orange)",
        color: "#fff",
        fontSize: "var(--btn-font-size)",
        fontWeight: "var(--btn-font-weight)",
        textDecoration: "none",
        transition: "background 0.18s",
        cursor: "pointer",
        width: fullWidth ? "100%" : undefined,
        whiteSpace: "nowrap",
        border: "none",
      }}
    >
      {children}
    </a>
  );
}
