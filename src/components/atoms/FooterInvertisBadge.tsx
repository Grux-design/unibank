export function FooterInvertisBadge() {
  const TEXT_LINK = "#484746";
  const ORANGE    = "#FF8136";

  return (
    <a
      href="https://www.invertissecurities.com/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 14,
        color: TEXT_LINK,
        textDecoration: "none",
        transition: "color 0.13s",
        display: "inline-block",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
    >
      Invertis
    </a>
  );
}
