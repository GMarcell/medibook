import type { Metadata } from "next";
import { DoctorDirectory } from "@/components/doctor-directory";

export const metadata: Metadata = {
  title: "Doctor Listing",
  description:
    "Browse MediBook's doctor directory by specialty, location, and availability to find the right doctor faster.",
};

export default function DoctorsPage() {
  return <DoctorDirectory />;
}
