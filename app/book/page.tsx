import { doctors } from "@/lib/data";

export const metadata = {
  title: "Booking Flow",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string }>;
}) {
  const { doctor: doctorSlug } = await searchParams;
  const selectedDoctor =
    doctors.find((entry) => entry.slug === doctorSlug) ?? doctors[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="surface-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Step 1 of 3
          </p>
          <h1 className="heading-font mt-3 text-4xl font-black tracking-[-0.04em]">
            Select your appointment slot
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
            The booking UI mirrors the requirement brief: date and time first,
            patient information second, and confirmation last.
          </p>
          <div className="mt-8 flex gap-3">
            {["Date & time", "Patient info", "Confirm"].map((step, index) => (
              <div
                key={step}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  index === 0
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--surface-muted)] text-[var(--muted)]"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="step-panel mt-8 grid gap-6 rounded-[28px] border border-[var(--line)] bg-[var(--surface-muted)] p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {["18 Apr", "19 Apr", "20 Apr"].map((day, index) => (
                <button
                  key={day}
                  className={`rounded-[20px] border px-4 py-4 text-left ${
                    index === 0
                      ? "border-[var(--primary)] bg-white"
                      : "border-[var(--line)] bg-transparent"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    2026
                  </p>
                  <p className="heading-font mt-2 text-2xl font-black">{day}</p>
                </button>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {selectedDoctor.slots.map((slot, index) => (
                <button
                  key={slot}
                  className={`slot-chip rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    index === 1
                      ? "active border-[var(--primary)]"
                      : "border-[var(--line)] bg-white"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="surface-card h-fit p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Booking summary
          </p>
          <h2 className="heading-font mt-3 text-2xl font-extrabold">
            {selectedDoctor.name}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {selectedDoctor.specialty} · {selectedDoctor.location}
          </p>
          <div className="mt-6 space-y-4 rounded-[24px] bg-[var(--surface-muted)] p-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Chosen time</span>
              <span className="font-semibold text-[var(--foreground)]">11:30</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Patient</span>
              <span className="font-semibold text-[var(--foreground)]">
                Alex Morgan
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Visit type</span>
              <span className="font-semibold text-[var(--foreground)]">
                First consultation
              </span>
            </div>
          </div>
          <form className="mt-6 grid gap-4">
            <input
              defaultValue="Alex Morgan"
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
            />
            <input
              defaultValue="alex@example.com"
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
            />
            <textarea
              defaultValue="Mild chest discomfort after exercise."
              rows={4}
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
            />
            <button className="rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--primary-strong)]">
              Continue to confirmation
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
