import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminLoginClient } from "./login-client";

export default async function AdminLoginPage() {
  const authed = await getSession();
  if (authed) redirect("/admin/dashboard");

  return <AdminLoginClient />;
}
