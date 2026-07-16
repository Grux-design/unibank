/**
 * CookieBanner — UniBank Panamá
 * Bottom-right floating card + floating preferences panel
 */

import React, { useState, useEffect, useCallback } from "react";
import { Cookie, ChevronDown, X } from "@/lib/icons";

const T = {
  orange500: "#FF8136",
  orange700: "#CE4D00",
  orange100: "#F7E8E0",
  orange50: "#FBF4F0",
  ivory900: "#1F1E1E",
  ivory800: "#343332",
  ivory700: "#484746",
  ivory600: "#726F6E",
  ivory500: "#908E8D",
  ivory300: "#CAC6C3",
  ivory200: "#E7E4E1",
  ivory100: "#F2EFED",
  ivory50: "#F8F7F6",
  white: "#FFFFFF",
  radiusBtn: "12px",
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
    label: "Cookies estrictamente necesarias",
    description: "Estas cookies son imprescindibles para que el sitio web funcione correctamente. Permiten la navegación, el acceso a áreas seguras y el uso de servicios bancarios esenciales. No se pueden desactivar.",
    locked: true,
    defaultValue: true,
  },
  {
    id: "analytics",
    label: "Cookies analíticas",
    description: "Nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio. Toda la información que recogen es agregada y anónima.",
    locked: false,
    defaultValue: false,
  },
  {
    id: "functional",
    label: "Cookies de funcionalidad",
    description: "Permiten al sitio recordar sus preferencias (idioma, región, etc.) para ofrecerle una experiencia más personalizada.",
    locked: false,
    defaultValue: false,
  },
  {
    id: "marketing",
    label: "Cookies de marketing",
    description: "Se utilizan para mostrarle publicidad relevante según sus intereses dentro y fuera de nuestro sitio. También limitan el número de veces que ve un anuncio y miden la efectividad de las campañas.",
    locked: false,
    defaultValue: false,
  },
];

const IconCookie = ({ size = 24 }: { size?: number }) => (
  <Cookie size={size} color={T.orange500} strokeWidth={1.5} />
);

const IconClose = ({ size = 20 }: { size?: number }) => (
  <X size={size} color="currentColor" strokeWidth={1.5} />
);

const IconChevron = ({ size = 16, open }: { size?: number; open: boolean }) => (
  <ChevronDown
    size={size}
    color="currentColor"
    strokeWidth={1.5}
    style={{ transition: "transform 200ms ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  />
);

// Toggle Switch
const Toggle: React.FC<{ checked: boolean; onChange: (val: boolean) => void; disabled?: boolean; id: string }> = ({ checked, onChange, disabled = false, id }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={`Toggle ${id}`}
      onClick={() => !disabled && onChange(!checked)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", display: "inline-flex", alignItems: "center",
        width: 44, height: 24, borderRadius: 9999, flexShrink: 0, outline: "none",
        border: `1.5px solid ${disabled ? T.ivory200 : checked ? T.orange500 : hovered ? T.ivory300 : T.ivory200}`,
        backgroundColor: disabled ? T.ivory100 : checked ? T.orange500 : T.white,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 180ms ease, border-color 180ms ease",
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <span style={{
        position: "absolute", left: checked ? "calc(100% - 20px)" : 3,
        width: 16, height: 16, borderRadius: 9999,
        backgroundColor: disabled ? T.ivory300 : checked ? T.white : T.ivory300,
        transition: "left 180ms ease, background-color 180ms ease",
      }} />
    </button>
  );
};

// Category Item
const CategoryItem: React.FC<{ config: CategoryConfig; checked: boolean; onChange: (id: ConsentCategory, val: boolean) => void }> = ({ config, checked, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${T.ivory200}`, padding: "14px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button
          onClick={() => setExpanded((p) => !p)}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", padding: 0, cursor: "pointer", flex: 1, textAlign: "left", fontFamily: T.fontFamily }}
          aria-expanded={expanded}
        >
          <IconChevron open={expanded} />
          <span style={{ fontSize: 13, fontWeight: 600, color: T.ivory900 }}>{config.label}</span>
        </button>
        {config.locked ? (
          <span style={{ fontSize: 11, color: T.orange500, fontWeight: 600, whiteSpace: "nowrap" }}>Siempre activas</span>
        ) : (
          <Toggle id={config.id} checked={checked} onChange={(val) => onChange(config.id, val)} disabled={config.locked} />
        )}
      </div>
      <div style={{ overflow: "hidden", maxHeight: expanded ? 200 : 0, transition: "max-height 250ms ease", marginTop: expanded ? 6 : 0 }}>
        <p style={{ fontSize: 12, lineHeight: "17px", color: T.ivory600, margin: 0, paddingLeft: 24 }}>{config.description}</p>
      </div>
    </div>
  );
};

// Floating panel base (positioning via .ub-cookie-float)
const floatCardBase: React.CSSProperties = {
  backgroundColor: T.white,
  borderRadius: T.radiusLg,
  border: `1px solid ${T.ivory200}`,
  boxShadow: "0 8px 32px rgba(31,30,30,0.12)",
  fontFamily: T.fontFamily,
  animation: "ub-slide-up 400ms cubic-bezier(0.16,1,0.3,1)",
};

// Preferences Panel (floating card)
const PreferencesPanel: React.FC<{
  open: boolean;
  preferences: Record<ConsentCategory, boolean>;
  onToggle: (id: ConsentCategory, val: boolean) => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onClose: () => void;
}> = ({ open, preferences, onToggle, onSave, onAcceptAll, onClose }) => {
  const [confirmHover, setConfirmHover] = useState(false);
  const [allowHover, setAllowHover] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ub-cookie-float ub-cookie-panel" style={{ ...floatCardBase, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: `1px solid ${T.ivory200}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: T.orange100, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconCookie size={20} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: T.ivory900 }}>Centro de privacidad</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.ivory500, padding: 4 }} aria-label="Cerrar">
          <IconClose />
        </button>
      </div>

      {/* Body */}
      <div className="ub-scroll" style={{ flex: 1, overflowY: "auto", padding: "14px 20px" }}>
        <p style={{ fontSize: 12, lineHeight: "18px", color: T.ivory600, margin: "0 0 14px" }}>
          Cuando visita nuestro sitio, podemos almacenar información en su dispositivo mediante cookies. Usted puede gestionar sus preferencias a continuación.{" "}
          <a href="/politica-de-cookies" style={{ color: T.orange500, textDecoration: "none", fontWeight: 500 }}>Política de Cookies</a>
        </p>

        {/* Allow all button */}
        <button
          onClick={onAcceptAll}
          onMouseEnter={() => setAllowHover(true)}
          onMouseLeave={() => setAllowHover(false)}
          style={{
            width: "100%", height: 44, borderRadius: T.radiusBtn, border: `2px solid ${allowHover ? T.orange700 : T.orange500}`,
            backgroundColor: allowHover ? T.orange700 : T.orange500, color: T.white,
            fontSize: 14, fontWeight: 600, fontFamily: T.fontFamily, cursor: "pointer",
            transition: "background-color 160ms ease, border-color 160ms ease", marginBottom: 16,
          }}
        >
          Permitir todas
        </button>

        <p style={{ fontSize: 12, fontWeight: 600, color: T.ivory700, margin: "0 0 8px" }}>Gestionar preferencias de consentimiento</p>

        <div>
          {CATEGORIES.map((cat) => (
            <CategoryItem key={cat.id} config={cat} checked={preferences[cat.id]} onChange={onToggle} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "14px 20px 18px", borderTop: `1px solid ${T.ivory200}` }}>
        <button
          onClick={onSave}
          onMouseEnter={() => setConfirmHover(true)}
          onMouseLeave={() => setConfirmHover(false)}
          style={{
            width: "100%", height: 44, borderRadius: T.radiusBtn,
            border: `1.5px solid ${confirmHover ? T.orange700 : T.orange500}`,
            backgroundColor: confirmHover ? T.orange50 : T.white, color: T.orange500,
            fontSize: 14, fontWeight: 600, fontFamily: T.fontFamily, cursor: "pointer",
            transition: "background-color 160ms ease, border-color 160ms ease",
          }}
        >
          Confirmar mis preferencias
        </button>
        <p style={{ fontSize: 10, color: T.ivory500, textAlign: "center", margin: "10px 0 0", lineHeight: "14px" }}>
          Superintendencia de Bancos de Panamá · Ley 81 de 2019
        </p>
      </div>
    </div>
  );
};

// Banner Toast (bottom-right card)
const BannerToast: React.FC<{ onAcceptAll: () => void; onCustomize: () => void }> = ({ onAcceptAll, onCustomize }) => {
  const [acceptHover, setAcceptHover] = useState(false);
  const [configHover, setConfigHover] = useState(false);

  return (
    <div className="ub-cookie-float ub-cookie-toast" style={{ ...floatCardBase, padding: "20px" }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: T.orange100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconCookie size={22} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: T.ivory900 }}>Usamos cookies</h3>
          <p style={{ margin: 0, fontSize: 12, color: T.ivory500 }}>UniBank Panamá</p>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, lineHeight: "18px", color: T.ivory600, margin: "0 0 16px" }}>
        Utilizamos cookies propias y de terceros para mejorar su experiencia y ofrecerle servicios personalizados. Para más información visite nuestra{" "}
        <a href="/politica-de-cookies" style={{ color: T.orange500, textDecoration: "underline", fontWeight: 500 }}>Política de Cookies</a>.
      </p>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: T.ivory200, margin: "0 0 16px" }} />

      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={onAcceptAll}
          onMouseEnter={() => setAcceptHover(true)}
          onMouseLeave={() => setAcceptHover(false)}
          style={{
            width: "100%", height: 48, borderRadius: T.radiusBtn,
            border: `2px solid ${acceptHover ? T.orange700 : T.orange500}`,
            backgroundColor: acceptHover ? T.orange700 : T.orange500, color: T.white,
            fontSize: 14, fontWeight: 600, fontFamily: T.fontFamily, cursor: "pointer",
            transition: "background-color 160ms ease, border-color 160ms ease",
          }}
        >
          Aceptar todas
        </button>
        <button
          onClick={onCustomize}
          onMouseEnter={() => setConfigHover(true)}
          onMouseLeave={() => setConfigHover(false)}
          style={{
            width: "100%", height: 48, borderRadius: T.radiusBtn,
            border: `1px solid ${configHover ? T.ivory300 : T.ivory200}`,
            backgroundColor: configHover ? T.ivory100 : "transparent", color: T.ivory700,
            fontSize: 14, fontWeight: 600, fontFamily: T.fontFamily, cursor: "pointer",
            transition: "background-color 160ms ease, border-color 160ms ease",
          }}
        >
          Configurar Cookies
        </button>
      </div>
    </div>
  );
};

// Keyframes
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
    .ub-cookie-float {
      position: fixed;
      z-index: 55;
      bottom: 24px;
      right: 24px;
      left: auto;
    }
    .ub-cookie-toast {
      width: 380px;
    }
    .ub-cookie-panel {
      width: 420px;
      max-height: 80vh;
    }
    @media (max-width: 767px) {
      .ub-cookie-float {
        left: var(--site-gutter, 16px);
        right: var(--site-gutter, 16px);
        bottom: max(16px, env(safe-area-inset-bottom, 0px));
      }
      .ub-cookie-toast,
      .ub-cookie-panel {
        width: auto;
        max-width: none;
      }
      .ub-cookie-panel {
        max-height: min(80vh, calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 32px));
      }
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
  } catch { return null; }
}

function saveConsent(preferences: Record<ConsentCategory, boolean>): CookieConsent {
  const consent: CookieConsent = {
    version: CONSENT_VERSION, timestamp: new Date().toISOString(),
    essential: true, analytics: preferences.analytics, marketing: preferences.marketing, functional: preferences.functional,
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

  const done = useCallback((consent: CookieConsent) => {
    onConsentSaved?.(consent);
    setVisible(false);
    setPanelOpen(false);
    onClose?.();
  }, [onConsentSaved, onClose]);

  const handleAcceptAll = useCallback(() => {
    done(saveConsent({ essential: true, analytics: true, marketing: true, functional: true }));
  }, [done]);

  const handleSavePreferences = useCallback(() => {
    done(saveConsent(preferences));
  }, [preferences, done]);

  const handleToggle = useCallback((id: ConsentCategory, val: boolean) => {
    setPreferences((prev) => ({ ...prev, [id]: val }));
  }, []);

  if (!visible) return null;

  return (
    <>
      {!panelOpen && <BannerToast onAcceptAll={handleAcceptAll} onCustomize={() => setPanelOpen(true)} />}
      <PreferencesPanel open={panelOpen} preferences={preferences} onToggle={handleToggle} onSave={handleSavePreferences} onAcceptAll={handleAcceptAll} onClose={() => setPanelOpen(false)} />
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
  return { consent, hasConsented: consent !== null, analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false, functional: consent?.functional ?? false };
}

export default CookieBanner;
