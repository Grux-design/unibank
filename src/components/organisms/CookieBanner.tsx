/**
 * CookieBanner — UniBank Panamá
 */

import React, { useState, useEffect, useCallback } from "react";

const T = {
  orange500: "#FF8136",
  orange700: "#CE4D00",
  orange100: "#F7E8E0",
  orange50:  "#FBF4F0",
  ivory900: "#1F1E1E",
  ivory800: "#343332",
  ivory700: "#484746",
  ivory600: "#726F6E",
  ivory500: "#908E8D",
  ivory300: "#CAC6C3",
  ivory200: "#E7E4E1",
  ivory100: "#F2EFED",
  ivory50:  "#F8F7F6",
  white: "#FFFFFF",
  radiusMd: "16px",
  radiusSm: "8px",
  radiusLg: "20px",
  radiusXl: "24px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
} as const;

type ConsentCategory = "essential" | "analytics" | "marketing" | "functional";

interface CookieConsent {
  version: string;
  timestamp: string;
  essential: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CategoryConfig {
  id: ConsentCategory;
  label: string;
  description: string;
  locked: boolean;
  defaultValue: boolean;
}

const STORAGE_KEY = "unibank_cookie_consent";
const CONSENT_VERSION = "1.0";

const CATEGORIES: CategoryConfig[] = [
  {
    id: "essential",
    label: "Cookies esenciales",
    description:
      "Necesarias para que el sitio web funcione correctamente. No pueden desactivarse ya que son imprescindibles para el funcionamiento de los servicios básicos.",
    locked: true,
    defaultValue: true,
  },
  {
    id: "analytics",
    label: "Cookies analíticas",
    description:
      "Nos ayudan a entender cómo interactúas con el sitio web, qué páginas visitas y cómo navegas, para mejorar continuamente tu experiencia.",
    locked: false,
    defaultValue: false,
  },
  {
    id: "marketing",
    label: "Cookies de marketing",
    description:
      "Permiten mostrarte anuncios relevantes y personalizados en función de tus intereses dentro y fuera de UniBank Panamá.",
    locked: false,
    defaultValue: false,
  },
  {
    id: "functional",
    label: "Cookies funcionales",
    description:
      "Habilitan funcionalidades adicionales como recordar tus preferencias de idioma, región o configuración de accesibilidad.",
    locked: false,
    defaultValue: false,
  },
];

// SVG Icons
const IconCookie = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill={T.orange100} stroke={T.orange500} strokeWidth="1.5"/>
    <circle cx="8" cy="9" r="1.5" fill={T.orange500}/>
    <circle cx="14" cy="7" r="1" fill={T.orange500}/>
    <circle cx="10" cy="14" r="1.2" fill={T.orange500}/>
    <circle cx="15" cy="13" r="1" fill={T.orange500}/>
    <circle cx="16" cy="17" r="0.8" fill={T.orange500}/>
    <circle cx="7" cy="16" r="0.8" fill={T.orange500}/>
  </svg>
);

const IconClose = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconLock = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke={T.orange500} strokeWidth="1.2"/>
    <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke={T.orange500} strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="7" cy="9.5" r="1" fill={T.orange500}/>
  </svg>
);

const IconChevron = ({ size = 16, open }: { size?: number; open: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: "transform 200ms ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Toggle Switch
interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
  id: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false, id }) => {
  const [hovered, setHovered] = useState(false);

  const trackStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    width: 44,
    height: 24,
    borderRadius: 9999,
    border: `1px solid ${disabled ? T.ivory200 : checked ? T.orange500 : hovered ? T.ivory300 : T.ivory200}`,
    backgroundColor: disabled ? T.ivory100 : checked ? T.orange500 : T.white,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 180ms ease, border-color 180ms ease",
    flexShrink: 0,
    outline: "none",
  };

  const thumbStyle: React.CSSProperties = {
    position: "absolute",
    left: checked ? "calc(100% - 20px)" : 3,
    width: 16,
    height: 16,
    borderRadius: 9999,
    backgroundColor: disabled ? T.ivory300 : checked ? T.white : T.ivory300,
    transition: "left 180ms ease, background-color 180ms ease",
  };

  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={`Toggle ${id}`}
      onClick={() => !disabled && onChange(!checked)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={trackStyle}
    >
      <span style={thumbStyle} />
    </button>
  );
};

// Button
type ButtonVariant = "primary" | "ghost" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const CookieButton: React.FC<ButtonProps> = ({ variant = "primary", fullWidth = false, children, style, ...rest }) => {
  const [hovered, setHovered] = useState(false);

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: T.radiusMd,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: T.fontFamily,
    lineHeight: "20px",
    letterSpacing: "0.004em",
    cursor: "pointer",
    border: "none",
    outline: "none",
    transition: "background-color 160ms ease, border-color 160ms ease, color 160ms ease",
    whiteSpace: "nowrap",
    width: fullWidth ? "100%" : undefined,
  };

  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: hovered ? T.orange700 : T.orange500,
      color: T.white,
      border: "none",
    },
    ghost: {
      backgroundColor: hovered ? T.ivory200 : "transparent",
      color: T.ivory700,
      border: `1px solid ${hovered ? T.ivory200 : T.ivory100}`,
    },
    outline: {
      backgroundColor: hovered ? T.orange50 : T.white,
      color: T.orange500,
      border: `1px solid ${T.orange500}`,
    },
  };

  return (
    <button
      {...rest}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
};

// Category Item
interface CategoryItemProps {
  config: CategoryConfig;
  checked: boolean;
  onChange: (id: ConsentCategory, val: boolean) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ config, checked, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid ${T.ivory200}`, padding: "16px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button
          onClick={() => setExpanded((p) => !p)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            flex: 1,
            textAlign: "left",
            fontFamily: T.fontFamily,
          }}
          aria-expanded={expanded}
        >
          <IconChevron open={expanded} />
          <span style={{ fontSize: 14, fontWeight: 600, color: T.ivory900 }}>{config.label}</span>
          {config.locked && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: T.orange500, fontWeight: 500 }}>
              <IconLock />
              Siempre activa
            </span>
          )}
        </button>
        <Toggle id={config.id} checked={checked} onChange={(val) => onChange(config.id, val)} disabled={config.locked} />
      </div>
      <div style={{ overflow: "hidden", maxHeight: expanded ? 200 : 0, transition: "max-height 250ms ease", marginTop: expanded ? 8 : 0 }}>
        <p style={{ fontSize: 13, lineHeight: "18px", color: T.ivory600, margin: 0, paddingLeft: 24 }}>
          {config.description}
        </p>
      </div>
    </div>
  );
};

// Preferences Panel
interface PreferencesPanelProps {
  open: boolean;
  preferences: Record<ConsentCategory, boolean>;
  onToggle: (id: ConsentCategory, val: boolean) => void;
  onSave: () => void;
  onRejectAll: () => void;
  onClose: () => void;
}

const PreferencesPanel: React.FC<PreferencesPanelProps> = ({ open, preferences, onToggle, onSave, onRejectAll, onClose }) => {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(31,30,30,0.4)", zIndex: 10000, animation: "ub-fade-in 200ms ease" }} />
      <div role="dialog" aria-modal="true" aria-label="Preferencias de cookies" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10001,
        backgroundColor: T.white, borderRadius: "24px 24px 0 0",
        maxHeight: "85vh", display: "flex", flexDirection: "column",
        animation: "ub-slide-up 350ms cubic-bezier(0.16,1,0.3,1)",
        boxShadow: "0 -8px 40px rgba(31,30,30,0.12)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 16px", borderBottom: `1px solid ${T.ivory200}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: T.orange100, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconCookie size={22} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: T.ivory900, fontFamily: T.fontFamily }}>Preferencias de cookies</h2>
              <p style={{ margin: 0, fontSize: 13, color: T.ivory500, fontFamily: T.fontFamily }}>Gestiona tus preferencias de privacidad</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.ivory500, padding: 4 }} aria-label="Cerrar">
            <IconClose />
          </button>
        </div>

        {/* Body */}
        <div className="ub-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          <p style={{ fontSize: 13, lineHeight: "20px", color: T.ivory600, margin: "0 0 16px", fontFamily: T.fontFamily }}>
            En UniBank Panamá utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Puedes aceptar todas, rechazarlas o configurar individualmente cuáles deseas permitir. Tu elección se guardará durante 12 meses.{" "}
            <a href="/politica-cookies" style={{ color: T.orange500, textDecoration: "none", fontWeight: 500 }}>Política de cookies →</a>
          </p>
          <div>
            {CATEGORIES.map((cat) => (
              <CategoryItem key={cat.id} config={cat} checked={preferences[cat.id]} onChange={onToggle} />
            ))}
          </div>
          <div style={{ height: 100 }} />
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 12, padding: "16px 24px 24px", borderTop: `1px solid ${T.ivory200}`, backgroundColor: T.white }}>
          <CookieButton variant="ghost" fullWidth onClick={onRejectAll}>Rechazar todo</CookieButton>
          <CookieButton variant="primary" fullWidth onClick={onSave}>Guardar preferencias</CookieButton>
        </div>
      </div>
    </>
  );
};

// Banner Toast
interface BannerToastProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
}

const BannerToast: React.FC<BannerToastProps> = ({ onAcceptAll, onRejectAll, onCustomize }) => (
  <div style={{
    position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 10000,
    backgroundColor: T.white, borderRadius: T.radiusXl, border: `1px solid ${T.ivory200}`,
    padding: "20px 24px", width: "min(560px, calc(100% - 32px))",
    boxShadow: "0 8px 32px rgba(31,30,30,0.12)", animation: "ub-slide-up 400ms cubic-bezier(0.16,1,0.3,1)",
    fontFamily: T.fontFamily,
  }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: T.orange100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <IconCookie size={22} />
      </div>
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: T.ivory900 }}>Usamos cookies</h3>
        <p style={{ margin: 0, fontSize: 13, lineHeight: "18px", color: T.ivory600 }}>
          Utilizamos cookies para mejorar tu experiencia y personalizar el contenido.{" "}
          <a href="/politica-cookies" style={{ color: T.orange500, textDecoration: "none", fontWeight: 500 }}>Saber más</a>
        </p>
      </div>
    </div>
    <div style={{ height: 1, backgroundColor: T.ivory200, margin: "0 0 16px" }} />
    <div style={{ display: "flex", gap: 10 }}>
      <CookieButton variant="ghost" fullWidth onClick={onRejectAll}>Rechazar todo</CookieButton>
      <CookieButton variant="outline" fullWidth onClick={onCustomize}>Personalizar</CookieButton>
      <CookieButton variant="primary" fullWidth onClick={onAcceptAll}>Aceptar todo</CookieButton>
    </div>
  </div>
);

// Keyframes injection
const STYLE_ID = "unibank-cookie-keyframes";

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes ub-slide-up {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes ub-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .ub-scroll::-webkit-scrollbar { width: 4px; }
    .ub-scroll::-webkit-scrollbar-track { background: transparent; }
    .ub-scroll::-webkit-scrollbar-thumb { background: #E7E4E1; border-radius: 4px; }
  `;
  document.head.appendChild(style);
}

// Utils
function loadConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(preferences: Record<ConsentCategory, boolean>): CookieConsent {
  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    essential: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    functional: preferences.functional,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  return consent;
}

function buildDefaults(): Record<ConsentCategory, boolean> {
  return Object.fromEntries(CATEGORIES.map((c) => [c.id, c.defaultValue])) as Record<ConsentCategory, boolean>;
}

// Root Component
export interface CookieBannerProps {
  onConsentSaved?: (consent: CookieConsent) => void;
  forceShow?: boolean;
  onClose?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onConsentSaved, forceShow = false, onClose }) => {
  useEffect(() => { injectKeyframes(); }, []);

  const [visible, setVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [preferences, setPreferences] = useState<Record<ConsentCategory, boolean>>(buildDefaults());

  useEffect(() => {
    const existing = loadConsent();
    if (forceShow || !existing) {
      setVisible(true);
      if (existing) {
        setPreferences({ essential: true, analytics: existing.analytics, marketing: existing.marketing, functional: existing.functional });
      }
    }
  }, [forceShow]);

  const handleAcceptAll = useCallback(() => {
    const all: Record<ConsentCategory, boolean> = { essential: true, analytics: true, marketing: true, functional: true };
    const consent = saveConsent(all);
    onConsentSaved?.(consent);
    setVisible(false);
    setPanelOpen(false);
    onClose?.();
  }, [onConsentSaved, onClose]);

  const handleRejectAll = useCallback(() => {
    const none: Record<ConsentCategory, boolean> = { essential: true, analytics: false, marketing: false, functional: false };
    const consent = saveConsent(none);
    onConsentSaved?.(consent);
    setVisible(false);
    setPanelOpen(false);
    onClose?.();
  }, [onConsentSaved, onClose]);

  const handleSavePreferences = useCallback(() => {
    const consent = saveConsent(preferences);
    onConsentSaved?.(consent);
    setVisible(false);
    setPanelOpen(false);
    onClose?.();
  }, [preferences, onConsentSaved, onClose]);

  const handleToggle = useCallback((id: ConsentCategory, val: boolean) => {
    setPreferences((prev) => ({ ...prev, [id]: val }));
  }, []);

  if (!visible) return null;

  return (
    <>
      {!panelOpen && (
        <BannerToast onAcceptAll={handleAcceptAll} onRejectAll={handleRejectAll} onCustomize={() => setPanelOpen(true)} />
      )}
      <PreferencesPanel open={panelOpen} preferences={preferences} onToggle={handleToggle} onSave={handleSavePreferences} onRejectAll={handleRejectAll} onClose={() => setPanelOpen(false)} />
    </>
  );
};

// Hook
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    setConsent(loadConsent());
    const handler = (e: StorageEvent) => { if (e.key === STORAGE_KEY) setConsent(loadConsent()); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return {
    consent,
    hasConsented: consent !== null,
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
    functional: consent?.functional ?? false,
  };
}

export default CookieBanner;
