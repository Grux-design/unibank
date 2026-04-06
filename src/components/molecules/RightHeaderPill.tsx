import { LanguageWidget }    from "@/widgets/LanguageWidget";
import { SearchWidget }      from "@/widgets/SearchWidget";
import { BancaEnLineaWidget } from "@/widgets/BancaEnLineaWidget";
import { AbreCuentaWidget }  from "@/widgets/AbreCuentaWidget";

interface RightHeaderPillProps {
  isMenuOpen?: boolean;
  lang:        "es" | "en";
  onLangChange:(code: "es" | "en") => void;
}

export function RightHeaderPill({ isMenuOpen = false, lang, onLangChange }: RightHeaderPillProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: isMenuOpen ? "transparent" : "#fff",
      borderRadius: isMenuOpen ? 0 : 16,
      height: 66, padding: "0 10px", gap: 4,
      border: isMenuOpen ? "none" : "0.5px solid #E7E4E1",
      transition: "background 0.2s ease, border-radius 0.2s ease, border 0.2s ease",
    }}>
      <LanguageWidget    lang={lang} onLangChange={onLangChange} />
      <SearchWidget />
      <BancaEnLineaWidget />
      <AbreCuentaWidget />
    </div>
  );
}
