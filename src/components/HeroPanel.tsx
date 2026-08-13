"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { waLink, SHOWROOM_NAME } from "@/lib/config";

export default function HeroPanel({ brands }: { brands: string[] }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const inputCls =
    "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-navy";

  function goCatalog(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    const qs = params.toString();
    router.push(qs ? `/?${qs}#katalog` : "/#katalog");
  }

  return (
    <div className="grid overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
      {/* BELI MOBIL */}
      <form onSubmit={goCatalog} className="border-b border-line p-6 md:border-b-0 md:border-r md:p-8">
        <h3 className="font-display mb-5 flex items-center gap-1.5 text-xl font-black text-navy">
          Beli Mobil <span aria-hidden>›</span>
        </h3>
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari mobil menurut Merek, Model, atau Kata Kunci"
          className={`${inputCls} mb-4`}
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-navy py-3 text-[15px] font-bold text-white hover:bg-navy-deep"
        >
          Cari Mobil
        </button>
        <p className="mt-4 text-center text-xs text-muted">
          Semua unit bergaransi &amp; lolos inspeksi 175 titik
        </p>
      </form>

      {/* JUAL MOBIL */}
      <div className="p-6 md:p-8">
        <h3 className="font-display mb-5 flex items-center gap-1.5 text-xl font-black text-navy">
          Jual Mobil Anda <span aria-hidden>›</span>
        </h3>
        <div className="space-y-3">
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className={inputCls}>
            <option value="">Pilih Merek Mobil</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select value={model} onChange={(e) => setModel(e.target.value)} className={inputCls}>
            <option value="">Pilih Model Mobil</option>
            <option>Model akan dikonfirmasi saat inspeksi</option>
          </select>
          <a
            href={waLink(
              `Halo ${SHOWROOM_NAME}, saya mau jual mobil ${brand || "(merek)"} ${model || ""}. Mohon jadwalkan inspeksi.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-brand py-3 text-center text-[15px] font-bold text-navy hover:bg-brand-dark"
          >
            Mulai Disini
          </a>
          <p className="text-center text-xs text-muted">
            Dengan melanjutkan, Anda setuju dengan Kebijakan Privasi &amp; Ketentuan Penggunaan.
          </p>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
          {[
            ["🔧", "Inspeksi 30–45 mnt"],
            ["⚡", "Pembayaran 24 jam*"],
            ["🤝", "Tanpa repot"],
          ].map(([icon, label]) => (
            <div key={label} className="text-[11px] font-semibold text-ink-soft">
              <div className="mb-1 text-lg">{icon}</div>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
