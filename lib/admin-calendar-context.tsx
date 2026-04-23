"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { adminCalendarEvents as seedCalendarEvents } from "@/lib/data";
import type { CalendarEvent } from "@/lib/types";

const ADMIN_CALENDAR_STORAGE_KEY = "medibook.adminCalendarEvents";

type AdminCalendarContextValue = {
  events: CalendarEvent[];
  addCalendarEvent: (event: CalendarEvent) => void;
};

const AdminCalendarContext = createContext<
  AdminCalendarContextValue | undefined
>(undefined);

function isCalendarEvent(value: unknown): value is CalendarEvent {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const event = value as Record<string, unknown>;

  return (
    typeof event.id === "string" &&
    typeof event.doctor === "string" &&
    typeof event.patient === "string" &&
    typeof event.specialty === "string" &&
    typeof event.day === "string" &&
    typeof event.start === "string" &&
    typeof event.end === "string" &&
    typeof event.room === "string" &&
    typeof event.visitType === "string" &&
    (event.status === "Confirmed" ||
      event.status === "Checked in" ||
      event.status === "Needs follow-up") &&
    typeof event.notes === "string" &&
    (event.tone === "forest" ||
      event.tone === "lime" ||
      event.tone === "sage" ||
      event.tone === "gold")
  );
}

export function AdminCalendarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState(seedCalendarEvents);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawEvents = window.localStorage.getItem(ADMIN_CALENDAR_STORAGE_KEY);

      if (!rawEvents) {
        setHasHydrated(true);
        return;
      }

      const parsedEvents = JSON.parse(rawEvents);

      if (Array.isArray(parsedEvents) && parsedEvents.every(isCalendarEvent)) {
        setEvents(parsedEvents);
      }
    } catch {
      window.localStorage.removeItem(ADMIN_CALENDAR_STORAGE_KEY);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(
      ADMIN_CALENDAR_STORAGE_KEY,
      JSON.stringify(events),
    );
  }, [events, hasHydrated]);

  const value = useMemo(
    () => ({
      events,
      addCalendarEvent: (event: CalendarEvent) => {
        setEvents((currentEvents) => [...currentEvents, event]);
      },
    }),
    [events],
  );

  return (
    <AdminCalendarContext.Provider value={value}>
      {children}
    </AdminCalendarContext.Provider>
  );
}

export function useAdminCalendar() {
  const context = useContext(AdminCalendarContext);

  if (!context) {
    throw new Error(
      "useAdminCalendar must be used within an AdminCalendarProvider",
    );
  }

  return context;
}
