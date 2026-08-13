import { createClient } from "@/lib/supabase/server";
import { listAvailableCars } from "@/lib/cars";
import { SHOWROOM_NAME, waLink } from "@/lib/config";
import Catalog from "@/components/Catalog";
import HeroPanel from "@/components/HeroPanel";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  { label: "Pilihan Favorit", emoji: "⭐" },
  { label: "Mobil Keluarga", emoji: "👨‍👩‍👧‍👦" },
  { label: "KM Rendah", emoji: "📉" },
  { label: "Siap Pakai", emoji: "✅" },
];

const BRANDS = ["Honda", "Toyota", "Suzuki", "Nissan", "Mitsubishi", "Daihatsu", "Mazda", "Hyundai"];

const BODY_TYPES = ["Hatchback", "MPV", "SUV", "Sedan", "Wagon", "Van", "Pickup", "Crossover"];

const BUDGETS = [
  "Di bawah Rp 150 jt",
  "Rp 150–250 jt",
  "Rp 250–350 jt",
  "Di atas Rp 350 jt",
];

const STEPS = [
  { title: "Ajukan", body: "Kirimkan rincian mobil Anda secara online dan jadwalkan inspeksi untuk mengetahui harga mobil Anda." },
  { title: "Cek mobil secara online", body: "Temukan mobil Kempot Certified incaran secara online, lengkap dengan laporan inspeksi." },
  { title: "Test Drive", body: "Jadwalkan test drive gratis, siapkan dokumen dan kami akan menangani sisanya." },
  { title: "Ambil mobil Anda", body: "Pilih untuk mengambil secara langsung di showroom atau kami antar kepada Anda." },
];

export default async function Home() {
  const supabase = await createClient();
  const cars = await listAvailableCars(supabase).catch(() => []);
  const heroCar = cars[0];

  return (
    <main>
      {/* ===== HEADER PUTIH ===== */}
      <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_var(--color-line)]">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <a href="/" className="font-display text-2xl font-black tracking-tight text-navy">
            KEMPOT<span className="text-brand-dark">.</span>
          </a>
          <nav className="hidden gap-6 text-[15px] font-medium text-ink md:flex">
            <a href="#katalog" className="hover:text-navy">Beli Mobil</a>
            <a href="#jual" className="hover:text-navy">Jual Mobil</a>
            <a href="#cara" className="hover:text-navy">Cara Kerja</a>
          </nav>
          <div className="ml-auto flex items-center gap-5">
            <a
              href={waLink(`Halo ${SHOWROOM_NAME}!`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm font-semibold text-navy md:flex"
            >
              📞 Hubungi Kami
            </a>
            <a
              href="/admin"
              className="rounded-lg bg-navy px-4 py-2 text-[13px] font-semibold text-white hover:bg-navy-deep"
            >
              ⚙️ Admin
            </a>
          </div>
        </div>
      </header>

      {/* ===== HERO KUNING ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ffd100] via-[#ffb700] to-[#ff8a3d]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-28 pt-16 md:grid-cols-2 md:pt-20">
          <div>
            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-navy md:text-6xl">
              Jual Beli Mobil Bekas{" "}
              <span className="text-white drop-shadow-[0_2px_0_rgba(18,41,74,.25)]">
                Terpercaya
              </span>
            </h1>
            <p className="mt-4 max-w-md text-[17px] font-medium leading-relaxed text-navy/80">
              Semua unit {SHOWROOM_NAME} lolos inspeksi 175 titik. Harga pasti,
              tanpa biaya tersembunyi.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#katalog"
                className="rounded-xl bg-navy px-7 py-3.5 text-[15px] font-bold text-white hover:bg-navy-deep"
              >
                Cek Mobil →
              </a>
              <a
                href={waLink(`Halo ${SHOWROOM_NAME}, saya mau menawarkan mobil saya untuk dijual.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-navy/25 bg-white/70 px-7 py-3.5 text-[15px] font-bold text-navy backdrop-blur hover:bg-white"
              >
                Jual Mobil Kamu
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            {heroCar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroCar.image_url}
                alt={`${heroCar.brand} ${heroCar.model}`}
                className="w-full rounded-3xl border-4 border-white/60 object-cover shadow-2xl"
                style={{ aspectRatio: "16/9" }}
              />
            ) : (
              <div className="grid aspect-video w-full place-items-center rounded-3xl border-4 border-white/60 bg-white/40 font-display text-5xl">
                🚗
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== PANEL BELI / JUAL (menjorok ke atas hero) ===== */}
      <section className="mx-auto -mt-20 max-w-6xl px-6">
        <HeroPanel brands={[...new Set(cars.map((c) => c.brand))].sort()} />
      </section>

      {/* ===== STRIP KATEGORI / MEREK / TIPE / BUDGET ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <a
              key={c.label}
              href="#katalog"
              className="flex items-center gap-3 rounded-2xl bg-brand p-4 font-display font-extrabold text-navy shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-2xl">{c.emoji}</span> {c.label}
            </a>
          ))}
        </div>

        <div className="mt-10">
          <p className="mb-4 text-sm font-semibold text-ink-soft">
            Temukan Mobil <span className="ml-2 rounded-full bg-brand px-3 py-1 text-xs font-bold text-navy">Kempot Certified</span>
          </p>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {BRANDS.map((b) => (
              <a
                key={b}
                href="#katalog"
                className="rounded-xl border border-line bg-white py-3 text-center text-[13px] font-semibold text-ink transition hover:border-navy hover:shadow-sm"
              >
                {b}
              </a>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-8">
            {BODY_TYPES.map((t) => (
              <a
                key={t}
                href="#katalog"
                className="rounded-xl border border-line bg-white py-3 text-center text-[13px] font-semibold text-ink transition hover:border-navy hover:shadow-sm"
              >
                {t}
              </a>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {BUDGETS.map((b) => (
              <a
                key={b}
                href="#katalog"
                className="rounded-full border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink transition hover:border-navy"
              >
                {b}
              </a>
            ))}
            <a
              href="#katalog"
              className="rounded-full bg-navy px-4 py-2 text-[13px] font-semibold text-white"
            >
              Tampilkan Semua Mobil
            </a>
          </div>
        </div>
      </section>

      {/* ===== LISTING — LATAR NAVY ===== */}
      <section id="katalog" className="mt-16 bg-navy py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight text-white">
                Mobil Kempot Certified
              </h2>
              <p className="mt-1.5 text-sm text-white/60">
                Harga pasti, tanpa biaya tersembunyi. Klik kartu untuk detail.
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white/80">
              {cars.length} unit tersedia
            </span>
          </div>
          <Catalog cars={cars} />
          <p className="mt-8 text-center text-sm text-white/50">
            Kami berjanji memberikan kualitas terbaik melalui mobil Kempot
            Certified untuk para pelanggan.
          </p>
        </div>
      </section>

      {/* ===== CARA JUAL & BELI ===== */}
      <section id="cara" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <span className="mx-auto mb-3 block h-1 w-12 rounded bg-brand" />
          <h2 className="font-display text-3xl font-black tracking-tight text-navy">
            Cara Jual &amp; Beli Mobil
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-line bg-white p-6">
              <span className="font-display mb-4 grid size-10 place-items-center rounded-xl bg-brand text-lg font-black text-navy">
                {i + 1}
              </span>
              <h3 className="font-display mb-2 text-lg font-extrabold text-navy">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== JUAL MOBIL CTA ===== */}
      <section id="jual" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid items-center gap-10 rounded-3xl bg-gradient-to-br from-[#ffd100] to-[#ffb700] p-10 md:grid-cols-2 md:p-14">
          <div>
            <h2 className="font-display text-3xl font-black tracking-tight text-navy">
              Mau jual mobil lamamu?
            </h2>
            <p className="mb-7 mt-3.5 text-[15px] font-medium leading-relaxed text-navy/75">
              Bawa mobilmu ke {SHOWROOM_NAME} untuk inspeksi gratis. Penawaran
              harga tunai dalam 1 jam — kalau cocok, transfer hari itu juga.
            </p>
            <a
              href={waLink(`Halo ${SHOWROOM_NAME}, saya mau menawarkan mobil saya untuk dijual.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-navy px-7 py-3.5 text-[15px] font-bold text-white hover:bg-navy-deep"
            >
              Mulai Disini
            </a>
          </div>
          <ol className="space-y-4">
            {[
              ["Daftarkan mobil", "Lewat WhatsApp atau datang langsung ke showroom."],
              ["Inspeksi gratis", "Teknisi kami cek kondisi unit ±45 menit."],
              ["Terima penawaran", "Harga tunai transparan, tanpa potongan aneh-aneh."],
              ["Transfer hari itu juga", "Deal? Dana langsung cair, dokumen kami urus."],
            ].map(([title, body], i) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="font-display grid size-8 shrink-0 place-items-center rounded-full bg-navy text-sm font-black text-brand">
                  {i + 1}
                </span>
                <div>
                  <b className="block text-[15px] font-bold text-navy">{title}</b>
                  <span className="text-[13px] font-medium text-navy/70">{body}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== FOOTER NAVY ===== */}
      <footer className="bg-navy-deep text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <div className="font-display text-xl font-black">
            KEMPOT<span className="text-brand">.</span>
          </div>
          <small className="text-[13px] text-white/50">
            Jl. Raya Kempot No. 88, Yogyakarta · Buka setiap hari 08.00–17.00 WIB
            <br />© 2026 {SHOWROOM_NAME}. Semua harga tunai.
          </small>
        </div>
      </footer>
    </main>
  );
}
