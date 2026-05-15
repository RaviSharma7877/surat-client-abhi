import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getProducts } from "@/lib/data";
import { AdminDashboardClient } from "./dashboard-client";

export default async function AdminDashboardPage() {
  const authed = await getSession();
  if (!authed) redirect("/admin");

  const products = await getProducts();

  return <AdminDashboardClient initialProducts={products} />;
}
