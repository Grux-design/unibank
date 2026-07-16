import { ChevronLeft, ChevronRight } from "@/lib/icons";
import { THEME } from "@/data/heroSlides";

interface HeroArrowButtonProps {
  label: string;
  onClick: () => void;
  direction: "left" | "right";
}

export function HeroArrowButton({ label, onClick, direction }: HeroArrowButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: THEME.arrowBtnBg,
        border: `1px solid ${THEME.arrowBtnBorder}`,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.18s, border-color 0.18s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = THEME.arrowBtnHoverBg;
        (e.currentTarget as HTMLButtonElement).style.borderColor = THEME.arrowBtnHoverBg;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = THEME.arrowBtnBg;
        (e.currentTarget as HTMLButtonElement).style.borderColor = THEME.arrowBtnBorder;
      }}
    >
      <Icon size={20} color={THEME.arrowIconStroke} strokeWidth={1.5} />
    </button>
  );
}
