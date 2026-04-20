import { patientAppointments } from "@/lib/data";

export const metadata = {
  title: "Patient Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Patient dashboard
          </p>
          <h1 className="heading-font mt-3 text-4xl font-black tracking-[-0.04em]">
            Upcoming and past appointments
          </h1>
        </div>
        <div className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary-strong)]">
          JWT session ready
        </div>
      </div>
      <div className="mt-10 grid gap-6">
        {patientAppointments.map((appointment) => (
          <article
            key={appointment.id}
            className="surface-card grid gap-6 p-6 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="heading-font text-2xl font-extrabold">
                  {appointment.doctor}
                </h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    appointment.status === "Upcoming"
                      ? "bg-[var(--accent-soft)] text-[var(--primary)]"
                      : appointment.status === "Completed"
                        ? "bg-[var(--surface-muted)] text-[var(--muted)]"
                        : "bg-[#fff4d7] text-[#7e5a00]"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {appointment.specialty} · {appointment.location}
              </p>
              <div className="mt-5 flex flex-wrap gap-6 text-sm text-[var(--muted)]">
                <span>Date: {appointment.date}</span>
                <span>Time: {appointment.time}</span>
                <span>Booking ID: {appointment.id}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white">
                Reschedule
              </button>
              <button className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--foreground)]">
                Cancel visit
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
