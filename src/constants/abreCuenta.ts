export const ABRE_CUENTA_AHORROS_URL =
  "https://onboard.unibank.com.pa/es/auth/login";

export function openAbreCuenta(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
