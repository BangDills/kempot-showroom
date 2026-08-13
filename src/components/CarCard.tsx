"use client";

import { useState } from "react";
import type { Car } from "@/lib/types";
import { rupiah, formatKm } from "@/lib/types";
import { waLink, waCarText } from "@/lib/config";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="#e4e8ef"/><text x="50%" y="50%" font-family="sans-serif" font-size="28" fill="#93a0b4" text-anchor="middle" dy=".3em">Foto tidak tersedia</text></svg>`
  );

export default function CarCard({
  car,
  onOpen,
}: {
  car: Car;
  onOpen: () => void;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <article
      onClick={onOpen}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
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
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-navy">
            🚗 {car.badge || "Kempot Certified"}
          </span>
          <button
            aria-label="Simpan ke favorit"
            onClick={(e) => {
              e.stopPropagation();
              setLiked((v) => !v);
            }}
            className="text-lg leading-none text-muted transition hover:text-price"
          >
            {liked ? "❤️" : "🤍"}
          </button>
        </div>
        <h3 className="font-display text-[16px] font-extrabold tracking-tight text-ink">
          {car.year} {car.brand}
          <br />
          {car.model}
        </h3>
        <p className="text-[12.5px] text-muted">
          {formatKm(car.km)} · {car.transmission}
          {car.location ? ` · 📍 ${car.location}` : ""}
        </p>
        <div className="mt-auto pt-2">
          <div className="font-display text-[19px] font-black tracking-tight text-price">
            {rupiah(car.price)}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="flex-1 rounded-lg border border-line py-2 text-[13px] font-semibold text-ink hover:border-navy"
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
      </div>
    </article>
  );
}
