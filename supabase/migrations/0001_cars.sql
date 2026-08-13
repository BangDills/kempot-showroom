-- Kempot Showroom: migrasi awal
-- Jalankan di Supabase -> SQL Editor (atau `supabase db push`).

-- ============ TABEL CARS ============
create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model text not null,
  year integer not null check (year between 1950 and 2100),
  price bigint not null check (price >= 0),
  km integer not null default 0 check (km >= 0),
  transmission text not null default 'Manual',
  fuel text not null default 'Bensin',
  color text not null default '',
  location text not null default '',
  badge text not null default 'Lolos Inspeksi 175 Titik',
  description text not null default '',
  image_url text not null default '',
  status text not null default 'tersedia' check (status in ('tersedia', 'terjual')),
  created_at timestamptz not null default now()
);

create index if not exists cars_status_idx on public.cars (status);
create index if not exists cars_brand_idx on public.cars (brand);
create index if not exists cars_price_idx on public.cars (price);

-- ============ ROW LEVEL SECURITY ============
alter table public.cars enable row level security;

-- Publik boleh membaca SEMUA baris (katalog publik);
-- storefront sendiri yang memfilter status = 'tersedia'.
create policy "cars_select_public"
  on public.cars for select
  using (true);

-- Hanya user terautentikasi (admin) yang boleh menulis.
create policy "cars_insert_admin"
  on public.cars for insert
  to authenticated
  with check (true);

create policy "cars_update_admin"
  on public.cars for update
  to authenticated
  using (true)
  with check (true);

create policy "cars_delete_admin"
  on public.cars for delete
  to authenticated
  using (true);

-- ============ STORAGE: bucket foto mobil ============
insert into storage.buckets (id, name, public)
values ('car-photos', 'car-photos', true)
on conflict (id) do nothing;

-- Publik boleh membaca foto.
create policy "car_photos_public_read"
  on storage.objects for select
  using (bucket_id = 'car-photos');

-- Hanya admin (authenticated) yang boleh upload/ubah/hapus foto.
create policy "car_photos_admin_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'car-photos');

create policy "car_photos_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'car-photos')
  with check (bucket_id = 'car-photos');

create policy "car_photos_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'car-photos');
