import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/organisms/Header";
import { Footer } from "./Footer";

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
    </div>
  );
}
