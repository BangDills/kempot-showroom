"use client";

import { useEffect, useMemo, useState } from "react";
import type { Car } from "@/lib/types";
import CarCard from "./CarCard";
import CarDetailModal from "./CarDetailModal";

export default function Catalog({ cars }: { cars: Car[] }) {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");
  const [trans, setTrans] = useState("");
  const [price, setPrice] = useState("");
  const [selected, setSelected] = useState<Car | null>(null);

  // Tampilkan kata kunci dari panel hero (/?q=...#katalog).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("q");
    if (initial) setQ(initial);
  }, []);

  const brands = useMemo(
    () => [...new Set(cars.map((c) => c.brand))].sort(),
    [cars]
  );

  const list = useMemo(() => {
    let out = cars;
    const needle = q.trim().toLowerCase();
    if (needle)
      out = out.filter((c) =>
        `${c.brand} ${c.model}`.toLowerCase().includes(needle)
      );
    if (brand) out = out.filter((c) => c.brand === brand);
    if (trans) out = out.filter((c) => c.transmission === trans);
    if (price) {
      const [lo, hi] = price.split("-").map(Number);
      out = out.filter((c) => c.price >= lo && c.price < hi);
    }
    return out;
  }, [cars, q, brand, trans, price]);

  const inputCls =
    "rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-brand";

  return (
    <div className="mt-6">
      <div className="mb-6 flex flex-wrap items-center gap-2.5">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔍 Cari merk / model…"
          className={`${inputCls} w-full sm:w-72`}
        />
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className={`${inputCls} [&>option]:text-ink`}>
          <option value="">Semua Merk</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select value={trans} onChange={(e) => setTrans(e.target.value)} className={`${inputCls} [&>option]:text-ink`}>
          <option value="">Semua Transmisi</option>
          <option>Automatic</option>
          <option>Manual</option>
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)} className={`${inputCls} [&>option]:text-ink`}>
          <option value="">Semua Harga</option>
          <option value="0-200000000">&lt; Rp 200 jt</option>
          <option value="200000000-350000000">Rp 200–350 jt</option>
          <option value="350000000-999999999999">&gt; Rp 350 jt</option>
        </select>
        <span className="ml-auto text-[13px] font-medium text-white/60">
          {list.length} unit tersedia
        </span>
      </div>

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

      {selected && (
        <CarDetailModal car={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
