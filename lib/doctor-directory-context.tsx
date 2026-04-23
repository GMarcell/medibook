"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { doctors as seedDoctors, specialties } from "@/lib/data";
import type { Doctor, Specialty } from "@/lib/types";

const DOCTORS_STORAGE_KEY = "medibook.doctors";

type DoctorDirectoryContextValue = {
  doctors: Doctor[];
  specialties: Specialty[];
  addDoctor: (doctor: Doctor) => void;
};

const DoctorDirectoryContext = createContext<
  DoctorDirectoryContextValue | undefined
>(undefined);

function isDoctorSlot(value: unknown): value is Doctor["slots"][number] {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const slot = value as Record<string, unknown>;

  return (
    typeof slot.time === "string" &&
    (slot.disabled === undefined || typeof slot.disabled === "boolean")
  );
}

function isDoctor(value: unknown): value is Doctor {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const doctor = value as Record<string, unknown>;

  return (
    typeof doctor.id === "number" &&
    typeof doctor.slug === "string" &&
    typeof doctor.name === "string" &&
    specialties.includes(doctor.specialty as Specialty) &&
    typeof doctor.location === "string" &&
    typeof doctor.rating === "number" &&
    typeof doctor.reviews === "number" &&
    typeof doctor.experience === "string" &&
    typeof doctor.nextAvailable === "string" &&
    Array.isArray(doctor.languages) &&
    doctor.languages.every((language: unknown) => typeof language === "string") &&
    typeof doctor.bio === "string" &&
    Array.isArray(doctor.credentials) &&
    doctor.credentials.every(
      (credential: unknown) => typeof credential === "string",
    ) &&
    Array.isArray(doctor.highlights) &&
    doctor.highlights.every(
      (highlight: unknown) => typeof highlight === "string",
    ) &&
    Array.isArray(doctor.slots) &&
    doctor.slots.every(isDoctorSlot)
  );
}

export function DoctorDirectoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [directoryDoctors, setDirectoryDoctors] = useState(seedDoctors);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawDoctors = window.localStorage.getItem(DOCTORS_STORAGE_KEY);

      if (!rawDoctors) {
        setHasHydrated(true);
        return;
      }

      const parsedDoctors = JSON.parse(rawDoctors);

      if (Array.isArray(parsedDoctors) && parsedDoctors.every(isDoctor)) {
        setDirectoryDoctors(parsedDoctors);
      }
    } catch {
      window.localStorage.removeItem(DOCTORS_STORAGE_KEY);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(
      DOCTORS_STORAGE_KEY,
      JSON.stringify(directoryDoctors),
    );
  }, [directoryDoctors, hasHydrated]);

  const value = useMemo(
    () => ({
      doctors: directoryDoctors,
      specialties,
      addDoctor: (doctor: Doctor) => {
        setDirectoryDoctors((currentDoctors) => [...currentDoctors, doctor]);
      },
    }),
    [directoryDoctors],
  );

  return (
    <DoctorDirectoryContext.Provider value={value}>
      {children}
    </DoctorDirectoryContext.Provider>
  );
}

export function useDoctorDirectory() {
  const context = useContext(DoctorDirectoryContext);

  if (!context) {
    throw new Error(
      "useDoctorDirectory must be used within a DoctorDirectoryProvider",
    );
  }

  return context;
}
