import { BookingFlow } from "@/components/booking-flow";

export const metadata = {
  title: "Booking Flow",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string }>;
}) {
  const { doctor: doctorSlug } = await searchParams;

  return <BookingFlow doctorSlug={doctorSlug} />;
}
