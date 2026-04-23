"use client";

import { ToastViewport } from "@/components/toast-viewport";
import { AdminCalendarProvider } from "@/lib/admin-calendar-context";
import { BookingProvider } from "@/lib/booking-context";
import { DoctorDirectoryProvider } from "@/lib/doctor-directory-context";
import { ToastProvider } from "@/lib/toast-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DoctorDirectoryProvider>
        <AdminCalendarProvider>
          <BookingProvider>
            {children}
            <ToastViewport />
          </BookingProvider>
        </AdminCalendarProvider>
      </DoctorDirectoryProvider>
    </ToastProvider>
  );
}
