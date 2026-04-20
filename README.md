# MediBook

MediBook is a healthcare appointment platform prototype built with Next.js App Router. The project is designed around a product brief for a modern clinic booking experience, covering the patient journey from doctor discovery to appointment confirmation, plus a separate admin workspace for clinic operations.

## Project Goal

The app demonstrates how a healthcare booking product can support two different audiences in one platform:

- Patients who need to discover doctors, compare availability, and manage appointments quickly.
- Clinic staff who need a protected admin area to monitor schedules, doctor fill rate, and daily operations.

This implementation focuses on UI architecture, route structure, and interaction design rather than live backend integration.

## Requirement Coverage

The current build covers the main flows from the requirement brief:

- Marketing landing page with a healthcare-focused value proposition.
- Doctor discovery flow with specialty and location cues.
- Doctor detail page with trust signals such as rating, reviews, credentials, languages, and care highlights.
- Booking flow broken into clear steps: date/time, patient info, and confirmation.
- Patient dashboard for viewing appointment history and upcoming visits.
- Protected admin login separated from the patient-facing experience.
- Admin operations workspace with performance stats, doctor roster management, and a weekly calendar view.
- Mobile-first, accessible UI patterns with large tap targets and clear visual hierarchy.

## Main Features

### Patient Experience

- `/` landing page with hero search concept, featured doctors, booking steps, and operational product highlights.
- `/doctors` doctor listing page with specialty, location, and rating-oriented filter presentation.
- `/doctors/[slug]` dynamic doctor profile page generated from structured doctor data.
- `/book` booking flow prototype with selected doctor summary, appointment slots, and patient information form.
- `/dashboard` patient appointment dashboard showing upcoming, completed, and needs-action appointments.

### Admin Experience

- `/admin/login` dedicated admin sign-in page.
- `/admin` protected admin workspace with summary metrics, calendar overview, and doctor roster health.
- Cookie-based session gating for the admin area.
- Weekly doctor calendar with appointment detail popover interactions.

## Tech Stack

- Next.js 16.1.1
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- ESLint 9
- App Router architecture
- Server components and route handlers

## Implementation Notes

The app is intentionally lightweight and frontend-focused:

- Static demo data lives in [`lib/data.ts`](./lib/data.ts).
- Shared TypeScript contracts live in [`lib/types.ts`](./lib/types.ts).
- Admin session helpers live in [`lib/auth.ts`](./lib/auth.ts).
- Admin authentication uses route handlers in:
  - [`app/admin/auth/login/route.ts`](./app/admin/auth/login/route.ts)
  - [`app/admin/auth/logout/route.ts`](./app/admin/auth/logout/route.ts)
- Reusable UI pieces live in [`components`](./components), including doctor cards, booking step sections, shells, and the interactive admin calendar.

## Route Map

| Route | Purpose |
| --- | --- |
| `/` | Landing page and search-driven entry point |
| `/doctors` | Browse doctors and view filter options |
| `/doctors/[slug]` | View a doctor profile and available slots |
| `/book` | Start the 3-step booking flow |
| `/dashboard` | Patient appointment dashboard |
| `/admin/login` | Admin login screen |
| `/admin` | Protected admin operations workspace |

## Project Structure

```text
app/
  admin/
    (portal)/           Protected admin pages
    auth/               Login and logout route handlers
    login/              Admin login page
  book/                 Booking flow page
  dashboard/            Patient dashboard
  doctors/              Listing and dynamic doctor profile routes
  globals.css           Global theme and shared styles
  layout.tsx            Root layout
  page.tsx              Landing page
components/
  admin-calendar.tsx    Interactive weekly schedule view
  admin-shell.tsx       Admin layout shell
  booking-steps.tsx     Booking flow explainer block
  doctor-card.tsx       Reusable doctor summary card
  section-heading.tsx   Shared section heading component
  site-shell.tsx        Public-facing layout shell
lib/
  auth.ts               Admin session cookie helpers
  data.ts               Demo doctors, appointments, stats, and credentials
  types.ts              Shared app types
```

## Admin Demo Access

The project includes demo admin credentials from the local seed data in [`lib/data.ts`](./lib/data.ts).

```text
Email: admin@medibook.dev
Password: Admin123!
```

If you change the values in `lib/data.ts`, the admin login form and validation will follow those updated credentials.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Build Notes

- No external database is required for this prototype.
- No custom environment variables are currently needed for local development.
- The app uses static in-repo data, so it can run immediately after install.

## Current Scope And Limitations

- The booking flow is a high-fidelity UI prototype and does not persist appointments.
- Doctor search filters are present as interface elements and mock interactions, not live query logic.
- Patient dashboard actions such as reschedule and cancel are visual-only.
- Admin authentication is demo-grade cookie logic, not production security.
- The admin calendar uses mock schedule data instead of a real scheduling backend.

## Future Improvements

- Connect doctor, slot, and appointment data to a real API or database.
- Add form validation and submission handling for booking.
- Implement true search, filtering, and sorting logic on the doctor directory.
- Persist patient appointments and admin updates.
- Replace demo admin auth with a proper authentication system.
- Add automated tests for routes and interactive components.

## Summary

MediBook is a polished healthcare booking prototype that demonstrates:

- patient-side doctor discovery,
- appointment booking UX,
- dashboard-style appointment management, and
- a separate admin operations interface

all within a single Next.js codebase.
