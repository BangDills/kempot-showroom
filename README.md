# Kempot Showroom

Web showroom mobil bekas: katalog publik + dashboard admin untuk mengatur stok.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Supabase: Postgres (tabel `cars`), Auth (login admin email+password), Storage (foto mobil)
- Deploy: Coolify (atau platform Node apa pun)

## Menjalankan lokal

```bash
npm ci
cp .env.example .env.local   # isi kredensial Supabase
npm run dev
```

## Setup Supabase (sekali saja)

1. Buat project di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, jalankan isi `supabase/migrations/0001_cars.sql`
   (membuat tabel `cars`, kebijakan RLS, dan bucket Storage `car-photos`).
3. Buka **Authentication → Users → Add user**, buat akun admin (email + password).
4. Ambil kredensial di **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Isi env di atas ke `.env.local` (lokal) dan ke environment Coolify (produksi).
   Opsional: `NEXT_PUBLIC_WA_NUMBER`, `NEXT_PUBLIC_SHOWROOM_NAME`.

## Struktur

- `/` — storefront publik (katalog, filter, detail, tombol WhatsApp)
- `/admin/login` — login admin (Supabase Auth)
- `/admin` — dashboard: statistik, tambah/edit/hapus mobil, upload foto, tandai terjual

Proteksi: RLS membatasi insert/update/delete hanya untuk user terautentikasi;
`src/proxy.ts` mengalihkan `/admin` ke login bila belum masuk.
