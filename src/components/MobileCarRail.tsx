"use client";

import { useState } from "react";
import type { Car } from "@/lib/types";
import { formatKm, rupiah } from "@/lib/types";
import CarDetailModal from "./CarDetailModal";

export default function MobileCarRail({ cars }: { cars: Car[] }) {
  const [selected, setSelected] = useState<Car | null>(null);

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {cars.map((car) => (
          <article
            key={car.id}
            onClick={() => setSelected(car)}
            className="w-[288px] shrink-0 snap-start overflow-hidden rounded-[4px] bg-white shadow-sm md:w-auto"
          >
            <div className="relative h-[172px] bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={car.image_url} alt={`${car.brand} ${car.model}`} className="size-full object-cover" />
              <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[11px] text-white">1/1</span>
              <span className="absolute right-0 top-0 bg-brand px-3 py-2 text-xs font-bold text-white">Harga Tunai</span>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="inline-flex rounded bg-brand/10 px-2 py-1 text-[10px] font-bold uppercase text-brand">Kempot Certified</span>
                <span className="text-xl text-muted">♡</span>
              </div>
              <h3 className="font-display text-[17px] font-bold leading-tight text-ink">
                {car.year} {car.brand}<br />{car.model}
              </h3>
              <p className="mt-1.5 text-xs text-ink-soft">
                {formatKm(car.km)} · {car.transmission} · 📍 {car.location}
              </p>
              <div className="mt-8 font-display text-xl font-black text-price">{rupiah(car.price)}</div>
            </div>
          </article>
        ))}
      </div>
      {selected && <CarDetailModal car={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
