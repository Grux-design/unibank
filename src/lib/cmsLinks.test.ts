import { describe, expect, it } from "vitest";
import { filterCmsCtaItems, getCmsCtaHref, isAllowedCmsHref } from "./cmsLinks";

describe("cmsLinks", () => {
  it("allows onboard and ebanking subdomains", () => {
    expect(isAllowedCmsHref("https://onboard.unibank.com.pa/es/auth/login")).toBe(true);
    expect(isAllowedCmsHref("https://ebanking.unibank.com.pa/DIBS_UNIBANK_PANAMA/pages/loginP.jsp")).toBe(true);
  });

  it("allows WhatsApp advisor CTAs used on product heroes", () => {
    expect(
      isAllowedCmsHref(
        "https://api.whatsapp.com/send?phone=50763280229&text=%C2%A1Hola!,%20Tengo%20una%20Consulta",
      ),
    ).toBe(true);
    expect(isAllowedCmsHref("https://wa.me/50763280229")).toBe(true);
    expect(
      getCmsCtaHref(
        "https://api.whatsapp.com/send?phone=50763280229&text=%C2%A1Hola!,%20Tengo%20una%20Consulta",
      ),
    ).toBe(
      "https://api.whatsapp.com/send?phone=50763280229&text=%C2%A1Hola!,%20Tengo%20una%20Consulta",
    );
  });

  it("blocks third-party domains", () => {
    expect(isAllowedCmsHref("https://play.google.com/store/apps/details?id=com.newtech.unibank")).toBe(false);
    expect(isAllowedCmsHref("https://univivir.com.pa")).toBe(false);
  });

  it("blocks empty, hash-only, and known broken internal paths", () => {
    expect(isAllowedCmsHref("")).toBe(false);
    expect(isAllowedCmsHref("#")).toBe(false);
    expect(isAllowedCmsHref("/login")).toBe(false);
    expect(isAllowedCmsHref("/cuenta-ahorros")).toBe(false);
    expect(isAllowedCmsHref("/personas")).toBe(false);
  });

  it("allows valid internal product routes", () => {
    expect(isAllowedCmsHref("/personas/cuentas/cuenta-de-ahorros")).toBe(true);
    expect(isAllowedCmsHref("/#banca-digital")).toBe(true);
  });

  it("normalizes main-site absolute URLs to internal paths", () => {
    expect(
      getCmsCtaHref("https://unibank.com.pa/personas/otros-servicios/mastercard-black-debito"),
    ).toBe("/personas/otros-servicios/mastercard-black-debito");
  });

  it("filters CTA items without valid links", () => {
    const items = [
      { title: "OK", link: "https://onboard.unibank.com.pa/es/auth/login" },
      {
        title: "WhatsApp",
        link: "https://api.whatsapp.com/send?phone=50763280229&text=%C2%A1Hola!,%20Tengo%20una%20Consulta",
      },
      { title: "Bad", link: "https://play.google.com/store/apps" },
      { title: "Empty" },
    ];

    expect(filterCmsCtaItems(items)).toHaveLength(2);
    expect(filterCmsCtaItems(items).map((item) => item.title)).toEqual(["OK", "WhatsApp"]);
  });
});
