import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { MegaMenuColumn } from "@/components/molecules/MegaMenuColumn";

type Lang = "es" | "en";

interface MegaMenuProps {
  lang: Lang;
  onClose: () => void;
}

const menuData = {
  personas: {
    columns: [
      {
        heading: { es: "Cuentas", en: "Accounts" },
        items: [
          { label: { es: "Cuenta de Ahorros", en: "Savings Account" }, href: "/cuentas/ahorros" },
          { label: { es: "Cuenta Corriente", en: "Checking Account" }, href: "/cuentas/corriente" },
          { label: { es: "Cuenta en USD", en: "USD Account" }, href: "/cuentas/usd" },
        ],
      },
      {
        heading: { es: "Crédito", en: "Credit" },
        items: [
          { label: { es: "Crédito Personal", en: "Personal Loan" }, href: "/credito/personal" },
          { label: { es: "Crédito Hipotecario", en: "Mortgage" }, href: "/credito/hipotecario" },
          { label: { es: "Crédito Auto", en: "Auto Loan" }, href: "/credito/auto" },
        ],
      },
      {
        heading: { es: "Tarjetas", en: "Cards" },
        items: [
          { label: { es: "Tarjeta de Crédito", en: "Credit Card" }, href: "/tarjetas/credito" },
          { label: { es: "Tarjeta de Débito", en: "Debit Card" }, href: "/tarjetas/debito" },
          { label: { es: "Tarjeta Prepagada", en: "Prepaid Card" }, href: "/tarjetas/prepagada" },
        ],
      },
      {
        heading: { es: "Canales Digitales", en: "Digital Channels" },
        items: [
          { label: { es: "Banca en Línea", en: "Online Banking" }, href: "/digital/banca-linea" },
          { label: { es: "App Móvil", en: "Mobile App" }, href: "/digital/app" },
          { label: { es: "UniBot", en: "UniBot" }, href: "/digital/unibot" },
        ],
      },
    ],
  },
  empresas: {
    columns: [
      {
        heading: { es: "Cuentas Empresariales", en: "Business Accounts" },
        items: [
          { label: { es: "Cuenta Corriente", en: "Checking Account" }, href: "/empresas/cuenta-corriente" },
          { label: { es: "Cuenta Jurídica", en: "Legal Entity Account" }, href: "/empresas/cuenta-juridica" },
        ],
      },
      {
        heading: { es: "Financiamiento", en: "Financing" },
        items: [
          { label: { es: "UniLeasing", en: "UniLeasing" }, href: "/empresas/leasing" },
          { label: { es: "Crédito Empresarial", en: "Business Loan" }, href: "/empresas/credito" },
          { label: { es: "Línea de Crédito", en: "Credit Line" }, href: "/empresas/linea-credito" },
        ],
      },
      {
        heading: { es: "Inversiones", en: "Investments" },
        items: [
          { label: { es: "Plazo Fijo", en: "Fixed Term" }, href: "/inversiones/plazo-fijo" },
          { label: { es: "Fondos de Inversión", en: "Investment Funds" }, href: "/inversiones/fondos" },
        ],
      },
      {
        heading: { es: "Canales Digitales", en: "Digital Channels" },
        items: [
          { label: { es: "Banca Empresarial", en: "Business Banking" }, href: "/empresas/digital" },
          { label: { es: "Pagos en Línea", en: "Online Payments" }, href: "/empresas/pagos" },
        ],
      },
    ],
  },
};

const secondaryLinks = {
  es: [
    { label: "Sobre UniBank", href: "/about" },
    { label: "Tarifas", href: "/tarifas" },
    { label: "Sucursales", href: "/sucursales" },
    { label: "Contacto", href: "/contact" },
  ],
  en: [
    { label: "About UniBank", href: "/about" },
    { label: "Rates", href: "/tarifas" },
    { label: "Branches", href: "/sucursales" },
    { label: "Contact", href: "/contact" },
  ],
};

export function MegaMenu({ lang, onClose }: MegaMenuProps) {
  const tabs = [
    { key: "personas" as const, label: lang === "es" ? "Personas" : "Personal" },
    { key: "empresas" as const, label: lang === "es" ? "Empresas" : "Business" },
  ] as const;

  const activeTab = tabs[0].key; // We'll use local state in Header

  return (
    <MegaMenuInner lang={lang} onClose={onClose} />
  );
}

// Inner component with its own tab state
function MegaMenuInner({ lang, onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<"personas" | "empresas">("personas");
  const columns = menuData[activeTab].columns;

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 border-t border-border bg-background shadow-xl"
      role="navigation"
      aria-label={lang === "es" ? "Menú principal" : "Main menu"}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-8">
        {/* Tab row + close */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 rounded-full bg-muted p-1">
            {(["personas", "empresas"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                aria-pressed={activeTab === tab}
              >
                {tab === "personas"
                  ? lang === "es" ? "Personas" : "Personal"
                  : lang === "es" ? "Empresas" : "Business"}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Columns grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {columns.map((col, i) => (
            <MegaMenuColumn
              key={i}
              heading={col.heading[lang]}
              items={col.items.map((item) => ({
                label: item.label[lang],
                href: item.href,
              }))}
            />
          ))}
        </div>

        {/* Secondary links */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5">
          {secondaryLinks[lang].map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className="text-xs font-semibold uppercase tracking-wider text-foreground/50 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
