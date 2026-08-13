"use client";

import { useEffect } from "react";
import type { Car } from "@/lib/types";
import { rupiah, formatKm } from "@/lib/types";
import { waLink, waCarText } from "@/lib/config";

export default function CarDetailModal({
  car,
  onClose,
}: {
  car: Car;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const specs: [string, string][] = [
    ["Tahun", String(car.year)],
    ["Kilometer", formatKm(car.km)],
    ["Transmisi", car.transmission],
    ["Bahan Bakar", car.fuel],
    ["Warna", car.color],
    ["Lokasi", car.location],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-5 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.image_url}
          alt={`${car.brand} ${car.model}`}
          className="h-72 w-full rounded-t-3xl object-cover"
        />
        <div className="p-7">
          <span className="mb-2.5 inline-block rounded-lg bg-ink/85 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
            {car.badge || "Lolos Inspeksi"}
          </span>
          <h3 className="font-display text-2xl font-black tracking-tight">
            {car.brand} {car.model} {car.year}
          </h3>
          <div className="my-4 font-display text-3xl font-black text-orange-brand">
            {rupiah(car.price)}
          </div>
          <div className="mb-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {specs.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-line bg-paper p-3">
                <small className="mb-0.5 block text-[11px] uppercase tracking-wider text-muted">
                  {label}
                </small>
                <b className="text-sm">{value || "—"}</b>
              </div>
            ))}
          </div>
          <p className="mb-6 text-sm leading-relaxed text-ink-soft">
            {car.description || "Hubungi kami untuk informasi lengkap unit ini."}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={waLink(waCarText(car))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl bg-green-wa py-3.5 text-center text-[15px] font-semibold text-white hover:brightness-110"
            >
              💬 Tanya Unit Ini via WhatsApp
            </a>
            <button
              onClick={onClose}
              className="rounded-xl border border-line px-6 py-3.5 text-[15px] font-semibold hover:border-ink"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
