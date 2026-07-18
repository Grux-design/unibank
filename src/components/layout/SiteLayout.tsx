import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { CookieBanner } from "@/components/organisms/CookieBanner";
import { ViewportDebugBadge } from "@/components/atoms/ViewportDebugBadge";

export type Lang = "es" | "en";

export function SiteLayout() {
  const [lang, setLang] = useState<Lang>("es");

  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={lang} onToggleLang={() => setLang(lang === "es" ? "en" : "es")} />
      <main id="main-content" className="flex-1 -mt-20">
        <Outlet context={{ lang }} />
      </main>
      <Footer />
      <CookieBanner />
      <ViewportDebugBadge />
    </div>
  );
}
