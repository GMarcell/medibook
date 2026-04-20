import Link from "next/link";
import type { ReactNode } from "react";

const customerLinks = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/book", label: "Booking" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary)] text-sm font-bold text-white">
              MB
            </div>
            <div>
              <p className="heading-font text-lg font-extrabold">MediBook</p>
              <p className="text-xs text-[var(--muted)]">
                Healthcare Appointment Platform
              </p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] md:flex">
            {customerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[var(--primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/login"
              className="hidden rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] sm:inline-flex"
            >
              Admin portal
            </Link>
            <Link
              href="/book"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary-strong)] transition hover:-translate-y-0.5"
            >
              Book now
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
