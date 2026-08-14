"use client";

import { useEffect, useState } from "react";
import { waLink, SHOWROOM_NAME } from "@/lib/config";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4 md:h-[68px] md:px-6">
          <button
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
            className="mr-3 grid size-8 place-items-center text-xl text-navy md:hidden"
          >
            ☰
          </button>
          <a href="/" className="font-display text-xl font-black tracking-tight text-navy md:text-2xl">
            KEMPOT<span className="text-brand">.</span>
          </a>
          <nav className="ml-8 hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#katalog">Beli Mobil</a>
            <a href="#jual">Jual Mobil</a>
            <a href="#cara">Cara Kerja</a>
          </nav>
          <a
            href={waLink(`Halo ${SHOWROOM_NAME}!`)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto hidden text-sm font-semibold text-navy sm:block"
          >
            ☎ Hubungi Kami
          </a>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-navy-deep/60 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[82%] max-w-xs flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-line px-5">
          <span className="font-display text-xl font-black text-navy">
            KEMPOT<span className="text-brand">.</span>
          </span>
          <button onClick={() => setOpen(false)} className="grid size-9 place-items-center text-xl text-muted">✕</button>
        </div>
        <nav className="flex flex-col py-3 text-[15px] font-semibold text-ink">
          {[
            ["Beli Mobil", "#katalog"],
            ["Jual Mobil", "#jual"],
            ["Cara Jual & Beli", "#cara"],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} className="border-b border-line px-5 py-4">
              {label} <span className="float-right text-muted">›</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto border-t border-line p-5">
          <a
            href={waLink(`Halo ${SHOWROOM_NAME}!`)}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-brand py-3 text-center text-sm font-bold text-white"
          >
            Hubungi WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
