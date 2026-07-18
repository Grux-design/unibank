import { describe, expect, it } from "vitest";
import { normalizeSearchText, searchEntries, tokenizeQuery } from "@/lib/search";
import { searchPages, searchPageHrefs } from "@/data/searchPages";

describe("normalizeSearchText", () => {
  it("folds accents and lowercases", () => {
    expect(normalizeSearchText("Crédito Hipotecario")).toBe("credito hipotecario");
    expect(normalizeSearchText("  Mi   Negocio  ")).toBe("mi negocio");
  });
});

describe("tokenizeQuery", () => {
  it("splits and normalizes tokens", () => {
    expect(tokenizeQuery("Cajilla de Seguridad")).toEqual(["cajilla", "de", "seguridad"]);
  });
});

describe("searchEntries", () => {
  it("finds pages by synonym even when label differs", () => {
    const results = searchEntries(searchPages, "hipoteca");
    expect(results.some((p) => p.href === "/personas/credito/prestamo-de-vivienda")).toBe(true);
  });

  it("finds Mi Negocio via pyme / juridica synonyms", () => {
    expect(searchEntries(searchPages, "pyme")[0]?.href).toBe("/empresas/cuentas/cuenta-juridica-digital");
    expect(searchEntries(searchPages, "cuenta juridica").some((p) => p.href.includes("cuenta-juridica-digital"))).toBe(true);
    expect(searchEntries(searchPages, "cuenta juridica digital")[0]?.href).toBe("/empresas/cuentas/cuenta-juridica-digital");
  });

  it("finds Cajilla, UniTrust, UniLeasing, and Canal de denuncias", () => {
    expect(searchEntries(searchPages, "cajilla")[0]?.href).toContain("cajilla-de-seguridad");
    expect(searchEntries(searchPages, "fideicomiso")[0]?.href).toBe("/grupo/unitrust");
    expect(searchEntries(searchPages, "arrendamiento").some((p) => p.href.includes("leasing"))).toBe(true);
    expect(searchEntries(searchPages, "denuncia")[0]?.href).toBe("/canal-de-denuncias");
  });

  it("finds institutional and legal pages", () => {
    expect(searchEntries(searchPages, "estados financieros")[0]?.href).toBe("/institucional/estados-financieros");
    expect(searchEntries(searchPages, "cookies")[0]?.href).toBe("/politica-de-cookies");
    expect(searchEntries(searchPages, "empleo")[0]?.href).toBe("/trabaja-con-nosotros");
  });

  it("requires all tokens for multi-word queries", () => {
    const results = searchEntries(searchPages, "banca movil empresas");
    expect(results.some((p) => p.href === "https://uniconnect.unibank.com.pa/banca-movil/")).toBe(true);
  });

  it("indexes real product hrefs instead of legacy stubs", () => {
    expect(searchPageHrefs).toContain("/personas/cuentas/cuenta-de-ahorros");
    expect(searchPageHrefs).toContain("/empresas/cuentas/cuenta-juridica-digital");
    expect(searchPageHrefs).not.toContain("/empresas/cuentas/mi-negocio");
    expect(searchPageHrefs).not.toContain("/cuenta-ahorros");
    expect(searchPageHrefs).not.toContain("/tarjetas");
    expect(searchPageHrefs).not.toContain("/banca-movil");
    expect(searchPageHrefs).toContain("https://uniconnect.unibank.com.pa/banca-movil/");
  });

  it("covers key site surfaces", () => {
    const required = [
      "/",
      "/blog",
      "/contact",
      "/sucursales",
      "/tarifario",
      "/trabaja-con-nosotros",
      "/canal-de-denuncias",
      "/grupo/unitrust",
      "/grupo/unileasing",
      "/personas/otros-servicios/cajilla-de-seguridad",
      "/institucional/junta-directiva",
      "/institucional/sostenibilidad",
      "/institucional/estados-financieros",
      "/institucional/calificacion-de-riesgo",
      "/institucional/cumplimiento-normativo",
      "/institucional/unilideres",
      "/aviso-de-privacidad",
      "/terminos-y-condiciones",
      "/politica-de-cookies",
      "/personas/credito/prestamo-de-auto-digital",
      "/empresas/otros-servicios/pago-de-planilla",
    ];
    for (const href of required) {
      expect(searchPageHrefs).toContain(href);
    }
  });
});
