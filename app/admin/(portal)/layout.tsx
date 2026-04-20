import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/auth";

export default async function AdminPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isValidAdminSession(session)) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
