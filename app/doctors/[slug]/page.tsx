"use client";

import DoctorProfile from "@/components/doctor-profile";
import { useDoctorDirectory } from "@/lib/doctor-directory-context";
import { notFound, useParams } from "next/navigation";

export default function DoctorProfilePage() {
  const params = useParams<{ slug: string }>();
  const { doctors } = useDoctorDirectory();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const doctor = doctors.find((entry) => entry.slug === slug);

  if (!doctor) {
    notFound();
  }

  return <DoctorProfile doctor={doctor} />;
}
