import { useState } from "react";
import { Check, GraduationCap, Award, Zap } from "lucide-react";
import { admissionPaths } from "../content";
import { Section, SectionHead } from "./ui";

export default function AdmissionPaths() {
  const [active, setActive] = useState(admissionPaths.paths[0].id);
  const path =
    admissionPaths.paths.find((p) => p.id === active) ?? admissionPaths.paths[0];

  return (
    <Section className="bg-surface">
      <SectionHead eyebrow={admissionPaths.eyebrow} title={admissionPaths.title} />

      {/* Animated tab switcher with icons */}
      <div className="mt-10 flex justify-center">
        <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl bg-ink p-1.5 max-w-full backdrop-blur-md shadow-lg">
          {admissionPaths.paths.map((p, idx) => {
            const on = p.id === active;
            const icons = [GraduationCap, Award, Zap];
            const IconComponent = icons[idx % 3];
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                aria-pressed={on}
                className={`relative rounded-xl px-4 py-2.5 text-[13px] sm:text-[14px] font-semibold transition-all duration-300 flex items-center gap-2 group ${
                  on
                    ? "bg-white text-ink shadow-lg tab-button-active"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <IconComponent
                  size={16}
                  strokeWidth={2.2}
                  className={`transition-transform duration-300 ${
                    on ? "icon-animate" : ""
                  }`}
                />
                {p.tab}
                {on && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent-red rounded-full tab-indicator" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated panel content */}
      <div className="mx-auto mt-8 max-w-3xl">
        <div
          key={path.id}
          className="card panel-content p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Animated background glow */}
          <div
            aria-hidden
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-5 blur-3xl animate-blob-slow"
            style={{ background: "var(--color-primary)" }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-1 w-6 bg-gradient-to-r from-primary to-accent-red rounded-full" />
              <span className="text-[12px] uppercase tracking-wider font-bold text-primary">
                {path.id.replace("-", " ")}
              </span>
            </div>

            <h3 className="text-[21px] sm:text-[26px] text-ink font-display font-bold">
              {path.title}
            </h3>
            <p className="mt-4 text-[15px] sm:text-[16px] text-ink-soft leading-relaxed">
              {path.text}
            </p>

            <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
              {path.points.map((pt, idx) => (
                <li
                  key={pt}
                  className="flex items-start gap-3 text-[15px] text-ink list-item"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-success/20 to-success/5 text-success border border-success/30">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
