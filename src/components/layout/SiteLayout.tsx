import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export type Lang = "es" | "en";

export function SiteLayout() {
  const [lang, setLang] = useState<Lang>("es");

  return (
    <div className="site-root">
      <Navbar lang={lang} onToggleLang={() => setLang(lang === "es" ? "en" : "es")} />
      <main id="main-content" className="site-main">
        <Outlet context={{ lang }} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
