"use client";

import { useEffect, useRef, useState } from "react";
import { adminCalendarEvents, adminWeekDays } from "@/lib/data";
import type { CalendarEvent } from "@/lib/types";

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const PIXELS_PER_HOUR = 72;

function toHourValue(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour + minute / 60;
}

function formatHour(hour: number) {
  return `${hour.toString().padStart(2, "0")}:00`;
}

function getToneClasses(tone: "forest" | "lime" | "sage" | "gold") {
  const tones = {
    forest: "bg-[rgba(26,92,42,0.92)] text-white border-[rgba(26,92,42,0.98)]",
    lime: "bg-[rgba(184,242,67,0.88)] text-[var(--primary-strong)] border-[rgba(144,195,48,0.95)]",
    sage: "bg-[rgba(95,142,108,0.92)] text-white border-[rgba(68,111,80,0.98)]",
    gold: "bg-[rgba(244,206,110,0.92)] text-[#4d3600] border-[rgba(209,171,76,0.98)]",
  };

  return tones[tone];
}

function getStatusClasses(status: CalendarEvent["status"]) {
  const statuses = {
    Confirmed: "bg-[#eef7eb] text-[var(--primary)]",
    "Checked in": "bg-[#f7f2dc] text-[#765400]",
    "Needs follow-up": "bg-[#fff0e7] text-[#97511c]",
  };

  return statuses[status];
}

function getPopoverPosition(
  triggerRect: DOMRect,
  containerRect: DOMRect,
  popoverWidth: number,
  popoverHeight: number,
) {
  const gap = 16;
  const preferredRight = triggerRect.right - containerRect.left + gap;
  const preferredLeft = triggerRect.left - containerRect.left - popoverWidth - gap;
  const fitsRight = preferredRight + popoverWidth <= containerRect.width - gap;
  const left = fitsRight
    ? preferredRight
    : Math.max(gap, Math.min(preferredLeft, containerRect.width - popoverWidth - gap));

  const centeredTop =
    triggerRect.top - containerRect.top + triggerRect.height / 2 - popoverHeight / 2;
  const top = Math.max(gap, Math.min(centeredTop, containerRect.height - popoverHeight - gap));

  return { left, top };
}

export function AdminCalendar() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const dayHeight = (HOURS.length - 1) * PIXELS_PER_HOUR;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedEvent(null);
      }
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        target.closest("[data-calendar-event], [data-calendar-popover]")
      ) {
        return;
      }

      setSelectedEvent(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="surface-card relative overflow-hidden">
      <div className="border-b border-[var(--line)] bg-white px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
              Calendar view
            </p>
            <h2 className="heading-font mt-2 text-2xl font-extrabold">
              Weekly doctor schedule
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {[
              ["Cardiology", "bg-[rgba(26,92,42,0.92)] text-white"],
              ["Pediatrics", "bg-[rgba(184,242,67,0.88)] text-[var(--primary-strong)]"],
              ["Dermatology", "bg-[rgba(95,142,108,0.92)] text-white"],
              ["Orthopedics", "bg-[rgba(244,206,110,0.92)] text-[#4d3600]"],
            ].map(([label, classes]) => (
              <span
                key={label}
                className={`rounded-full px-3 py-2 ${classes}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[1040px] grid-cols-[88px_repeat(5,minmax(180px,1fr))]">
          <div className="border-r border-[var(--line)] bg-[#f8faf4]" />
          {adminWeekDays.map((day) => (
            <div
              key={day.key}
              className="border-r border-[var(--line)] bg-[#f8faf4] px-4 py-4 last:border-r-0"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                Week 17
              </p>
              <p className="heading-font mt-2 text-xl font-extrabold text-[var(--foreground)]">
                {day.label}
              </p>
            </div>
          ))}

          <div className="relative border-r border-[var(--line)] bg-white">
            <div className="relative" style={{ height: `${dayHeight}px` }}>
              {HOURS.slice(0, -1).map((hour) => (
                <div
                  key={hour}
                  className="absolute inset-x-0 border-t border-dashed border-[var(--line)] px-3 pt-1 text-right text-xs text-[var(--muted)]"
                  style={{ top: `${(hour - HOURS[0]) * PIXELS_PER_HOUR}px` }}
                >
                  {formatHour(hour)}
                </div>
              ))}
            </div>
          </div>

          {adminWeekDays.map((day) => {
            const events = adminCalendarEvents.filter((event) => event.day === day.key);

            return (
              <div
                key={day.key}
                className="relative border-r border-[var(--line)] bg-white last:border-r-0"
              >
                <div className="relative" style={{ height: `${dayHeight}px` }}>
                  {HOURS.slice(0, -1).map((hour) => (
                    <div
                      key={hour}
                      className="absolute inset-x-0 border-t border-dashed border-[var(--line)]"
                      style={{ top: `${(hour - HOURS[0]) * PIXELS_PER_HOUR}px` }}
                    />
                  ))}
                  {events.map((event) => {
                    const startValue = toHourValue(event.start);
                    const endValue = toHourValue(event.end);
                    const top = (startValue - HOURS[0]) * PIXELS_PER_HOUR;
                    const height = (endValue - startValue) * PIXELS_PER_HOUR;
                    const isSelected = selectedEvent?.id === event.id;
                    const contentHeight = height - 24;
                    const showPatient = contentHeight >= 56;
                    const showMeta = contentHeight >= 80;

                    return (
                      <button
                        key={event.id}
                        type="button"
                        onClick={(clickEvent) => {
                          if (!rootRef.current) {
                            return;
                          }

                          if (selectedEvent?.id === event.id) {
                            setSelectedEvent(null);
                            return;
                          }

                          const triggerRect =
                            clickEvent.currentTarget.getBoundingClientRect();
                          const containerRect =
                            rootRef.current.getBoundingClientRect();

                          setPopoverPosition(
                            getPopoverPosition(triggerRect, containerRect, 288, 272),
                          );
                          setSelectedEvent(event);
                        }}
                        data-calendar-event="true"
                        className={`absolute left-2 right-2 flex min-w-0 flex-col overflow-hidden rounded-[18px] border p-3 text-left shadow-[0_14px_30px_rgba(18,48,26,0.12)] transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${getToneClasses(event.tone)}`}
                        style={{ top: `${top}px`, height: `${height}px` }}
                        aria-expanded={isSelected}
                        aria-label={`Open details for ${event.patient} with ${event.doctor}`}
                      >
                        <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
                          {event.start} - {event.end}
                        </p>
                        <p className="mt-2 min-w-0 break-words text-sm leading-5 font-bold">
                          {event.doctor}
                        </p>
                        {showPatient ? (
                          <p className="mt-1 min-w-0 break-words text-sm leading-5 opacity-90">
                            {event.patient}
                          </p>
                        ) : null}
                        {showMeta ? (
                          <p className="mt-2 min-w-0 break-words text-xs leading-4 opacity-80">
                            {event.specialty} · {event.room}
                          </p>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedEvent ? (
        <div
          data-calendar-popover="true"
          className="absolute z-40 w-72 rounded-[22px] border border-[var(--line)] bg-white p-4 text-[var(--foreground)] shadow-[0_24px_60px_rgba(18,48,26,0.22)]"
          style={{
            left: `${popoverPosition.left}px`,
            top: `${popoverPosition.top}px`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                Appointment detail
              </p>
              <p className="mt-2 text-base font-bold text-[var(--foreground)]">
                {selectedEvent.patient}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusClasses(selectedEvent.status)}`}
            >
              {selectedEvent.status}
            </span>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="text-[var(--muted)]">Doctor</span>
              <span className="max-w-[160px] text-right font-medium">
                {selectedEvent.doctor}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[var(--muted)]">Time</span>
              <span className="font-medium">
                {selectedEvent.day} · {selectedEvent.start} - {selectedEvent.end}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[var(--muted)]">Visit</span>
              <span className="max-w-[160px] text-right font-medium">
                {selectedEvent.visitType}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[var(--muted)]">Specialty</span>
              <span className="max-w-[160px] text-right font-medium">
                {selectedEvent.specialty}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[var(--muted)]">Room</span>
              <span className="font-medium">{selectedEvent.room}</span>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-[var(--surface-muted)] p-3 text-sm leading-6 text-[var(--muted)]">
            {selectedEvent.notes}
          </div>
        </div>
      ) : null}
    </div>
  );
}
