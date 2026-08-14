"use client";

import { useEffect, useMemo, useState } from "react";
import type { Car } from "@/lib/types";
import CarCard from "./CarCard";
import CarDetailModal from "./CarDetailModal";
import FilterDrawer, { FilterState, EMPTY_FILTER } from "./FilterDrawer";

const PRICE_OPTS = [
  { label: "Semua Harga", value: "" },
  { label: "< Rp 200 jt", value: "0-200000000" },
  { label: "Rp 200–350 jt", value: "200000000-350000000" },
  { label: "> Rp 350 jt", value: "350000000-999999999999" },
];

export default function Catalog({ cars }: { cars: Car[] }) {
  const [q, setQ] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filter, setFilter] = useState<FilterState>(EMPTY_FILTER);
  const [selected, setSelected] = useState<Car | null>(null);

  // Kata kunci dari panel hero (/?q=...#katalog)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("q");
    if (initial) setQ(initial);
  }, []);

  const brands = useMemo(
    () => [...new Set(cars.map((c) => c.brand))].sort(),
    [cars]
  );
  const years = useMemo(
    () => [...new Set(cars.map((c) => c.year))].sort((a, b) => b - a),
    [cars]
  );
  const locations = useMemo(
    () => [...new Set(cars.map((c) => c.location).filter(Boolean))].sort(),
    [cars]
  );

  const list = useMemo(() => {
    let out = cars;
    const needle = q.trim().toLowerCase();
    if (needle)
      out = out.filter((c) =>
        `${c.brand} ${c.model}`.toLowerCase().includes(needle)
      );
    if (filter.brand) out = out.filter((c) => c.brand === filter.brand);
    if (filter.transmission)
      out = out.filter((c) => c.transmission === filter.transmission);
    if (filter.fuel) out = out.filter((c) => c.fuel === filter.fuel);
    if (filter.year) out = out.filter((c) => c.year === Number(filter.year));
    if (filter.location) out = out.filter((c) => c.location === filter.location);
    if (filter.price) {
      const [lo, hi] = filter.price.split("-").map(Number);
      out = out.filter((c) => c.price >= lo && c.price < hi);
    }
    if (filter.maxKm) out = out.filter((c) => c.km <= Number(filter.maxKm));
    return out;
  }, [cars, q, filter]);

  const activeCount =
    (filter.brand ? 1 : 0) +
    (filter.transmission ? 1 : 0) +
    (filter.fuel ? 1 : 0) +
    (filter.year ? 1 : 0) +
    (filter.location ? 1 : 0) +
    (filter.price ? 1 : 0) +
    (filter.maxKm ? 1 : 0);

  const toolbarInput =
    "rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-brand";

  return (
    <div className="mt-6">
      {/* ===== TOOLBAR ATAS ala Carsome ===== */}
      <div className="mb-5">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari mobil menurut Merek, Model, atau Kata Kunci"
          className={`${toolbarInput} mb-3 w-full`}
        />
        <div className="flex flex-wrap items-center gap-2">
          {/* Chip filter cepat (membuka drawer ke bagian terkait) */}
          <button onClick={() => setDrawerOpen(true)} className="rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-white/20">
            Merek &amp; Model
          </button>
          <button onClick={() => setDrawerOpen(true)} className="rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-white/20">
            Tahun
          </button>
          <button onClick={() => setDrawerOpen(true)} className="rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-white/20">
            Transmisi
          </button>
          <button onClick={() => setDrawerOpen(true)} className="rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-white/20">
            Harga
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg bg-brand px-3.5 py-2 text-[13px] font-bold text-white hover:bg-brand-dark"
          >
            Semua Filter {activeCount > 0 && `(${activeCount})`} ▾
          </button>
          <span className="ml-auto text-[13px] font-medium text-white/60">
            {list.length} unit tersedia
          </span>
        </div>
      </div>

      {/* ===== HASIL ===== */}
      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/25 bg-white/5 px-6 py-16 text-center text-[15px] text-white/60">
          Tidak ada mobil yang cocok dengan filter. Coba longgarkan pencariannya,
          atau tanya stok lain lewat WhatsApp.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((car) => (
            <CarCard key={car.id} car={car} onOpen={() => setSelected(car)} />
          ))}
        </div>
      )}

      {/* ===== DRAWER FILTER (geser dari kanan, mobile & desktop) ===== */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        value={filter}
        onChange={setFilter}
        resultCount={list.length}
        brands={brands}
        years={years}
        locations={locations}
        priceOptions={PRICE_OPTS}
      />

      {selected && (
        <CarDetailModal car={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
