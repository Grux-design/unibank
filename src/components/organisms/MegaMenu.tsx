import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { personasData, empresasData } from "@/data/megaMenuData";
import { MegaMenuTabBar }       from "@/components/molecules/MegaMenuTabBar";
import { MegaMenuCategoryGrid } from "@/components/molecules/MegaMenuCategoryGrid";
import { MegaMenuFeaturedCard } from "@/components/molecules/MegaMenuFeaturedCard";

type Tab = "personas" | "empresas";

interface MegaMenuProps { onClose: () => void }

export function MegaMenu({ onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<Tab>("personas");
  const data       = activeTab === "personas" ? personasData : empresasData;
  const isPersonas = activeTab === "personas";
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      animate={prefersReduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
      exit={prefersReduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      transition={
        prefersReduced
          ? { duration: 0.2 }
          : { duration: 0.34, ease: [0.32, 0.72, 0, 1] }
      }
      style={{
        position: "absolute", left: 0, right: 0, top: "100%", zIndex: 40,
        background: "#ffffff",
        borderBottom: "1px solid #E0DDD9",
        boxShadow: "none",
        overflow: "hidden",
        willChange: prefersReduced ? undefined : "clip-path",
      }}
    >
      <div className="site-container-nav">
        <MegaMenuTabBar activeTab={activeTab} onTabChange={setActiveTab} />

        <div style={{ borderTop: "1px solid #E8E4E0" }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: isPersonas ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isPersonas ? 10 : -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ display: "flex", gap: 0, padding: "24px 0" }}
          >
            <MegaMenuCategoryGrid data={data} isPersonas={isPersonas} onClose={onClose} />

            {/* Vertical divider */}
            <div style={{ width: 1, background: "#E8E4E0", flexShrink: 0, marginLeft: 24, marginRight: 24 }} />

            <MegaMenuFeaturedCard data={data} isPersonas={isPersonas} onClose={onClose} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
