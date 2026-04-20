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
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--surface-muted) font-semibold text-(--primary)">
            {getInitials(doctor.name)}
          </div>
          <div>
            <p className="heading-font text-xl font-extrabold">{doctor.name}</p>
            <p className="text-sm text-(--muted)">
              {doctor.specialty} · {doctor.experience}
            </p>
          </div>
        </div>
        <div className="rounded-full bg-(--accent-soft) px-3 py-1 text-xs font-semibold text-(--primary)">
          {doctor.rating.toFixed(1)} / 5
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-(--muted)">{doctor.bio}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {doctor.highlights.map((highlight) => (
          <span
            key={highlight}
            className="rounded-full border border-(--line) bg-white px-3 py-1 text-xs text-(--muted)"
          >
            {highlight}
          </span>
        ))}
      </div>
      <div className="mt-6 grid gap-3 rounded-[20px] bg-(--surface-muted) p-4 text-sm text-(--muted)">
        <div className="flex items-center justify-between">
          <span>Location</span>
          <span className="font-medium text-(--foreground)">
            {doctor.location}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Next availability</span>
          <span className="font-medium text-(--foreground)">
            {doctor.nextAvailable}
          </span>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <Link
          href={`/doctors/${doctor.slug}`}
          className="flex-1 rounded-full border border-(--line) px-4 py-3 text-center text-sm font-semibold text-(--foreground) transition hover:border-(--primary)"
        >
          View profile
        </Link>
        <Link
          href={`/book?doctor=${doctor.slug}`}
          className="flex-1 rounded-full bg-(--primary) px-4 py-3 text-center text-sm font-semibold text-white! transition hover:bg-(--primary-strong)"
        >
          Book slot
        </Link>
      </div>
    </article>
  );
}
