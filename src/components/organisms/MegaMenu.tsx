import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        position: "absolute", left: 0, right: 0, top: "100%", zIndex: 40,
        background: "#ffffff", borderTop: "1px solid #E0DDD9",
        borderBottom: "1px solid #E0DDD9",
        boxShadow: "0 8px 32px -4px rgba(28,25,23,0.12)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <MegaMenuTabBar activeTab={activeTab} onTabChange={setActiveTab} />

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
            <MegaMenuFeaturedCard data={data} onClose={onClose} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
