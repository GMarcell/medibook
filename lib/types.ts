export type Specialty =
  | "Cardiology"
  | "Dermatology"
  | "Neurology"
  | "Pediatrics"
  | "Orthopedics";

export type Doctor = {
  id: number;
  slug: string;
  name: string;
  specialty: Specialty;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  nextAvailable: string;
  languages: string[];
  bio: string;
  credentials: string[];
  highlights: string[];
  slots: string[];
};

export type Appointment = {
  id: string;
  doctor: string;
  specialty: Specialty;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Needs action";
  location: string;
};

export type Stat = {
  label: string;
  value: string;
  caption: string;
};

export type AdminDoctorStatus = {
  name: string;
  fillRate: string;
  status: string;
};

export type CalendarEvent = {
  id: string;
  doctor: string;
  patient: string;
  specialty: Specialty;
  day: string;
  start: string;
  end: string;
  room: string;
  visitType: string;
  status: "Confirmed" | "Checked in" | "Needs follow-up";
  notes: string;
  tone: "forest" | "lime" | "sage" | "gold";
};
