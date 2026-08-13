"use client";

import type { Car } from "@/lib/types";
import { rupiah, formatKm } from "@/lib/types";
import { waLink, waCarText } from "@/lib/config";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="#e6e0d8"/><text x="50%" y="50%" font-family="sans-serif" font-size="28" fill="#8a8378" text-anchor="middle" dy=".3em">Foto tidak tersedia</text></svg>`
  );

export default function CarCard({
  car,
  onOpen,
}: {
  car: Car;
  onOpen: () => void;
}) {
  return (
    <article
      onClick={onOpen}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden bg-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.image_url || FALLBACK}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK;
          }}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-ink/85 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
          {car.badge || "Lolos Inspeksi"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4.5">
        <h3 className="font-display text-[17px] font-extrabold tracking-tight">
          {car.brand} {car.model} {car.year}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {[formatKm(car.km), car.transmission, car.fuel, `📍 ${car.location}`]
            .filter(Boolean)
            .map((s) => (
              <span
                key={s}
                className="rounded-md border border-line bg-paper px-2 py-1 text-xs text-ink-soft"
              >
                {s}
              </span>
            ))}
        </div>
        <div className="mt-auto pt-1 font-display text-[22px] font-black tracking-tight text-orange-brand">
          {rupiah(car.price)}
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="flex-1 rounded-lg border border-line py-2 text-[13px] font-semibold hover:border-ink"
          >
            Detail
          </button>
          <a
            href={waLink(waCarText(car))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 rounded-lg bg-green-wa py-2 text-center text-[13px] font-semibold text-white hover:brightness-110"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
