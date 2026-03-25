import { motion } from "motion/react";

export type Audience = "personas" | "empresas";

interface AudienceToggleProps {
  value: Audience;
  onChange: (v: Audience) => void;
}

const OPTIONS: { value: Audience; label: string }[] = [
  { value: "personas", label: "Personas" },
  { value: "empresas", label: "Empresas" },
];

export function AudienceToggle({ value, onChange }: AudienceToggleProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "28px 16px 0",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          border: "1.5px solid #E7E4E1",
          borderRadius: 999,
          padding: 4,
          gap: 2,
          background: "#fff",
        }}
      >
        {OPTIONS.map((opt) => {
          const isActive = opt.value === value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              aria-pressed={isActive}
              onFocus={(e) => {
                e.currentTarget.style.outline = "none";
              }}
              style={{
                position: "relative",
                border: "none",
                background: "transparent",
                borderRadius: 999,
                padding: "10px 28px",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                cursor: "pointer",
                color: isActive ? "#fff" : "var(--uni-dark)",
                transition: "color 0.2s",
                zIndex: 1,
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="audience-active-pill"
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 999,
                    background: "var(--fun-orange)",
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
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
