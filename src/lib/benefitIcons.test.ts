import { describe, expect, it } from "vitest";
import { resolveBenefitIcon } from "@/lib/benefitIcons";

describe("resolveBenefitIcon", () => {
  it("maps known Personas and Empresas benefit titles", () => {
    expect(resolveBenefitIcon("Control de flujo de caja").displayName).toContain("Benefit");
    expect(resolveBenefitIcon("Seguridad avanzada")).toBeTruthy();
    expect(resolveBenefitIcon("Autogestión de chequeras")).toBeTruthy();
    expect(resolveBenefitIcon("Sin trámites presenciales")).toBeTruthy();
    expect(resolveBenefitIcon("Respaldo Internacional")).toBeTruthy();
    expect(resolveBenefitIcon("Impulso a la competitividad")).toBeTruthy();
  });

  it("falls back via keywords for unmapped titles", () => {
    const security = resolveBenefitIcon("Nueva capa de seguridad bancaria");
    const agro = resolveBenefitIcon("Programa agro sostenible");
    expect(security).toBeTruthy();
    expect(agro).toBeTruthy();
    expect(security).not.toBe(agro);
  });

  it("returns a stable fallback for empty titles", () => {
    expect(resolveBenefitIcon("")).toBe(resolveBenefitIcon(null));
  });
});
