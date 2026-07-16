export const SPLASH_TEXTURE_URL = "/textureUniBank.svg";

export function isHomeRoute(): boolean {
  const path = window.location.pathname;
  return path === "/" || path === "";
}

export function shouldPlaySplashBoot(): boolean {
  return (
    isHomeRoute() &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Remove the static HTML boot overlay and reveal the React root. */
export function dismissSplashBoot(): void {
  document.documentElement.classList.remove("splash-pending");
  document.getElementById("splash-boot")?.remove();
}
