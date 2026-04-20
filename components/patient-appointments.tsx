"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/lib/booking-context";
import { useToast } from "@/lib/toast-context";
import type { Appointment } from "@/lib/types";

export function PatientAppointments({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const router = useRouter();
  const { setBookingDetails, clearBookingSelection } = useBooking();
  const { showToast } = useToast();
  const [loadingAppointmentId, setLoadingAppointmentId] = useState("");

  async function handleCancel(appointment: Appointment) {
    if (loadingAppointmentId) {
      return;
    }

    setLoadingAppointmentId(appointment.id);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 900);
    });

    clearBookingSelection();
    showToast({
      title: "Visit cancelled",
      description: `${appointment.doctor} on ${appointment.date} at ${appointment.time} was cancelled.`,
    });
    router.push("/");
  }

  return (
    <div className="mt-10 grid gap-6">
      {appointments.map((appointment) => {
        const isCancelling = loadingAppointmentId === appointment.id;

        return (
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
              <button
                type="button"
                onClick={() => {
                  setBookingDetails({
                    doctorSlug: appointment.doctorSlug,
                    date: appointment.date,
                    slot: appointment.time,
                  });
                  router.push(`/book?doctor=${appointment.doctorSlug}`);
                }}
                className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white"
              >
                Reschedule
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => handleCancel(appointment)}
                className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isCancelling ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="loading-dot h-4 w-4 rounded-full border-2 border-[var(--primary)] border-t-transparent" />
                    Cancelling...
                  </span>
                ) : (
                  "Cancel visit"
                )}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
