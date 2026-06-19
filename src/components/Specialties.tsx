import { Clock } from "lucide-react";
import { specialties } from "../content";
import { Section, SectionHead, Reveal } from "./ui";
import Icon from "./Icon";

export default function Specialties() {
  return (
    <Section>
      <SectionHead
        eyebrow={specialties.eyebrow}
        title={specialties.title}
        subtitle={specialties.note}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.items.map((s, i) => (
          <Reveal key={s.name} delay={(i % 3) * 0.07}>
            <div className="card group h-full p-6 transition-shadow hover:shadow-[0_20px_50px_-28px_rgba(10,10,15,0.35)]">
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white">
                  <Icon name={s.icon} size={22} />
                </div>
                <span className="rounded-full bg-promo px-3 py-1 text-[13px] font-extrabold text-ink">
                  {s.priceFrom}
                </span>
              </div>
              <h3 className="mt-4 text-[19px] text-ink">{s.name}</h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-ink-soft">
                <Clock size={15} strokeWidth={2.2} />
                {s.duration}
              </p>
              <div className="mt-4 border-t border-ink/8 pt-4">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-soft">
                  Рекомендуем вузы
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.universities.map((u) => (
                    <span
                      key={u}
                      className="rounded-lg bg-surface px-2.5 py-1 text-[12.5px] font-medium text-ink"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
