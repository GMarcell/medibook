import Link from "next/link";
import type { Doctor } from "@/lib/types";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="surface-card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-muted)] font-semibold text-[var(--primary)]">
            {getInitials(doctor.name)}
          </div>
          <div>
            <p className="heading-font text-xl font-extrabold">{doctor.name}</p>
            <p className="text-sm text-[var(--muted)]">
              {doctor.specialty} · {doctor.experience}
            </p>
          </div>
        </div>
        <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
          {doctor.rating.toFixed(1)} / 5
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-[var(--muted)]">{doctor.bio}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {doctor.highlights.map((highlight) => (
          <span
            key={highlight}
            className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs text-[var(--muted)]"
          >
            {highlight}
          </span>
        ))}
      </div>
      <div className="mt-6 grid gap-3 rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm text-[var(--muted)]">
        <div className="flex items-center justify-between">
          <span>Location</span>
          <span className="font-medium text-[var(--foreground)]">
            {doctor.location}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Next availability</span>
          <span className="font-medium text-[var(--foreground)]">
            {doctor.nextAvailable}
          </span>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <Link
          href={`/doctors/${doctor.slug}`}
          className="flex-1 rounded-full border border-[var(--line)] px-4 py-3 text-center text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]"
        >
          View profile
        </Link>
        <Link
          href={`/book?doctor=${doctor.slug}`}
          className="flex-1 rounded-full bg-[var(--primary)] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)]"
        >
          Book slot
        </Link>
      </div>
    </article>
  );
}
