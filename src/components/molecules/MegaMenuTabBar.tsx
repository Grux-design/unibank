import { SegmentedToggle } from "@/components/atoms/SegmentedToggle";

type Tab = "personas" | "empresas";

const OPTIONS = [
  { value: "personas" as const, label: "Personas" },
  { value: "empresas" as const, label: "Empresas" },
];

interface MegaMenuTabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function MegaMenuTabBar({ activeTab, onTabChange }: MegaMenuTabBarProps) {
  return (
    <SegmentedToggle
      value={activeTab}
      onChange={onTabChange}
      options={OPTIONS}
      layoutId="mega-menu-segment-pill"
      align="left"
      wrapperStyle={{ padding: "24px 0 20px" }}
    />
  );
}
