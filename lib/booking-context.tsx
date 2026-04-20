"use client";

import { createContext, useContext, useState } from "react";

type BookingContextValue = {
  selectedDoctorSlug: string;
  selectedDate: string;
  selectedSlot: string;
  setSelectedDoctorSlug: (doctorSlug: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedSlot: (slot: string) => void;
  setBookingSelection: (doctorSlug: string, slot: string) => void;
  setBookingDetails: (details: {
    doctorSlug: string;
    date: string;
    slot: string;
  }) => void;
  clearBookingSelection: () => void;
};

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedDoctorSlug, setSelectedDoctorSlug] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const setBookingSelection = (doctorSlug: string, slot: string) => {
    setSelectedDoctorSlug(doctorSlug);
    setSelectedSlot(slot);
  };

  const setBookingDetails = ({
    doctorSlug,
    date,
    slot,
  }: {
    doctorSlug: string;
    date: string;
    slot: string;
  }) => {
    setSelectedDoctorSlug(doctorSlug);
    setSelectedDate(date);
    setSelectedSlot(slot);
  };

  const clearBookingSelection = () => {
    setSelectedDoctorSlug("");
    setSelectedDate("");
    setSelectedSlot("");
  };

  return (
    <BookingContext.Provider
      value={{
        selectedDoctorSlug,
        selectedDate,
        selectedSlot,
        setSelectedDoctorSlug,
        setSelectedDate,
        setSelectedSlot,
        setBookingSelection,
        setBookingDetails,
        clearBookingSelection,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }

  return context;
}
