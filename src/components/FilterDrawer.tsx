"use client";

import { useEffect, useState } from "react";

export interface FilterState {
  brand: string;
  transmission: string;
  fuel: string;
  year: string;
  location: string;
  price: string;
  maxKm: string;
}

export const EMPTY_FILTER: FilterState = {
  brand: "",
  transmission: "",
  fuel: "",
  year: "",
  location: "",
  price: "",
  maxKm: "",
};

const SECTIONS = [
  { key: "brand", label: "Merek & Model" },
  { key: "price", label: "Harga" },
  { key: "year", label: "Tahun" },
  { key: "transmission", label: "Transmisi" },
  { key: "fuel", label: "Bahan Bakar" },
  { key: "maxKm", label: "Jarak Tempuh" },
  { key: "location", label: "Lokasi" },
] as const;

export default function FilterDrawer({
  open,
  onClose,
  value,
  onChange,
  resultCount,
  brands,
  years,
  locations,
  priceOptions,
}: {
  open: boolean;
  onClose: () => void;
  value: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
  brands: string[];
  years: number[];
  locations: string[];
  priceOptions: { label: string; value: string }[];
}) {
  const [draft, setDraft] = useState<FilterState>(value);
  const [section, setSection] = useState<string>("brand");

  // Sinkronkan draft saat drawer dibuka
  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  // Kunci scroll body saat drawer terbuka + tutup dengan Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function setField(k: keyof FilterState, v: string) {
    setDraft((d) => ({ ...d, [k]: d[k] === v ? "" : v }));
  }

  function apply() {
    onChange(draft);
    onClose();
  }

  function reset() {
    setDraft(EMPTY_FILTER);
  }

  const opt = (
    current: string,
    val: string,
    label: string
  ) => (
    <button
      key={val + label}
      type="button"
      onClick={() => setField(section as keyof FilterState, val)}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        current === val
          ? "border-brand bg-brand text-white"
          : "border-line bg-white text-ink hover:border-brand"
      }`}
    >
      {label}
    </button>
  );

  function renderSection() {
    switch (section) {
      case "brand":
        return (
          <div className="flex flex-wrap gap-2">
            {opt(draft.brand, "", "Semua Merek")}
            {brands.map((b) => opt(draft.brand, b, b))}
          </div>
        );
      case "price":
        return (
          <div className="flex flex-wrap gap-2">
            {priceOptions.map((p) => opt(draft.price, p.value, p.label))}
          </div>
        );
      case "year":
        return (
          <div className="flex flex-wrap gap-2">
            {opt(draft.year, "", "Semua Tahun")}
            {years.map((y) => opt(draft.year, String(y), String(y)))}
          </div>
        );
      case "transmission":
        return (
          <div className="flex flex-wrap gap-2">
            {opt(draft.transmission, "", "Semua")}
            {opt(draft.transmission, "Automatic", "Automatic")}
            {opt(draft.transmission, "Manual", "Manual")}
          </div>
        );
      case "fuel":
        return (
          <div className="flex flex-wrap gap-2">
            {opt(draft.fuel, "", "Semua")}
            {["Bensin", "Diesel", "Hybrid", "Listrik"].map((f) =>
              opt(draft.fuel, f, f)
            )}
          </div>
        );
      case "maxKm":
        return (
          <div className="flex flex-wrap gap-2">
            {opt(draft.maxKm, "", "Semua")}
            {opt(draft.maxKm, "30000", "< 30.000 km")}
            {opt(draft.maxKm, "50000", "< 50.000 km")}
            {opt(draft.maxKm, "80000", "< 80.000 km")}
            {opt(draft.maxKm, "120000", "< 120.000 km")}
          </div>
        );
      case "location":
        return (
          <div className="flex flex-wrap gap-2">
            {opt(draft.location, "", "Semua Lokasi")}
            {locations.map((l) => opt(draft.location, l, l))}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-navy-deep/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* drawer geser dari kanan */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Semua Filter"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h3 className="font-display text-lg font-black text-navy">
            Semua Filter
          </h3>
          <button
            onClick={onClose}
            aria-label="Tutup filter"
            className="grid size-9 place-items-center rounded-full text-xl text-muted hover:bg-paper"
          >
            ✕
          </button>
        </div>

        {/* body: kategori kiri + konten kanan */}
        <div className="flex min-h-0 flex-1">
          <nav className="w-40 shrink-0 overflow-y-auto border-r border-line">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                className={`relative block w-full px-4 py-3.5 text-left text-[13.5px] font-medium transition ${
                  section === s.key
                    ? "bg-white font-bold text-navy"
                    : "bg-paper text-ink-soft hover:bg-white"
                }`}
              >
                {section === s.key && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-brand" />
                )}
                {s.label}
              </button>
            ))}
          </nav>
          <div className="flex-1 overflow-y-auto p-5">{renderSection()}</div>
        </div>

        {/* footer */}
        <div className="flex gap-3 border-t border-line p-4">
          <button
            onClick={reset}
            className="flex-1 rounded-xl border border-line py-3 text-sm font-semibold text-ink hover:border-navy"
          >
            Reset
          </button>
          <button
            onClick={apply}
            className="flex-[1.4] rounded-xl bg-navy py-3 text-sm font-bold text-white hover:bg-navy-deep"
          >
            Terapkan ( {resultCount} Mobil )
          </button>
        </div>
      </aside>
    </>
  );
}
