import { LanguageWidget }    from "@/widgets/LanguageWidget";
import { SearchWidget }      from "@/widgets/SearchWidget";
import { BancaEnLineaWidget } from "@/widgets/BancaEnLineaWidget";
import { AbreCuentaWidget }  from "@/widgets/AbreCuentaWidget";
import type { HeaderLayout } from "@/hooks/useHeaderLayout";

interface RightHeaderPillProps {
  isMenuOpen?: boolean;
  lang:        "es" | "en";
  onLangChange:(code: "es" | "en") => void;
  layout?:     HeaderLayout;
}

export function RightHeaderPill({
  isMenuOpen = false,
  lang,
  onLangChange,
  layout = "full",
}: RightHeaderPillProps) {
  const languageVariant = layout === "full" ? "full" : layout === "compact" ? "compact" : "icon";

  return (
    <div
      style={{
        display: "flex", alignItems: "center",
        background: isMenuOpen ? "transparent" : "#fff",
        borderRadius: isMenuOpen ? 0 : 16,
        height: 66, padding: layout === "mobile" ? "0 6px" : "0 10px",
        gap: layout === "mobile" ? 2 : 4,
        border: isMenuOpen ? "none" : "0.5px solid #E7E4E1",
        boxShadow: isMenuOpen ? "none" : undefined,
        transition: "background 0.2s ease, border-radius 0.2s ease, border 0.2s ease",
        flexShrink: 0,
        minWidth: 0,
      }}
    >
      <LanguageWidget lang={lang} onLangChange={onLangChange} variant={languageVariant} />
      <SearchWidget />
      <BancaEnLineaWidget layout={layout} />
      <AbreCuentaWidget layout={layout} />
    </div>
  );
}
