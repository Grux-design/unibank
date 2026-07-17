export const BANCA_EN_LINEA_PERSONAS_URL =
  "https://ebanking.unibank.com.pa/DIBS_UNIBANK_PANAMA/pages/loginP.jsp";

export const BANCA_EN_LINEA_EMPRESAS_URL =
  "https://ebanking.unibank.com.pa/DIBS_UNIBANK_PANAMA/pages/loginC.jsp";

export function openBancaEnLinea(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
