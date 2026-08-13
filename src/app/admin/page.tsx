import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listAllCars } from "@/lib/cars";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const cars = await listAllCars(supabase).catch(() => []);

  return <AdminDashboard initialCars={cars} adminEmail={user.email ?? ""} />;
}
