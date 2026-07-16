import { THEME } from "@/data/heroSlides";

interface HeroArrowButtonProps {
  label:   string;
  onClick: () => void;
  /** SVG path for the arrow icon */
  path:    string;
}

export function HeroArrowButton({ label, onClick, path }: HeroArrowButtonProps) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        width:         48,
        height:        48,
        borderRadius:  12,
        background:    THEME.arrowBtnBg,
        border:        `1px solid ${THEME.arrowBtnBorder}`,
        cursor:        "pointer",
        display:       "flex",
        alignItems:    "center",
        justifyContent:"center",
        transition:    "background 0.18s, border-color 0.18s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background  = THEME.arrowBtnHoverBg;
        (e.currentTarget as HTMLButtonElement).style.borderColor = THEME.arrowBtnHoverBg;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background  = THEME.arrowBtnBg;
        (e.currentTarget as HTMLButtonElement).style.borderColor = THEME.arrowBtnBorder;
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d={path} stroke={THEME.arrowIconStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
