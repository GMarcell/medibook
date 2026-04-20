"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/lib/booking-context";
import type { Doctor } from "@/lib/types";

export default function DoctorProfile({ doctor }: { doctor: Doctor }) {
  const router = useRouter();
  const {
    selectedDoctorSlug,
    selectedSlot,
    setBookingSelection,
    setSelectedSlot,
  } = useBooking();
  const firstAvailableSlot =
    doctor.slots.find((slot) => !slot.disabled)?.time ?? "";

  useEffect(() => {
    if (selectedDoctorSlug === doctor.slug && selectedSlot) {
      return;
    }

    setBookingSelection(doctor.slug, firstAvailableSlot);
  }, [doctor.slug, firstAvailableSlot, selectedDoctorSlug, selectedSlot, setBookingSelection]);

  const activeSlot =
    selectedDoctorSlug === doctor.slug && selectedSlot
      ? selectedSlot
      : firstAvailableSlot;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="surface-card p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--primary)">
                Doctor profile
              </p>
              <h1 className="heading-font mt-3 text-4xl font-black tracking-[-0.04em]">
                {doctor.name}
              </h1>
              <p className="mt-3 text-lg text-(--muted)">
                {doctor.specialty} in {doctor.location}
              </p>
            </div>
            <div className="rounded-3xl bg-(--surface-muted) px-5 py-4 text-right">
              <p className="heading-font text-3xl font-black text-(--primary)">
                {doctor.rating.toFixed(1)}
              </p>
              <p className="text-sm text-(--muted)">
                {doctor.reviews} verified reviews
              </p>
            </div>
          </div>
          <p className="mt-8 text-base leading-8 text-(--muted)">
            {doctor.bio}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold text-(--foreground)">
                Credentials
              </p>
              <div className="space-y-3 text-sm text-(--muted)">
                {doctor.credentials.map((credential) => (
                  <p key={credential}>{credential}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-(--foreground)">
                Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language) => (
                  <span
                    key={language}
                    className="rounded-full border border-(--line) px-3 py-2 text-sm text-(--muted)"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-(--foreground)">
              Care highlights
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {doctor.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[20px] border border-(--line) bg-(--surface-muted) p-4 text-sm text-(--muted)"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="surface-card h-fit p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--primary)">
            Availability
          </p>
          <h2 className="heading-font mt-3 text-2xl font-extrabold">
            Next open slots
          </h2>
          <p className="mt-3 text-sm leading-6 text-(--muted)">
            Slots use the brief&apos;s interaction style: a clearly-muted
            disabled state and a strong selected state with visual confirmation.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {doctor.slots.map((slot) => (
              <button
                type="button"
                disabled={slot.disabled}
                key={slot.time}
                onClick={() => setBookingSelection(doctor.slug, slot.time)}
                className={`slot-chip rounded-2xl border px-4 py-3 text-center text-sm font-semibold disabled:cursor-not-allowed disabled:border-(--line) disabled:bg-(--surface-muted) disabled:text-(--muted) disabled:opacity-60 ${
                  activeSlot === slot.time
                    ? "active border-(--primary)"
                    : "border-(--line) bg-white text-(--foreground)"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedSlot(activeSlot);
              router.push(`/book?doctor=${doctor.slug}`);
            }}
            className="mt-8 block w-full rounded-full bg-(--accent) px-5 py-3 text-center font-semibold text-(--primary-strong)"
          >
            Continue to booking
          </button>
        </aside>
      </div>
    </div>
  );
}
