import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCredentials } from "@/lib/data";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/auth";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (isValidAdminSession(session)) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl items-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="surface-card p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Admin authentication
          </p>
          <h1 className="heading-font mt-3 text-4xl font-black tracking-[-0.04em]">
            Secure access for clinic staff
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
            This admin login is separated from the patient experience and gates
            the operations workspace behind a session cookie.
          </p>

          <form
            action="/admin/auth/login"
            method="post"
            className="mt-8 grid gap-4"
          >
            <input
              name="email"
              type="email"
              placeholder="Admin email"
              defaultValue={adminCredentials.email}
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              defaultValue={adminCredentials.password}
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
            />
            {error === "invalid" ? (
              <p className="rounded-2xl border border-[#f2c7c7] bg-[#fff2f2] px-4 py-3 text-sm text-[#8a3030]">
                Invalid admin email or password.
              </p>
            ) : null}
            <button className="rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white">
              Sign in to admin
            </button>
          </form>

          <div className="mt-6 rounded-[24px] bg-[var(--surface-muted)] p-5 text-sm text-[var(--muted)]">
            <p className="font-semibold text-[var(--foreground)]">Demo access</p>
            <p className="mt-2">Email: {adminCredentials.email}</p>
            <p>Password: {adminCredentials.password}</p>
          </div>
        </section>

        <aside className="surface-card soft-grid relative overflow-hidden p-8 sm:p-10">
          <div className="hero-orb left-10 top-12 h-32 w-32 bg-[var(--accent)]" />
          <div className="hero-orb bottom-10 right-8 h-44 w-44 bg-[rgba(26,92,42,0.14)]" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Workspace split
          </p>
          <h2 className="heading-font mt-3 text-3xl font-black tracking-[-0.04em]">
            Admin and customer menus are now separate
          </h2>
          <div className="mt-8 grid gap-4">
            {[
              "Customer menu stays focused on discovery, booking, and patient history.",
              "Admin navigation lives in a dedicated protected sidebar.",
              "Calendar view consolidates schedules across all doctors in one place.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[var(--line)] bg-white/90 p-5 text-sm leading-6 text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
          >
            Back to customer site
          </Link>
        </aside>
      </div>
    </div>
  );
}
