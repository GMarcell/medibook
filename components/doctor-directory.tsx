"use client";

import { useState } from "react";
import { DoctorCard } from "@/components/doctor-card";
import { SectionHeading } from "@/components/section-heading";
import { useDoctorDirectory } from "@/lib/doctor-directory-context";

export function DoctorDirectory() {
  const { doctors, specialties } = useDoctorDirectory();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minimumRating, setMinimumRating] = useState(0);

  const locations = Array.from(
    new Set(doctors.map((doctor) => doctor.location)),
  );

  const filteredDoctors = doctors.filter((doctor) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        doctor.name,
        doctor.specialty,
        doctor.location,
        doctor.bio,
        ...doctor.highlights,
        ...doctor.languages,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));

    const matchesSpecialty =
      selectedSpeciality === "" || doctor.specialty === selectedSpeciality;
    const matchesLocation =
      selectedLocation === "" || doctor.location === selectedLocation;
    const matchesRating = minimumRating === 0 || doctor.rating >= minimumRating;

    return matchesQuery && matchesSpecialty && matchesLocation && matchesRating;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Doctor directory"
        title="Search by specialty, location, or availability"
        description="This listing view reflects the brief with quick filters, accessible card layout, and clear booking entry points."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="surface-card h-fit p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--primary)">
            Filters
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="doctor-search"
                className="mb-3 block text-sm font-semibold text-(--foreground)"
              >
                Search
              </label>
              <input
                id="doctor-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Doctor, specialty, language..."
                className="w-full rounded-2xl border border-(--line) bg-white px-4 py-3 text-sm text-(--foreground) outline-none transition focus:border-(--primary)"
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-(--foreground)">
                Specialty
              </p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <button
                    type="button"
                    key={specialty}
                    className={`rounded-full border border-(--line) px-2 py-1 text-xs ${selectedSpeciality === specialty ? "bg-(--primary) text-white" : "bg-(--surface-muted) text-(--muted)"}`}
                    onClick={() => {
                      if (selectedSpeciality === specialty) {
                        setSelectedSpeciality("");
                      } else {
                        setSelectedSpeciality(specialty);
                      }
                    }}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-(--foreground)">
                Location
              </p>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <button
                    type="button"
                    key={location}
                    className={`rounded-full border border-(--line) px-2 py-1 text-xs ${selectedLocation === location ? "bg-(--primary) text-white" : "bg-(--surface-muted) text-(--muted)"}`}
                    onClick={() => {
                      if (selectedLocation === location) {
                        setSelectedLocation("");
                      } else {
                        setSelectedLocation(location);
                      }
                    }}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-(--foreground)">
                Rating
              </p>
              <div className="flex flex-wrap gap-2">
                {[4.5, 4.7, 4.9].map((rating) => (
                  <button
                    type="button"
                    key={rating}
                    className={`rounded-full border border-(--line) px-2 py-1 text-xs ${minimumRating === rating ? "bg-(--primary) text-white" : "bg-(--surface-muted) text-(--muted)"}`}
                    onClick={() => {
                      if (minimumRating === rating) {
                        setMinimumRating(0);
                      } else {
                        setMinimumRating(rating);
                      }
                    }}
                  >
                    {rating.toFixed(1)} and above
                  </button>
                ))}
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpeciality("");
                  setSelectedLocation("");
                  setMinimumRating(0);
                }}
                className="w-full rounded-full border border-(--line) px-4 py-3 text-sm font-semibold text-(--foreground) transition hover:border-(--primary)"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </aside>
        <div>
          <p className="mb-4 text-sm text-(--muted)">
            Showing {filteredDoctors.length} doctor
            {filteredDoctors.length === 1 ? "" : "s"}
          </p>
          {filteredDoctors.length > 0 ? (
            <div className="grid gap-6 xl:grid-cols-2">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="surface-card p-8 text-center">
              <p className="heading-font text-2xl font-extrabold text-(--foreground)">
                No doctors match these filters
              </p>
              <p className="mt-2 text-sm text-(--muted)">
                Try clearing a filter or using a broader search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
