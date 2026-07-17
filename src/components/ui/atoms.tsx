import React, { useState } from "react";
import { ChevronRight } from "@/lib/icons";
import { TYPO } from "@/constants/typography";

/* ── HeadlineAccent ─────────────────────────────────────── */
/** Orange accent span for mixed-color section headlines */
export function HeadlineAccent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: TYPO.colors.accent }}>{children}</span>;
}

/* ── SectionTag ─────────────────────────────────────────── */
export function SectionTag({ children }: { children: React.ReactNode }) {
  return <span className="type-section-tag">{children}</span>;
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
  const headlineStyle = TYPO.sectionHeadline.desktop;

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: TYPO.sectionCopyMaxWidth.desktop,
          width: "100%",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: headlineStyle.fontSize,
            fontWeight: headlineStyle.fontWeight,
            lineHeight: headlineStyle.lineHeight,
            letterSpacing: headlineStyle.letterSpacing,
            color: TYPO.colors.headline,
            textAlign,
          }}
        >
          {headline}
        </h2>
        {body && (
          <p
            style={{
              margin: 0,
              fontSize: TYPO.sectionBody.desktop.fontSize,
              lineHeight: TYPO.sectionBody.desktop.lineHeight,
              color: TYPO.colors.body,
              textAlign,
            }}
          >
            {body}
          </p>
        )}
        {cta && cta}
      </div>
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
        color: TYPO.colors.accent,
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
      <ChevronRight size={13} strokeWidth={2.5} />
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
  const isExternal = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
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
        width: fullWidth ? "100%" : "fit-content",
        alignSelf: fullWidth ? "stretch" : "flex-start",
        whiteSpace: "nowrap",
        border: "none",
      }}
    >
      {children}
    </a>
  );
}
