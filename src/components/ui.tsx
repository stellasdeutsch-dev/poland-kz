import { type ReactNode } from "react";

/**
 * Entrance reveal. CSS-keyframe animation that runs on mount with
 * `animation-fill-mode: both`, so content always settles at opacity 1
 * regardless of viewport/observer quirks. Reduced motion disables it.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`reveal ${className ?? ""}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/** Section heading: eyebrow + big title + optional subtitle. */
export function SectionHead({
  eyebrow,
  title,
  subtitle,
  center = true,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${
        center ? "" : "max-w-2xl"
      }`}
    >
      {eyebrow && (
        <p
          className={`eyebrow mb-3 ${center ? "justify-center" : ""}`}
          style={dark ? { color: "var(--color-promo)" } : undefined}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-[28px] sm:text-[36px] lg:text-[44px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-[15px] sm:text-[17px] ${
            dark ? "text-white/70" : "text-ink-soft"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Standard section spacing wrapper. */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-14 sm:py-20 lg:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
