"use client";

import { createContext, useContext } from "react";
import { doctors, specialties } from "@/lib/data";
import type { Doctor, Specialty } from "@/lib/types";

type DoctorDirectoryContextValue = {
  doctors: Doctor[];
  specialties: Specialty[];
};

const DoctorDirectoryContext = createContext<
  DoctorDirectoryContextValue | undefined
>(undefined);

export function DoctorDirectoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorDirectoryContext.Provider value={{ doctors, specialties }}>
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
