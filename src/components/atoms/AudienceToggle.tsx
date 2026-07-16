import { SegmentedToggle } from "@/components/atoms/SegmentedToggle";

export type Audience = "personas" | "empresas";

const OPTIONS = [
  { value: "personas" as const, label: "Personas" },
  { value: "empresas" as const, label: "Empresas" },
];

interface AudienceToggleProps {
  value: Audience;
  onChange: (v: Audience) => void;
}

export function AudienceToggle({ value, onChange }: AudienceToggleProps) {
  return (
    <SegmentedToggle
      value={value}
      onChange={onChange}
      options={OPTIONS}
      layoutId="audience-segment-pill"
      align="center"
      wrapperStyle={{ padding: "28px 16px 0", background: "#fff" }}
    />
  );
}
