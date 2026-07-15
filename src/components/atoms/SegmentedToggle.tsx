import { useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { CTA_BUTTON_COLORS, SEGMENTED_TOGGLE } from "@/constants/ctaButtons";

export type SegmentValue = string;

export interface SegmentOption<T extends SegmentValue> {
  value: T;
  label: string;
}

interface SegmentedToggleProps<T extends SegmentValue> {
  value: T;
  onChange: (value: T) => void;
  options: SegmentOption<T>[];
  /** Unique per instance — required for motion layout isolation */
  layoutId: string;
  align?: "left" | "center";
  stretch?: boolean;
  compact?: boolean;
  variant?: "primary" | "neutral";
  wrapperStyle?: CSSProperties;
}

const inactive = CTA_BUTTON_COLORS.toggleInactive;
const t = SEGMENTED_TOGGLE;

export function SegmentedToggle<T extends SegmentValue>({
  value,
  onChange,
  options,
  layoutId,
  align = "center",
  stretch = false,
  compact = false,
  variant = "primary",
  wrapperStyle,
}: SegmentedToggleProps<T>) {
  const containerRadius = compact ? 10 : t.containerRadius;
  const containerPadding = compact ? 3 : t.containerPadding;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: align === "center" ? "center" : "flex-start",
        width: stretch ? "100%" : undefined,
        ...wrapperStyle,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          width: stretch ? "100%" : undefined,
          border: t.containerBorder,
          borderRadius: containerRadius,
          padding: containerPadding,
          gap: t.containerGap,
          background: "#fff",
        }}
      >
        {options.map((opt) => (
          <SegmentedToggleOption
            key={opt.value}
            label={opt.label}
            isActive={opt.value === value}
            layoutId={layoutId}
            stretch={stretch}
            compact={compact}
            variant={variant}
            onSelect={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

function SegmentedToggleOption({
  label,
  isActive,
  layoutId,
  stretch,
  compact,
  variant,
  onSelect,
}: {
  label: string;
  isActive: boolean;
  layoutId: string;
  stretch?: boolean;
  compact?: boolean;
  variant?: "primary" | "neutral";
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isNeutral = variant === "neutral";

  const bg = isActive
    ? "transparent"
    : pressed
      ? isNeutral ? "#EEE9E5" : inactive.bgActive
      : hovered
        ? isNeutral ? "#F7F5F3" : inactive.bgHover
        : inactive.bg;

  const buttonRadius = compact ? 8 : t.buttonRadius;
  const buttonPadding = compact ? "6px 14px" : t.buttonPadding;
  const fontSize = compact ? 13 : t.fontSize;
  const activeBg = isNeutral ? t.neutralActiveBg : t.activeBg;
  const activeColor = isNeutral ? t.neutralActiveColor : t.activeColor;
  const inactiveColor = isNeutral ? t.neutralInactiveColor : inactive.color;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => { if (!isActive) setPressed(true); }}
      onMouseUp={() => setPressed(false)}
      style={{
        position: "relative",
        border: "none",
        background: bg,
        flex: stretch ? 1 : undefined,
        borderRadius: buttonRadius,
        padding: buttonPadding,
        fontSize,
        fontWeight: t.fontWeight,
        fontFamily: "Inter, sans-serif",
        letterSpacing: "-0.01em",
        cursor: "pointer",
        color: isActive ? activeColor : inactiveColor,
        transition: "background 0.18s ease, color 0.2s",
        zIndex: 1,
        userSelect: "none",
        whiteSpace: "nowrap",
        outline: "none",
      }}
    >
      {isActive && (
        <motion.span
          layoutId={layoutId}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: buttonRadius,
            background: activeBg,
            boxShadow: isNeutral ? "0 1px 3px rgba(0,0,0,0.08)" : undefined,
            zIndex: -1,
          }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 34,
            mass: 0.9,
          }}
        />
      )}
      {label}
    </button>
  );
}
