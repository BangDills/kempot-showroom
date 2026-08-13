export type CarStatus = "tersedia" | "terjual";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
  transmission: string;
  fuel: string;
  color: string;
  location: string;
  badge: string;
  description: string;
  image_url: string;
  status: CarStatus;
  created_at: string;
}

export type CarInsert = Omit<Car, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type CarUpdate = Partial<CarInsert>;

export const rupiah = (n: number): string =>
  "Rp " + Number(n).toLocaleString("id-ID");

export const formatKm = (n: number): string =>
  Number(n).toLocaleString("id-ID") + " km";
