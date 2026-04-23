"use client";

import { FormEvent, useMemo, useState } from "react";
import { AdminCalendar } from "@/components/admin-calendar";
import { adminStats } from "@/lib/data";
import { useDoctorDirectory } from "@/lib/doctor-directory-context";
import { useToast } from "@/lib/toast-context";
import type { Doctor, Specialty } from "@/lib/types";

type AddDoctorFormState = {
  name: string;
  specialty: Specialty;
  location: string;
  experience: string;
  nextAvailable: string;
  bio: string;
  languages: string;
  credentials: string;
  highlights: string;
  slots: string;
};

const defaultFormState: AddDoctorFormState = {
  name: "",
  specialty: "Cardiology",
  location: "",
  experience: "",
  nextAvailable: "",
  bio: "",
  languages: "English, Bahasa Indonesia",
  credentials: "",
  highlights: "",
  slots: "09:00, 11:30, 14:30",
};

function slugifyDoctorName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitCommaSeparatedValues(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function buildDoctorStatus(doctor: Doctor) {
  const totalSlots = doctor.slots.length;
  const disabledSlots = doctor.slots.filter((slot) => slot.disabled).length;
  const fillRate =
    totalSlots === 0
      ? "0%"
      : `${Math.round((disabledSlots / totalSlots) * 100)}%`;
  const status =
    totalSlots === 0
      ? "No slots"
      : disabledSlots === totalSlots
        ? "Fully booked"
        : disabledSlots === 0
          ? "Available"
          : "Partially booked";

  return { fillRate, status };
}

export default function AdminPage() {
  const { doctors, specialties, addDoctor } = useDoctorDirectory();
  const { showToast } = useToast();
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [formState, setFormState] = useState<AddDoctorFormState>(defaultFormState);

  const doctorRoster = useMemo(
    () =>
      doctors.map((doctor) => ({
        name: doctor.name,
        ...buildDoctorStatus(doctor),
      })),
    [doctors],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = formState.name.trim();
    const normalizedLocation = formState.location.trim();
    const normalizedExperience = formState.experience.trim();
    const normalizedNextAvailable = formState.nextAvailable.trim();
    const normalizedBio = formState.bio.trim();
    const languages = splitCommaSeparatedValues(formState.languages);
    const credentials = splitCommaSeparatedValues(formState.credentials);
    const highlights = splitCommaSeparatedValues(formState.highlights);
    const slots = splitCommaSeparatedValues(formState.slots).map((time) => ({
      time,
    }));

    if (
      !normalizedName ||
      !normalizedLocation ||
      !normalizedExperience ||
      !normalizedNextAvailable ||
      !normalizedBio ||
      languages.length === 0 ||
      credentials.length === 0 ||
      highlights.length === 0 ||
      slots.length === 0
    ) {
      showToast({
        title: "Missing doctor details",
        description: "Complete every field before saving the doctor profile.",
      });
      return;
    }

    const baseSlug = slugifyDoctorName(normalizedName);
    const slug =
      doctors.some((doctor) => doctor.slug === baseSlug)
        ? `${baseSlug}-${doctors.length + 1}`
        : baseSlug;

    addDoctor({
      id: Math.max(...doctors.map((doctor) => doctor.id), 0) + 1,
      slug,
      name: normalizedName,
      specialty: formState.specialty,
      location: normalizedLocation,
      rating: 4.8,
      reviews: 0,
      experience: normalizedExperience,
      nextAvailable: normalizedNextAvailable,
      languages,
      bio: normalizedBio,
      credentials,
      highlights,
      slots,
    });

    setFormState(defaultFormState);
    setIsAddingDoctor(false);
    showToast({
      title: "Doctor saved",
      description: `${normalizedName} is now available in the admin roster and saved to this browser.`,
    });
  };

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
            <button
              type="button"
              onClick={() => setIsAddingDoctor((currentValue) => !currentValue)}
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary-strong)]"
            >
              Add doctor
            </button>
          </div>
          {isAddingDoctor ? (
            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-4 rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] p-5 md:grid-cols-2"
            >
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Doctor name
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      name: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Specialty
                <select
                  value={formState.specialty}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      specialty: event.target.value as Specialty,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Location
                <input
                  required
                  type="text"
                  value={formState.location}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      location: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Experience
                <input
                  required
                  type="text"
                  value={formState.experience}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      experience: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Next available
                <input
                  required
                  type="text"
                  value={formState.nextAvailable}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      nextAvailable: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Languages
                <input
                  required
                  type="text"
                  value={formState.languages}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      languages: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Credentials
                <input
                  required
                  type="text"
                  value={formState.credentials}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      credentials: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Highlights
                <input
                  required
                  type="text"
                  value={formState.highlights}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      highlights: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="text-sm font-semibold text-[var(--foreground)]">
                Slot times
                <input
                  required
                  type="text"
                  value={formState.slots}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      slots: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="text-sm font-semibold text-[var(--foreground)] md:col-span-2">
                Bio
                <textarea
                  required
                  rows={4}
                  value={formState.bio}
                  onChange={(event) =>
                    setFormState((currentValue) => ({
                      ...currentValue,
                      bio: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <div className="md:col-span-2 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingDoctor(false)}
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white"
                >
                  Save doctor
                </button>
              </div>
            </form>
          ) : null}
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
