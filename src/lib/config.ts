export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "6281234567890";

export const SHOWROOM_NAME =
  process.env.NEXT_PUBLIC_SHOWROOM_NAME ?? "Kempot Showroom";

export const STORAGE_BUCKET = "car-photos";

export function waLink(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function waCarText(car: {
  brand: string;
  model: string;
  year: number;
  price: number;
}): string {
  return `Halo ${SHOWROOM_NAME}, saya tertarik dengan ${car.brand} ${car.model} ${car.year} (Rp ${Number(car.price).toLocaleString("id-ID")}). Apakah unit masih tersedia?`;
}
