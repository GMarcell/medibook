"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminCalendar } from "@/lib/admin-calendar-context";
import { useBooking } from "@/lib/booking-context";
import { useDoctorDirectory } from "@/lib/doctor-directory-context";
import { useToast } from "@/lib/toast-context";
import type { Specialty } from "@/lib/types";

const bookingDates = [
  { label: "20 Apr", year: "2026", full: "20 Apr 2026" },
  { label: "21 Apr", year: "2026", full: "21 Apr 2026" },
  { label: "22 Apr", year: "2026", full: "22 Apr 2026" },
  { label: "23 Apr", year: "2026", full: "23 Apr 2026" },
  { label: "24 Apr", year: "2026", full: "24 Apr 2026" },
];

const specialtyPresentation: Record<
  Specialty,
  { tone: "forest" | "lime" | "sage" | "gold"; room: string }
> = {
  Cardiology: { tone: "forest", room: "Room A1" },
  Dermatology: { tone: "sage", room: "Room B3" },
  Neurology: { tone: "forest", room: "Room E1" },
  Pediatrics: { tone: "lime", room: "Room C2" },
  Orthopedics: { tone: "gold", room: "Room D1" },
};

function formatBookingDate(date: string) {
  const [day, month, year] = date.split(" ");

  if (!day || !month || !year) {
    return null;
  }

  return {
    label: `${day} ${month}`,
    year,
    full: date,
  };
}

function getCalendarDayKey(date: string) {
  const [day, month, year] = date.split(" ");
  const monthIndex = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  }[month ?? ""];

  if (!day || monthIndex === undefined || !year) {
    return null;
  }

  const parsedDate = new Date(
    Date.UTC(Number(year), monthIndex, Number(day)),
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  const weekday = parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "UTC",
  });

  return weekday === "Mon" ||
    weekday === "Tue" ||
    weekday === "Wed" ||
    weekday === "Thu" ||
    weekday === "Fri"
    ? weekday
    : null;
}

function getEndTime(start: string) {
  const [hour, minute] = start.split(":").map(Number);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return start;
  }

  const date = new Date(Date.UTC(2026, 3, 20, hour, minute));
  date.setUTCMinutes(date.getUTCMinutes() + 60);

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
}

export function BookingFlow({
  doctorSlug,
}: {
  doctorSlug?: string;
}) {
  const router = useRouter();
  const { doctors } = useDoctorDirectory();
  const {
    selectedDoctorSlug,
    selectedDate,
    selectedSlot,
    setSelectedDoctorSlug,
    setSelectedDate,
    setSelectedSlot,
    setBookingSelection,
    clearBookingSelection,
  } = useBooking();
  const { showToast } = useToast();
  const { addCalendarEvent } = useAdminCalendar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientName, setPatientName] = useState("Alex Morgan");
  const [patientEmail, setPatientEmail] = useState("alex@example.com");
  const [patientNotes, setPatientNotes] = useState(
    "Mild chest discomfort after exercise.",
  );

  const fallbackDoctor = doctors[0];
  const contextDoctor =
    doctors.find((entry) => entry.slug === selectedDoctorSlug) ?? null;
  const queryDoctor = doctors.find((entry) => entry.slug === doctorSlug) ?? null;
  const selectedDoctor = queryDoctor ?? contextDoctor ?? fallbackDoctor;
  const firstAvailableSlot =
    selectedDoctor?.slots.find((slot) => !slot.disabled)?.time ?? "";
  const availableDates = selectedDate
    ? (() => {
        const selectedBookingDate = formatBookingDate(selectedDate);

        if (
          !selectedBookingDate ||
          bookingDates.some((date) => date.full === selectedBookingDate.full)
        ) {
          return bookingDates;
        }

        return [selectedBookingDate, ...bookingDates];
      })()
    : bookingDates;

  useEffect(() => {
    if (!selectedDoctor) {
      return;
    }

    if (doctorSlug && doctorSlug !== selectedDoctorSlug) {
      setSelectedDoctorSlug(doctorSlug);
      setSelectedSlot("");
      return;
    }

    if (!selectedDoctorSlug) {
      setSelectedDoctorSlug(selectedDoctor.slug);
    }
  }, [doctorSlug, selectedDoctor, selectedDoctorSlug, setSelectedDoctorSlug, setSelectedSlot]);

  useEffect(() => {
    if (!selectedDoctor) {
      return;
    }

    const hasValidSelection = selectedDoctor.slots.some(
      (slot) => slot.time === selectedSlot,
    );

    if (!selectedSlot || !hasValidSelection) {
      setSelectedSlot(firstAvailableSlot);
    }
  }, [firstAvailableSlot, selectedDoctor, selectedSlot, setSelectedSlot]);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(bookingDates[0].full);
    }
  }, [selectedDate, setSelectedDate]);

  if (!selectedDoctor) {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedDate || !selectedSlot || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 900);
    });

    const day = getCalendarDayKey(selectedDate);

    if (day) {
      const { tone, room } = specialtyPresentation[selectedDoctor.specialty];

      addCalendarEvent({
        id: `evt-booking-${Date.now()}`,
        doctor: selectedDoctor.name,
        patient: patientName.trim() || "Alex Morgan",
        specialty: selectedDoctor.specialty,
        day,
        start: selectedSlot,
        end: getEndTime(selectedSlot),
        room,
        visitType: "First consultation",
        status: "Confirmed",
        notes:
          patientNotes.trim() || "Booked from the public scheduling flow.",
        tone,
      });
    }

    showToast({
      title: "Booking confirmed",
      description: `${selectedDoctor.name} on ${selectedDate} at ${selectedSlot}.`,
    });
    clearBookingSelection();
    router.push("/");
  }

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
              {availableDates.map((day) => (
                <button
                  key={day.full}
                  type="button"
                  onClick={() => setSelectedDate(day.full)}
                  className={`rounded-[20px] border px-4 py-4 text-left ${
                    selectedDate === day.full
                      ? "border-[var(--primary)] bg-white"
                      : "border-[var(--line)] bg-transparent"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {day.year}
                  </p>
                  <p className="heading-font mt-2 text-2xl font-black">
                    {day.label}
                  </p>
                </button>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {selectedDoctor.slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={slot.disabled && selectedSlot !== slot.time}
                  onClick={() => setBookingSelection(selectedDoctor.slug, slot.time)}
                  className={`slot-chip rounded-2xl border px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:border-[var(--line)] disabled:bg-[var(--surface-muted)] disabled:text-[var(--muted)] disabled:opacity-60 ${
                    selectedSlot === slot.time
                      ? "active border-[var(--primary)]"
                      : "border-[var(--line)] bg-white"
                  }`}
                >
                  {slot.time}
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
              <span className="text-[var(--muted)]">Chosen date</span>
              <span className="font-semibold text-[var(--foreground)]">
                {selectedDate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Chosen time</span>
              <span className="font-semibold text-[var(--foreground)]">
                {selectedSlot}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Patient</span>
              <span className="font-semibold text-[var(--foreground)]">
                {patientName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Visit type</span>
              <span className="font-semibold text-[var(--foreground)]">
                First consultation
              </span>
            </div>
          </div>
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <input
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
            />
            <input
              value={patientEmail}
              onChange={(event) => setPatientEmail(event.target.value)}
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
            />
            <textarea
              value={patientNotes}
              onChange={(event) => setPatientNotes(event.target.value)}
              rows={4}
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
            />
            <button
              type="submit"
              disabled={!selectedDate || !selectedSlot || isSubmitting}
              className="rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--primary-strong)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="loading-dot h-4 w-4 rounded-full border-2 border-[var(--primary-strong)] border-t-transparent" />
                  Confirming booking...
                </span>
              ) : (
                "Continue to confirmation"
              )}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
