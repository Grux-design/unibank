import { Users, Building2, ChevronRight } from "lucide-react";

type Tab = "personas" | "empresas";

interface MegaMenuTabBarProps {
  activeTab:    Tab;
  onTabChange:  (tab: Tab) => void;
}

export function MegaMenuTabBar({ activeTab, onTabChange }: MegaMenuTabBarProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #E0DDD9" }}>
      {(["personas", "empresas"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "18px 0", marginRight: 28,
            fontFamily: "Inter, sans-serif", fontSize: "0.9375rem",
            fontWeight: activeTab === tab ? 600 : 400,
            color: activeTab === tab ? "#1C1917" : "#908E8D",
            borderBottom: `2px solid ${activeTab === tab ? "#FF8136" : "transparent"}`,
            marginBottom: -1, transition: "color 0.14s",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          {tab === "personas" ? <Users size={15} /> : <Building2 size={15} />}
          {tab === "personas" ? "Personas" : "Empresas"}
        </button>
      ))}

      <a
        href="#"
        style={{
          marginLeft: "auto", display: "flex", alignItems: "center", gap: 4,
          fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
          color: "#908E8D", textDecoration: "none",
          padding: "18px 0", transition: "color 0.14s",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#1C1917"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "#908E8D"; }}
      >
        Ver todo <ChevronRight size={13} />
      </a>
    </div>
  );
}
