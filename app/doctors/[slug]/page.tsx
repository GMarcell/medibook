import Link from "next/link";
import { notFound } from "next/navigation";
import { doctors } from "@/lib/data";

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const matchingDoctor = doctors.find((entry) => entry.slug === slug);

  if (!matchingDoctor) {
    return notFound();
  }

  const doctor = matchingDoctor;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="surface-card p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
                Doctor profile
              </p>
              <h1 className="heading-font mt-3 text-4xl font-black tracking-[-0.04em]">
                {doctor.name}
              </h1>
              <p className="mt-3 text-lg text-[var(--muted)]">
                {doctor.specialty} in {doctor.location}
              </p>
            </div>
            <div className="rounded-[24px] bg-[var(--surface-muted)] px-5 py-4 text-right">
              <p className="heading-font text-3xl font-black text-[var(--primary)]">
                {doctor.rating.toFixed(1)}
              </p>
              <p className="text-sm text-[var(--muted)]">
                {doctor.reviews} verified reviews
              </p>
            </div>
          </div>
          <p className="mt-8 text-base leading-8 text-[var(--muted)]">
            {doctor.bio}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
                Credentials
              </p>
              <div className="space-y-3 text-sm text-[var(--muted)]">
                {doctor.credentials.map((credential) => (
                  <p key={credential}>{credential}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
                Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language) => (
                  <span
                    key={language}
                    className="rounded-full border border-[var(--line)] px-3 py-2 text-sm text-[var(--muted)]"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
              Care highlights
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {doctor.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[20px] border border-[var(--line)] bg-[var(--surface-muted)] p-4 text-sm text-[var(--muted)]"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="surface-card h-fit p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Availability
          </p>
          <h2 className="heading-font mt-3 text-2xl font-extrabold">
            Next open slots
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Slots use the brief&apos;s interaction style: a clearly-muted disabled
            state and a strong selected state with visual confirmation.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {doctor.slots.map((slot, index) => (
              <div
                key={slot}
                className={`slot-chip rounded-2xl border px-4 py-3 text-center text-sm font-semibold ${
                  index === 2
                    ? "active border-[var(--primary)]"
                    : index === doctor.slots.length - 1
                      ? "cursor-not-allowed border-[var(--line)] bg-[var(--surface-muted)] text-[var(--muted)] opacity-60"
                      : "border-[var(--line)] bg-white text-[var(--foreground)]"
                }`}
              >
                {slot}
              </div>
            ))}
          </div>
          <Link
            href={`/book?doctor=${doctor.slug}`}
            className="mt-8 block rounded-full bg-[var(--accent)] px-5 py-3 text-center font-semibold text-[var(--primary-strong)]"
          >
            Continue to booking
          </Link>
        </aside>
      </div>
    </div>
  );
}
