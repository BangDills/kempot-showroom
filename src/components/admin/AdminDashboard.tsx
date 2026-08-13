"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Car } from "@/lib/types";
import { rupiah, formatKm } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import {
  deleteCar,
  insertCar,
  updateCar,
  uploadCarPhoto,
} from "@/lib/cars";
import CarFormModal from "./CarFormModal";

export default function AdminDashboard({
  initialCars,
  adminEmail,
}: {
  initialCars: Car[];
  adminEmail: string;
}) {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [editing, setEditing] = useState<Car | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  async function handleSave(payload: {
    id?: string;
    fields: Record<string, unknown>;
    photo: File | null;
  }) {
    setBusy(true);
    try {
      const supabase = createClient();
      let imageUrl = payload.fields.image_url as string;
      if (payload.photo) {
        imageUrl = await uploadCarPhoto(supabase, payload.photo);
      }
      const row = { ...payload.fields, image_url: imageUrl };

      if (payload.id) {
        const updated = await updateCar(supabase, payload.id, row);
        setCars((cs) => cs.map((c) => (c.id === payload.id ? updated : c)));
        notify("Perubahan disimpan.");
      } else {
        const inserted = await insertCar(supabase, row as never);
        setCars((cs) => [inserted, ...cs]);
        notify("Mobil ditambahkan ke stok.");
      }
      setFormOpen(false);
      setEditing(null);
    } catch (e) {
      notify("Gagal menyimpan: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleToggleStatus(car: Car) {
    const next = car.status === "tersedia" ? "terjual" : "tersedia";
    setCars((cs) =>
      cs.map((c) => (c.id === car.id ? { ...c, status: next } : c))
    );
    try {
      const supabase = createClient();
      await updateCar(supabase, car.id, { status: next });
      notify(next === "terjual" ? "Ditandai terjual." : "Unit diaktifkan lagi.");
    } catch (e) {
      setCars((cs) =>
        cs.map((c) => (c.id === car.id ? { ...c, status: car.status } : c))
      );
      notify("Gagal mengubah status: " + (e as Error).message);
    }
  }

  async function handleDelete(car: Car) {
    if (
      !confirm(
        `Hapus ${car.brand} ${car.model} ${car.year} dari stok? Ini tidak bisa dibatalkan.`
      )
    )
      return;
    const prev = cars;
    setCars((cs) => cs.filter((c) => c.id !== car.id));
    try {
      const supabase = createClient();
      await deleteCar(supabase, car.id);
      notify("Mobil dihapus.");
    } catch (e) {
      setCars(prev);
      notify("Gagal menghapus: " + (e as Error).message);
    }
  }

  const avail = cars.filter((c) => c.status === "tersedia").length;
  const sold = cars.length - avail;
  const totalValue = cars
    .filter((c) => c.status === "tersedia")
    .reduce((s, c) => s + Number(c.price || 0), 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-7 flex flex-wrap items-center gap-3.5">
        <h1 className="font-display text-3xl font-black tracking-tight">
          Dashboard Admin
        </h1>
        <span className="text-[13px] text-muted">({adminEmail})</span>
        <span className="flex-1" />
        <button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="rounded-lg bg-navy px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-navy-deep"
        >
          + Tambah Mobil
        </button>
        <a
          href="/"
          className="rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold hover:border-ink"
        >
          Lihat Showroom
        </a>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-[13px] font-semibold text-red-700 hover:bg-red-100"
        >
          Keluar
        </button>
      </div>

      <div className="mb-7 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        {[
          ["Unit Tersedia", String(avail)],
          ["Unit Terjual", String(sold)],
          ["Nilai Stok", rupiah(totalValue)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-line bg-white p-5">
            <small className="text-xs uppercase tracking-wider text-muted">{label}</small>
            <b className="font-display mt-1 block text-2xl">{value}</b>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper text-left text-xs uppercase tracking-wider text-muted">
              <th className="px-4 py-3.5">Foto</th>
              <th className="px-4 py-3.5">Mobil</th>
              <th className="hidden px-4 py-3.5 md:table-cell">Harga</th>
              <th className="hidden px-4 py-3.5 md:table-cell">KM</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  Belum ada mobil. Klik &quot;+ Tambah Mobil&quot;.
                </td>
              </tr>
            ) : (
              cars.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image_url}
                      alt=""
                      className="h-12 w-20 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <b>
                      {c.brand} {c.model}
                    </b>
                    <br />
                    <small className="text-muted">
                      {c.year} · {c.transmission} · {c.fuel}
                    </small>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">{rupiah(c.price)}</td>
                  <td className="hidden px-4 py-3 md:table-cell">{formatKm(c.km)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                        c.status === "tersedia"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => {
                          setEditing(c);
                          setFormOpen(true);
                        }}
                        className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-ink"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(c)}
                        className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-ink"
                      >
                        {c.status === "tersedia" ? "Tandai Terjual" : "Aktifkan Lagi"}
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <CarFormModal
          car={editing}
          busy={busy}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white">
          {toast}
        </div>
      )}
    </div>
  );
}
}
    </div>
  );
}
>
  );
}
