"use client";

import { useEffect, useState } from "react";
import type { Car } from "@/lib/types";

const BADGES = [
  "Lolos Inspeksi 175 Titik",
  "Unit Unggulan",
  "Baru Masuk",
  "Harga Turun",
];

export default function CarFormModal({
  car,
  busy,
  onClose,
  onSave,
}: {
  car: Car | null;
  busy: boolean;
  onClose: () => void;
  onSave: (payload: {
    id?: string;
    fields: Record<string, unknown>;
    photo: File | null;
  }) => void;
}) {
  const [form, setForm] = useState({
    brand: car?.brand ?? "",
    model: car?.model ?? "",
    year: car?.year?.toString() ?? "",
    price: car?.price?.toString() ?? "",
    km: car?.km?.toString() ?? "0",
    transmission: car?.transmission ?? "Manual",
    fuel: car?.fuel ?? "Bensin",
    color: car?.color ?? "",
    location: car?.location ?? "",
    badge: car?.badge ?? BADGES[0],
    description: car?.description ?? "",
    image_url: car?.image_url ?? "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(car?.image_url ?? "");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function set(k: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.brand || !form.model || !form.year || !form.price) {
      alert("Lengkapi kolom wajib: merk, model, tahun, harga.");
      return;
    }
    if (!photo && !form.image_url) {
      alert("Pilih foto mobil (upload file atau isi URL).");
      return;
    }
    onSave({
      id: car?.id,
      photo,
      fields: {
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: Number(form.year),
        price: Number(form.price),
        km: Number(form.km || 0),
        transmission: form.transmission,
        fuel: form.fuel,
        color: form.color.trim(),
        location: form.location.trim(),
        badge: form.badge,
        description: form.description.trim(),
        image_url: form.image_url.trim(),
        status: car?.status ?? "tersedia",
      },
    });
  }

  const inputCls =
    "w-full rounded-[10px] border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy";
  const labelCls =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-5 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-7"
      >
        <h3 className="font-display mb-5 text-[22px] font-black">
          {car ? "Edit Mobil" : "Tambah Mobil"}
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Merk *</label>
            <input className={inputCls} value={form.brand} onChange={set("brand")} placeholder="Toyota" />
          </div>
          <div>
            <label className={labelCls}>Model *</label>
            <input className={inputCls} value={form.model} onChange={set("model")} placeholder="Avanza 1.5 G CVT" />
          </div>
          <div>
            <label className={labelCls}>Tahun *</label>
            <input className={inputCls} type="number" value={form.year} onChange={set("year")} placeholder="2021" />
          </div>
          <div>
            <label className={labelCls}>Harga (Rp) *</label>
            <input className={inputCls} type="number" value={form.price} onChange={set("price")} placeholder="215000000" />
          </div>
          <div>
            <label className={labelCls}>Kilometer</label>
            <input className={inputCls} type="number" value={form.km} onChange={set("km")} placeholder="34000" />
          </div>
          <div>
            <label className={labelCls}>Warna</label>
            <input className={inputCls} value={form.color} onChange={set("color")} placeholder="Silver" />
          </div>
          <div>
            <label className={labelCls}>Transmisi</label>
            <select className={inputCls} value={form.transmission} onChange={set("transmission")}>
              <option>Manual</option>
              <option>Automatic</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Bahan Bakar</label>
            <select className={inputCls} value={form.fuel} onChange={set("fuel")}>
              <option>Bensin</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Listrik</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Lokasi</label>
            <input className={inputCls} value={form.location} onChange={set("location")} placeholder="Yogyakarta" />
          </div>
          <div>
            <label className={labelCls}>Badge</label>
            <select className={inputCls} value={form.badge} onChange={set("badge")}>
              {BADGES.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Foto Mobil *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-4 file:py-2.5 file:text-[13px] file:font-semibold file:text-white hover:file:bg-black"
            />
            <p className="mt-1.5 text-xs text-muted">
              Upload file (disimpan ke Supabase Storage), atau tempel URL di bawah:
            </p>
            <input
              className={`${inputCls} mt-2`}
              value={form.image_url}
              onChange={set("image_url")}
              placeholder="https://…jpg (opsional jika upload file)"
            />
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Pratinjau foto"
                className="mt-3 h-36 w-full rounded-xl object-cover"
              />
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Deskripsi</label>
            <textarea
              className={inputCls}
              rows={3}
              value={form.description}
              onChange={set("description")}
              placeholder="Kondisi, riwayat servis, kelengkapan…"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-line py-3 text-sm font-semibold hover:border-ink"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={busy}
            className="flex-1 rounded-xl bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-deep disabled:opacity-60"
          >
            {busy ? "Menyimpan…" : car ? "Simpan Perubahan" : "Tambah ke Stok"}
          </button>
        </div>
      </form>
    </div>
  );
}
