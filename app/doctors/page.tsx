import type { Metadata } from "next";
import { DoctorDirectory } from "@/components/doctor-directory";
import { DoctorDirectoryProvider } from "@/lib/doctor-directory-context";

export const metadata: Metadata = {
  title: "Doctor Listing",
  description:
    "Browse MediBook's doctor directory by specialty, location, and availability to find the right doctor faster.",
};

export default function DoctorsPage() {
  return (
    <DoctorDirectoryProvider>
      <DoctorDirectory />
    </DoctorDirectoryProvider>
  );
}
