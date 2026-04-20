export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
        {eyebrow}
      </p>
      <h2 className="heading-font text-3xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[var(--muted)]">
        {description}
      </p>
    </div>
  );
}
