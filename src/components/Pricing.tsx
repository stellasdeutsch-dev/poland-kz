import { Check, ShieldCheck, CreditCard } from "lucide-react";
import { pricing } from "../content";
import { Section, SectionHead, Reveal } from "./ui";
import { scrollToId, FORM_ID } from "../lib/scroll";

export default function Pricing() {
  return (
    <Section className="bg-surface">
      <SectionHead eyebrow={pricing.eyebrow} title={pricing.title} />

      <div className="mt-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-success/12 px-4 py-2 text-[14px] font-bold text-success">
          <ShieldCheck size={17} strokeWidth={2.4} />
          {pricing.guarantee}
        </span>
      </div>

      <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-3">
        {pricing.packages.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div
              className={`relative flex h-full flex-col rounded-[24px] p-6 sm:p-7 transition-all duration-300 ${
                p.highlighted
                  ? "bg-ink text-white shadow-[0_30px_70px_-30px_rgba(40,38,255,0.6)] lg:-mt-3 lg:mb-3 hover:shadow-[0_40px_90px_-30px_rgba(40,38,255,0.8)]"
                  : "card card-hover card-glow"
              }`}
            >
              {p.highlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-promo px-3 py-1 text-[12px] font-extrabold text-ink">
                  Хит
                </span>
              )}
              <h3
                className={`text-[20px] ${p.highlighted ? "text-white" : "text-ink"}`}
              >
                {p.name}
              </h3>
              <p
                className={`mt-1 text-[14px] ${
                  p.highlighted ? "text-white/70" : "text-ink-soft"
                }`}
              >
                {p.tagline}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-[40px] font-extrabold tracking-tight">
                  {p.price}
                </span>
              </div>

              <ul className="mt-5 grid gap-2.5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-[14.5px] ${
                      p.highlighted ? "text-white/90" : "text-ink"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                        p.highlighted
                          ? "bg-white/15 text-promo"
                          : "bg-success/12 text-success"
                      }`}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToId(FORM_ID)}
                className={`btn mt-6 w-full ${
                  p.highlighted ? "btn-primary" : "btn-dark"
                }`}
              >
                Выбрать пакет
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-[14px] text-ink-soft">
        <CreditCard size={16} strokeWidth={2.2} className="text-primary" />
        {pricing.note}
      </p>
    </Section>
  );
}
