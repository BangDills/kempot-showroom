import { createClient } from "@/lib/supabase/server";
import { listAvailableCars } from "@/lib/cars";
import { SHOWROOM_NAME, waLink } from "@/lib/config";
import Catalog from "@/components/Catalog";
import MobileCarRail from "@/components/MobileCarRail";
import MobileHeader from "@/components/MobileHeader";

export const dynamic = "force-dynamic";

const BRAND_LOGOS = ["Honda", "Toyota", "Suzuki", "Nissan", "Mitsubishi", "Daihatsu"];
const BODY_TYPES = ["Hatchback", "MPV", "SUV", "Sedan", "Wagon", "Pickup"];

export default async function Home() {
  const supabase = await createClient();
  const cars = await listAvailableCars(supabase).catch(() => []);
  const promoCar = cars[3] ?? cars[0];
  const categoryCars = [cars[0], cars[2], cars[4], cars[1]].filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <MobileHeader />

      {/* PROMO BANNER — pendek seperti Carsome mobile */}
      <section className="bg-white px-0 md:px-6 md:pt-5">
        <div className="relative mx-auto h-[126px] max-w-6xl overflow-hidden bg-gradient-to-r from-brand to-navy md:h-[340px] md:rounded-2xl">
          <div className="absolute inset-y-0 left-0 z-10 flex w-[52%] flex-col justify-center pl-5 text-white md:pl-14">
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-white/70 md:text-sm">Kempot Certified</p>
            <h1 className="font-display mt-1 text-[26px] font-black leading-[.92] md:text-6xl">
              SAATNYA<br />GANTI MOBIL!
            </h1>
            <span className="mt-2 text-[11px] font-semibold md:text-base">Harga tunai • tanpa biaya tersembunyi</span>
          </div>
          {promoCar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={promoCar.image_url}
              alt="Promo mobil Kempot Showroom"
              className="absolute -right-8 bottom-0 h-full w-[66%] object-cover [mask-image:linear-gradient(to_right,transparent,black_30%)] md:right-0"
            />
          ) : (
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-6xl">🚙</div>
          )}
          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            <span className="h-1.5 w-5 rounded-full bg-white" />
            <span className="size-1.5 rounded-full bg-white/50" />
            <span className="size-1.5 rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* MOBILE BUY / SELL PANEL */}
      <section className="mx-auto max-w-6xl px-4 pb-5 pt-5 md:px-6">
        <div className="grid grid-cols-2 gap-4">
          <a href="#katalog" className="rounded-[3px] bg-navy py-3 text-center text-[15px] font-bold text-white">Beli Mobil</a>
          <a href="#jual" className="rounded-[3px] bg-brand py-3 text-center text-[15px] font-bold text-white">Jual Mobil Anda</a>
        </div>
        <a href="#katalog" className="mt-4 flex h-11 items-center rounded-[3px] border border-line px-3 text-sm text-muted">
          <span className="mr-2 text-lg">⌕</span> Cari mobil menurut Merek, Model
        </a>

        {/* QUICK CATEGORIES horizontal */}
        <div className="mt-3 flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["Pilihan Favorit", "Mobil Keluarga", "KM Rendah", "Siap Pakai"].map((label, i) => {
            const car = categoryCars[i];
            return (
              <a key={label} href="#katalog" className="relative h-[88px] w-[80px] shrink-0 snap-start overflow-hidden rounded-[3px] bg-brand/10 p-2">
                <b className="relative z-10 block text-[13px] leading-[1.05] text-navy">{label}</b>
                {car && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={car.image_url} alt="" className="absolute bottom-0 right-0 h-12 w-[70px] object-cover [mask-image:linear-gradient(to_top,black_70%,transparent)]" />
                )}
              </a>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-ink-soft">Temukan Mobil</p>
        <div className="mt-2 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand">KEMPOT Certified</span>
          <span className="shrink-0 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700">KEMPOT Value</span>
        </div>

        <div className="mt-4 flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {BRAND_LOGOS.map((b) => (
            <a key={b} href="#katalog" className="w-14 shrink-0 text-center">
              <span className="mx-auto grid size-9 place-items-center rounded-full border border-line bg-white font-display text-sm font-black text-navy">{b[0]}</span>
              <span className="mt-1.5 block text-[11px] text-ink">{b}</span>
            </a>
          ))}
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {BODY_TYPES.map((t) => (
            <a key={t} href="#katalog" className="w-14 shrink-0 text-center">
              <span className="block text-3xl leading-none text-navy">▰</span>
              <span className="mt-1 block text-[11px]">{t}</span>
            </a>
          ))}
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["Di bawah Rp 150 jt", "Rp 150–250 jt", "Rp 250–350 jt", "Di atas Rp 350 jt"].map((b) => (
            <a key={b} href="#katalog" className="shrink-0 rounded-[3px] bg-paper px-3 py-2 text-[11px] text-ink-soft">{b}</a>
          ))}
        </div>

        <div className="mt-4 border border-line bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🚘</span>
            <div>
              <b className="block text-xs text-navy">Lagi cari mobil?</b>
              <p className="text-xs text-ink-soft">Biarkan kami membantu menemukan mobil yang Anda inginkan.</p>
            </div>
          </div>
          <a href="#katalog" className="mt-3 block rounded-[3px] bg-brand py-2.5 text-center text-sm font-bold text-white">Cari Mobil</a>
        </div>

        <a
          href={waLink(`Halo ${SHOWROOM_NAME}, saya mau tukar tambah mobil.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-3 bg-paper p-4 text-xs text-ink-soft"
        >
          <span className="text-3xl">🔄</span>
          <span>Tukar tambah mobil lama Anda dan dapatkan penawaran harga tunai terbaik. <u className="font-bold text-brand">Cari tahu!</u></span>
        </a>
      </section>

      {/* CERTIFIED CAR RAIL */}
      <section className="bg-navy pb-8 pt-6 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="px-4 md:px-0">
            <div className="mx-auto w-fit rounded-full bg-white px-5 py-1.5 text-sm font-bold text-navy">Beli Mobil Kempot Certified</div>
            <ul className="mx-auto mt-5 max-w-sm space-y-2 text-sm">
              {[
                "175 Titik Inspeksi",
                "Harga Pasti, Tidak Ada Biaya Tersembunyi",
                "Garansi 1 Tahun (Mesin, Transmisi, AC)",
                "Jaminan 5 Hari Uang Kembali",
              ].map((x) => <li key={x}>✓ {x}</li>)}
            </ul>
          </div>
          <div className="mt-6"><MobileCarRail cars={cars} /></div>
          <p className="mt-6 px-8 text-center text-xs text-white/45">Kami berjanji memberikan kualitas terbaik melalui mobil Kempot Certified.</p>
        </div>
      </section>

      {/* FULL CATALOG + FILTER DRAWER */}
      <section id="katalog" className="bg-navy-deep py-9 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-xl font-black">Semua Mobil</h2>
          <p className="mt-1 text-xs text-white/60">Gunakan pencarian dan filter untuk menemukan mobil yang tepat.</p>
          <Catalog cars={cars} />
        </div>
      </section>

      {/* CARA KERJA horizontal mobile */}
      <section id="cara" className="bg-paper py-10">
        <div className="mx-auto max-w-6xl">
          <div className="px-4 text-center">
            <span className="mx-auto mb-3 block h-1 w-8 bg-brand" />
            <h2 className="font-display text-[22px] font-black text-navy">Cara Jual &amp; Beli Mobil</h2>
            <div className="mt-6 flex justify-center gap-7 border-b border-line text-sm font-semibold text-muted">
              <span className="pb-3">Cara Membeli</span>
              <span className="border-b-2 border-brand pb-3 text-navy">Cara Menjual</span>
            </div>
          </div>
          <div className="mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              ["Ajukan", "Kirimkan rincian mobil dan jadwalkan inspeksi."],
              ["Inspeksi", "Teknisi kami memeriksa kondisi mobil Anda."],
              ["Penawaran", "Terima harga tunai yang transparan."],
              ["Pembayaran", "Dana cair dan dokumen kami urus."],
            ].map(([title, body], i) => (
              <article key={title} className="relative w-[248px] shrink-0 snap-start bg-white p-4 shadow-sm">
                <span className="absolute right-0 top-0 bg-brand px-4 py-2 font-display text-lg font-black text-white">{i + 1}</span>
                <div className="mb-4 h-24 bg-gradient-to-br from-brand/10 to-paper" />
                <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="jual" className="bg-brand px-5 py-9 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-black">Mau jual mobil?</h2>
          <p className="mt-2 text-sm text-white/85">Inspeksi gratis, penawaran tunai, tanpa repot.</p>
          <a href={waLink(`Halo ${SHOWROOM_NAME}, saya mau menjual mobil.`)} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-[3px] bg-white py-3 text-center text-sm font-bold text-navy">Mulai Disini</a>
        </div>
      </section>

      <footer className="bg-navy-deep px-5 py-8 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="font-display text-xl font-black">KEMPOT<span className="text-brand">.</span></div>
          <p className="mt-3 text-xs leading-relaxed text-white/50">Jl. Raya Kempot No. 88, Yogyakarta<br />Buka setiap hari 08.00–17.00 WIB</p>
        </div>
      </footer>
    </main>
  );
}
