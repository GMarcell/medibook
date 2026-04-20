import { AdminCalendar } from "@/components/admin-calendar";
import { adminStats, doctorRoster } from "@/lib/data";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminPage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {adminStats.map((stat) => (
          <div key={stat.label} className="surface-card p-6">
            <p className="heading-font text-4xl font-black text-[var(--primary)]">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-semibold">{stat.label}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{stat.caption}</p>
          </div>
        ))}
      </div>

      <div className="mt-8" id="calendar">
        <AdminCalendar />
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]" id="doctors">
        <section className="surface-card p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
                Doctor management
              </p>
              <h2 className="heading-font mt-3 text-2xl font-extrabold">
                Roster health and fill rate
              </h2>
            </div>
            <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary-strong)]">
              Add doctor
            </button>
          </div>
          <div className="mt-8 space-y-4">
            {doctorRoster.map((doctor) => (
              <div
                key={doctor.name}
                className="grid gap-4 rounded-[24px] border border-[var(--line)] p-5 md:grid-cols-[1fr_auto_auto]"
              >
                <div>
                  <p className="heading-font text-xl font-extrabold">
                    {doctor.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Slot fill rate: {doctor.fillRate}
                  </p>
                </div>
                <div className="rounded-full bg-[var(--surface-muted)] px-4 py-2 text-sm font-semibold text-[var(--muted)]">
                  {doctor.status}
                </div>
                <button className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold">
                  Manage slots
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="surface-card h-fit p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Calendar summary
          </p>
          <h2 className="heading-font mt-3 text-2xl font-extrabold">
            What this view gives admins
          </h2>
          <div className="mt-8 space-y-4">
            {[
              "See every doctor schedule in one weekly calendar instead of opening each profile one by one.",
              "Track clashes and room usage faster with time-blocked event cards.",
              "Keep the public patient experience separate from staff-only operations.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] p-5 text-sm leading-6 text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
