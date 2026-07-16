import { footerColumns } from "@/data/footerData";
import { FooterNavColumn } from "@/components/molecules/FooterNavColumn";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export function FooterNavGrid() {
  const bp = useBreakpoint();

  const columns =
    bp === "mobile" ? "1fr" : bp === "compact" ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))";

  const gap = bp === "mobile" ? 32 : bp === "compact" ? 28 : 32;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns,
        gap,
        width: "100%",
        minWidth: 0,
      }}
    >
      {footerColumns.map((col) => (
        <FooterNavColumn key={col.title} column={col} />
      ))}
    </div>
  );
}
