import Link from "next/link";
import { BookingSteps } from "@/components/booking-steps";
import { DoctorCard } from "@/components/doctor-card";
import { SectionHeading } from "@/components/section-heading";
import { adminStats, doctors, specialties } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden">
        <div className="hero-orb -left-10 top-14 h-44 w-44 bg-(--accent)" />
        <div className="hero-orb right-12 top-24 h-56 w-56 bg-[rgba(26,92,42,0.16)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex rounded-full border border-(--line) bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--primary)">
              Trusted clinical booking, designed mobile first
            </div>
            <h1 className="heading-font mt-6 max-w-3xl text-5xl font-black leading-none tracking-[-0.05em] text-(--foreground) sm:text-6xl">
              Book the right doctor in under a minute.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-(--muted)">
              Search by specialty, compare real-time availability, and move from
              symptom to confirmed appointment with a calm, trustworthy
              experience.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/doctors"
                className="rounded-full bg-(--primary) px-6 py-3 text-center font-semibold text-white! transition hover:bg-(--primary-strong)"
              >
                Explore doctors
              </Link>
              <Link
                href="/book"
                className="rounded-full border border-(--line) bg-white px-6 py-3 text-center font-semibold text-(--foreground) transition hover:border-(--primary)"
              >
                Start booking flow
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {adminStats.map((stat) => (
                <div key={stat.label} className="surface-card p-5">
                  <p className="heading-font text-3xl font-black text-(--primary)">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-(--foreground)">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm text-(--muted)">{stat.caption}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card soft-grid relative p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--primary)">
                  Search snapshot
                </p>
                <h2 className="heading-font mt-2 text-2xl font-extrabold">
                  Find care by specialty
                </h2>
              </div>
              <div className="rounded-full bg-(--accent) px-3 py-2 text-xs font-semibold text-(--primary-strong)">
                24+ screens
              </div>
            </div>
            <div className="mt-8 rounded-[28px] border border-(--line) bg-white p-5">
              <div className="grid gap-3">
                <input
                  readOnly
                  value="Chest pain, routine check-up, skin concern..."
                  className="rounded-2xl border border-(--line) bg-(--surface-muted) px-4 py-3 text-sm text-(--muted)"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    defaultValue="Cardiology"
                    className="rounded-2xl border border-(--line) bg-white px-4 py-3 text-sm"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty}>{specialty}</option>
                    ))}
                  </select>
                  <select
                    defaultValue="Jakarta"
                    className="rounded-2xl border border-(--line) bg-white px-4 py-3 text-sm"
                  >
                    <option>Jakarta</option>
                    <option>Bandung</option>
                    <option>Surabaya</option>
                  </select>
                </div>
                <button className="rounded-2xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white">
                  Search 120 available doctors
                </button>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {doctors.slice(0, 2).map((doctor) => (
                <div
                  key={doctor.id}
                  className="rounded-3xl border border-(--line) bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="heading-font text-xl font-extrabold">
                        {doctor.name}
                      </p>
                      <p className="text-sm text-(--muted)">
                        {doctor.specialty} · {doctor.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-(--accent-soft) px-3 py-1 text-xs font-semibold text-(--primary)">
                      {doctor.nextAvailable}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured doctors"
          title="Specialists patients can trust"
          description="Each card surfaces the information patients care about most first: specialty, experience, next available slot, and clinical confidence signals."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <BookingSteps />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-card p-8">
            <SectionHeading
              eyebrow="Built for operations"
              title="Patient, doctor, and admin views in one platform"
              description="MediBook is shaped around the requirement brief: a patient booking flow, schedule management for doctors, and a clinic-wide operations dashboard."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Patient dashboard with cancellation and reschedule actions",
              "Doctor availability calendar with slot health indicators",
              "Admin metrics for staffing, capacity, and no-show monitoring",
              "Accessible, mobile-first forms with clear error boundaries",
            ].map((item) => (
              <div
                key={item}
                className="surface-card flex items-center rounded-3xl p-6 text-base font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
