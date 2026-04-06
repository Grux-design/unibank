import { motion } from "motion/react";

type Tab = "personas" | "empresas";

interface MegaMenuTabBarProps {
  activeTab:   Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: { value: Tab; label: string }[] = [
  { value: "personas", label: "Personas" },
  { value: "empresas", label: "Empresas" },
];

export function MegaMenuTabBar({ activeTab, onTabChange }: MegaMenuTabBarProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px 0 20px" }}>
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
        {TABS.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              style={{
                position: "relative",
                border: "none",
                background: "transparent",
                borderRadius: 999,
                padding: "10px 32px",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.01em",
                cursor: "pointer",
                color: isActive ? "#fff" : "#1C1917",
                transition: "color 0.2s",
                zIndex: 1,
                userSelect: "none",
                whiteSpace: "nowrap",
                outline: "none",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="mega-tab-pill"
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 999,
                    background: "#FF8136",
                    zIndex: -1,
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.9 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
