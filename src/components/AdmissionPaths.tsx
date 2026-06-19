import { useState } from "react";
import { Check } from "lucide-react";
import { admissionPaths } from "../content";
import { Section, SectionHead } from "./ui";

export default function AdmissionPaths() {
  const [active, setActive] = useState(admissionPaths.paths[0].id);
  const path =
    admissionPaths.paths.find((p) => p.id === active) ?? admissionPaths.paths[0];

  return (
    <Section className="bg-surface">
      <SectionHead eyebrow={admissionPaths.eyebrow} title={admissionPaths.title} />

      {/* Black pill tab switcher */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl bg-ink p-1.5 max-w-full">
          {admissionPaths.paths.map((p) => {
            const on = p.id === active;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                aria-pressed={on}
                className={`rounded-xl px-3.5 py-2.5 text-[13px] sm:text-[14px] font-semibold transition-colors ${
                  on
                    ? "bg-white text-ink"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {p.tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel re-keys per tab so the CSS reveal replays */}
      <div className="mx-auto mt-8 max-w-3xl">
        <div key={path.id} className="reveal card p-6 sm:p-8">
          <h3 className="text-[21px] sm:text-[26px] text-ink">{path.title}</h3>
          <p className="mt-3 text-[15px] sm:text-[16px] text-ink-soft">
            {path.text}
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {path.points.map((pt) => (
              <li
                key={pt}
                className="flex items-start gap-2.5 text-[15px] text-ink"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/12 text-success">
                  <Check size={13} strokeWidth={3} />
                </span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
