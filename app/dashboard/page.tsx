import { patientAppointments } from "@/lib/data";
import { PatientAppointments } from "@/components/patient-appointments";

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
      <PatientAppointments appointments={patientAppointments} />
    </div>
  );
}
