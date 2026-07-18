import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./App.css";
import "./styles/wow.css";
import { dismissSplashBoot, shouldPlaySplashBoot } from "@/lib/splashBoot";

// Non-home routes never mount IntroSplash — remove the static boot overlay immediately.
if (!shouldPlaySplashBoot()) {
  dismissSplashBoot();
} else {
  // Safety net if React splash fails to mount
  window.setTimeout(dismissSplashBoot, 4500);
}

createRoot(document.getElementById("root")!).render(<App />);
