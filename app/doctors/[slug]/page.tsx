import { doctors } from "@/lib/data";
import DoctorProfile from "@/components/doctor-profile";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = doctors.find((entry) => entry.slug === slug);

  if (!doctor) {
    notFound();
  }

  return <DoctorProfile doctor={doctor} />;
}
