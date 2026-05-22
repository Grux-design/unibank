import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { RECAPTCHA_SITE_KEY, loadRecaptchaScript } from "@/lib/recaptcha";

export type ReCaptchaHandle = {
  reset: () => void;
};

type Props = {
  onChange: (token: string | null) => void;
  theme?: "light" | "dark";
};

const ReCaptcha = forwardRef<ReCaptchaHandle, Props>(({ onChange, theme = "light" }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
        onChange(null);
      }
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadRecaptchaScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.grecaptcha) return;
        if (widgetIdRef.current !== null) return;
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme,
          callback: (token) => onChange(token),
          "expired-callback": () => onChange(null),
          "error-callback": () => onChange(null),
        });
      })
      .catch(() => onChange(null));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} />;
});

ReCaptcha.displayName = "ReCaptcha";

export default ReCaptcha;
