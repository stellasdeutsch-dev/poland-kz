/** Smooth-scroll to an element by id, respecting reduced-motion preference. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
}

export const QUIZ_ID = "quiz";
export const FORM_ID = "final-form";
