import { footerColumns } from "@/data/footerData";
import { FooterNavColumn } from "@/components/molecules/FooterNavColumn";

export function FooterNavGrid() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 32,
    }}>
      {footerColumns.map((col) => (
        <FooterNavColumn key={col.title} column={col} />
      ))}
    </div>
  );
}
