import { DoctorCard } from "@/components/doctor-card";
import { SectionHeading } from "@/components/section-heading";
import { doctors, specialties } from "@/lib/data";

export const metadata = {
  title: "Doctor Listing",
};

export default function DoctorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Doctor directory"
        title="Search by specialty, location, or availability"
        description="This listing view reflects the brief with quick filters, accessible card layout, and clear booking entry points."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="surface-card h-fit p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Filters
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
                Specialty
              </p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-2 text-xs text-[var(--muted)]"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
                Location
              </p>
              <div className="space-y-2 text-sm text-[var(--muted)]">
                <p>Central Jakarta</p>
                <p>South Jakarta</p>
                <p>West Jakarta</p>
                <p>North Jakarta</p>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
                Rating
              </p>
              <p className="text-sm text-[var(--muted)]">4.7 and above</p>
            </div>
          </div>
        </aside>
        <div className="grid gap-6 xl:grid-cols-2">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}
