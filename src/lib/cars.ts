import type { Car, CarInsert, CarUpdate } from "./types";
import { STORAGE_BUCKET } from "./config";

// Dipakai baik di server component (storefront) maupun client (admin).
// Terima SupabaseClient dari pemanggil agar context auth-nya benar.
type SupabaseLike = {
  from: (table: string) => any;
  storage: {
    from: (bucket: string) => {
      upload: (
        path: string,
        file: File | Blob,
        options?: { contentType?: string; upsert?: boolean }
      ) => Promise<{ data: { path: string } | null; error: { message: string } | null }>;
      getPublicUrl: (path: string) => { data: { publicUrl: string } };
      remove: (paths: string[]) => Promise<unknown>;
    };
  };
};

export async function listAvailableCars(supabase: SupabaseLike): Promise<Car[]> {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("status", "tersedia")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Car[];
}

export async function listAllCars(supabase: SupabaseLike): Promise<Car[]> {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Car[];
}

export async function insertCar(
  supabase: SupabaseLike,
  car: CarInsert
): Promise<Car> {
  const { data, error } = await supabase
    .from("cars")
    .insert(car)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Car;
}

export async function updateCar(
  supabase: SupabaseLike,
  id: string,
  patch: CarUpdate
): Promise<Car> {
  const { data, error } = await supabase
    .from("cars")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Car;
}

export async function deleteCar(
  supabase: SupabaseLike,
  id: string
): Promise<void> {
  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function uploadCarPhoto(
  supabase: SupabaseLike,
  file: File
): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeExt = ["jpg", "jpeg", "png", "webp", "avif"].includes(ext)
    ? ext
    : "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { contentType: file.type || "image/jpeg" });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
