export const ABRE_CUENTA_AHORROS_URL = "https://onboard.unibank.com.pa/es/auth/login";
export const ABRE_CUENTA_JURIDICA_URL = "https://onboardjuridico.unibank.com.pa/Home";

export type AbreCuentaId = "ahorros" | "juridica";

const ABRE_CUENTA_URLS: Record<AbreCuentaId, string> = {
  ahorros: ABRE_CUENTA_AHORROS_URL,
  juridica: ABRE_CUENTA_JURIDICA_URL,
};

export function openAbreCuenta(id: AbreCuentaId): void {
  window.open(ABRE_CUENTA_URLS[id], "_blank", "noopener,noreferrer");
}
