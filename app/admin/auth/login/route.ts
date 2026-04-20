import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCredentials } from "@/lib/data";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    email !== adminCredentials.email ||
    password !== adminCredentials.password
  ) {
    redirect("/admin/login?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}
