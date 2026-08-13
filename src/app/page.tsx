import { createClient } from "@/lib/supabase/server";
import { listAvailableCars } from "@/lib/cars";
import { SHOWROOM_NAME, waLink } from "@/lib/config";
import Catalog from "@/components/Catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const cars = await listAvailableCars(supabase).catch(() => []);

  return (
    <main>
      {/* TOPBAR */}
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-6 py-3.5">
          <a href="/" className="flex items-center gap-2.5 font-display text-xl font-black tracking-tight">
            <span className="grid size-9 place-items-center rounded-xl bg-ink text-lg text-orange-brand">K</span>
            <span>
              Kempot <em className="not-italic text-orange-brand">Showroom</em>
            </span>
          </a>
          <nav className="ml-3 hidden gap-5 text-sm font-medium text-ink-soft md:flex">
            <a href="#katalog" className="hover:text-ink">Katalog</a>
            <a href="#kenapa" className="hover:text-ink">Kenapa Kami</a>
            <a href="#jual" className="hover:text-ink">Jual Mobil</a>
          </nav>
          <a
            href="/admin"
            className="ml-auto rounded-lg border border-line px-3.5 py-2 text-[13px] font-semibold hover:border-ink"
          >
            ⚙️ Admin
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-12 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <span className="mb-5 inline-block rounded-full bg-orange-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[2px] text-orange-brand">
            ● Mobil Bekas Terpercaya
          </span>
          <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Mobil bekas <em className="not-italic text-orange-brand">berkualitas</em>, harga jujur.
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            Setiap unit di {SHOWROOM_NAME} sudah lolos inspeksi 175 titik oleh
            teknisi berpengalaman. Harga tunai transparan — tanpa biaya
            tersembunyi, tanpa drama.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#katalog"
              className="rounded-xl bg-orange-brand px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-orange-dark"
            >
              Lihat Stok Mobil →
            </a>
            <a
              href={waLink(`Halo ${SHOWROOM_NAME}, saya mau menawarkan mobil saya untuk dijual.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-line px-6 py-3.5 text-[15px] font-semibold hover:border-ink"
            >
              Jual Mobil Kamu
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-3.5">
            {[
              ["175 titik", "Inspeksi menyeluruh tiap unit"],
              ["Garansi 1 th", "Mesin & transmisi*"],
              ["7 hari", "Garansi uang kembali*"],
              ["Harga tunai", "Transparan, tanpa markup"],
            ].map(([big, small]) => (
              <div key={big} className="rounded-2xl border border-line bg-white p-5">
                <b className="font-display block text-xl">{big}</b>
                <span className="text-[13px] text-muted">{small}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATALOG */}
      <section id="katalog" className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        <h2 className="font-display text-3xl font-black tracking-tight">Stok Tersedia</h2>
        <p className="mt-1.5 text-sm text-muted">
          Semua harga tunai &amp; sudah termasuk inspeksi. Klik kartu untuk detail.
        </p>
        <Catalog cars={cars} />
      </section>

      {/* KENAPA KAMI */}
      <section id="kenapa" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="font-display text-3xl font-black tracking-tight">Kenapa beli di Kempot?</h2>
        <p className="mb-8 mt-2 max-w-xl text-[15px] text-muted">
          Kami tahu beli mobil bekas itu penuh was-was. Makanya setiap unit kami
          perlakukan seperti mau dipakai keluarga sendiri.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["🔍", "Inspeksi 175 Titik", "Mesin, transmisi, kaki-kaki, bodi, hingga elektronik dicek teknisi bersertifikat."],
            ["📜", "Dokumen Dijamin Asli", "BPKB, STNK, dan faktur diverifikasi. Bebas sengketa, tabrakan besar, dan banjir."],
            ["🛡️", "Garansi 1 Tahun", "Garansi mesin & transmisi untuk unit tertentu, plus jaminan 7 hari uang kembali."],
            ["💸", "Harga Tunai Jujur", "Satu harga, langsung terlihat. Tanpa biaya admin siluman, tanpa negosiasi melelahkan."],
          ].map(([icon, title, body]) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-6">
              <div className="mb-3.5 grid size-11 place-items-center rounded-xl bg-orange-brand/10 text-xl">{icon}</div>
              <h3 className="font-display mb-2 text-[17px] font-extrabold">{title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JUAL MOBIL */}
      <section id="jual" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid items-center gap-10 rounded-3xl bg-ink p-10 text-white md:grid-cols-[1.2fr_.8fr] md:p-14">
          <div>
            <h2 className="font-display text-3xl font-black tracking-tight">Mau jual mobil lamamu?</h2>
            <p className="mb-7 mt-3.5 text-[15px] leading-relaxed text-white/60">
              Bawa mobilmu ke {SHOWROOM_NAME} untuk inspeksi gratis. Kami beri
              penawaran harga tunai dalam 1 jam — kalau cocok, langsung transfer
              hari itu juga.
            </p>
            <a
              href={waLink(`Halo ${SHOWROOM_NAME}, saya mau menawarkan mobil saya untuk dijual.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-green-wa px-6 py-3.5 text-[15px] font-semibold text-white hover:brightness-110"
            >
              Chat WhatsApp Kami
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
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-brand text-sm font-extrabold">
                  {i + 1}
                </span>
                <div>
                  <b className="block text-[15px]">{title}</b>
                  <span className="text-[13px] text-white/60">{body}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-9">
          <div className="flex items-center gap-2.5 font-display text-lg font-black">
            <span className="grid size-8 place-items-center rounded-lg bg-ink text-orange-brand">K</span>
            Kempot <em className="not-italic text-orange-brand">Showroom</em>
          </div>
          <small className="text-[13px] text-muted">
            Jl. Raya Kempot No. 88, Yogyakarta · Buka setiap hari 08.00–17.00 WIB
            <br />© 2026 {SHOWROOM_NAME}. *S&amp;K garansi berlaku.
          </small>
        </div>
      </footer>
    </main>
  );
}
