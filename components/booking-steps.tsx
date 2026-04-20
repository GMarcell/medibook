const steps = [
  {
    number: "01",
    title: "Choose date & time",
    description: "Live availability is grouped by morning, noon, and evening.",
  },
  {
    number: "02",
    title: "Fill patient details",
    description: "Structured intake reduces front-desk back-and-forth.",
  },
  {
    number: "03",
    title: "Receive confirmation",
    description: "Email, in-app dashboard, and reschedule controls are ready.",
  },
];

export function BookingSteps() {
  return (
    <div className="surface-card p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Booking flow
          </p>
          <h3 className="heading-font mt-2 text-2xl font-extrabold">
            Three-step patient journey
          </h3>
        </div>
        <div className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary-strong)]">
          Zod-ready flow
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`step-panel rounded-[24px] border p-5 ${
              index === 1
                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                : "border-[var(--line)] bg-[var(--surface-muted)]"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                index === 1 ? "text-[var(--accent)]" : "text-[var(--primary)]"
              }`}
            >
              Step {step.number}
            </p>
            <h4 className="heading-font mt-4 text-xl font-extrabold">
              {step.title}
            </h4>
            <p
              className={`mt-3 text-sm leading-6 ${
                index === 1 ? "text-white/80" : "text-[var(--muted)]"
              }`}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
