import Link from "next/link";
import type { ReactNode } from "react";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin#calendar", label: "Calendar" },
  { href: "/admin#doctors", label: "Doctors" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f6ef]">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-[var(--line)] bg-[var(--primary)] px-6 py-8 text-white">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-sm font-bold">
              MB
            </div>
            <div>
              <p className="heading-font text-lg font-extrabold">MediBook Admin</p>
              <p className="text-xs text-white/70">Clinic operations center</p>
            </div>
          </Link>
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Admin menu
            </p>
            <nav className="mt-4 flex flex-col gap-2">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-10 rounded-[24px] border border-white/12 bg-white/6 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Signed in
            </p>
            <p className="mt-3 text-base font-semibold">admin@medibook.dev</p>
            <p className="mt-1 text-sm text-white/70">
              Manage all doctors and schedules from one calendar.
            </p>
            <form action="/admin/auth/logout" method="post" className="mt-5">
              <button className="w-full rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--primary-strong)]">
                Log out
              </button>
            </form>
          </div>
        </aside>
        <div className="min-w-0">
          <header className="border-b border-[var(--line)] bg-white/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
                  Admin workspace
                </p>
                <h1 className="heading-font mt-2 text-2xl font-extrabold text-[var(--foreground)]">
                  Doctor calendar and clinic operations
                </h1>
              </div>
              <Link
                href="/"
                className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--muted)]"
              >
                Back to customer site
              </Link>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
