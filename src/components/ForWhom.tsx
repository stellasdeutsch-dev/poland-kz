import { forWhom } from "../content";
import { Section, SectionHead, Reveal } from "./ui";
import Icon from "./Icon";

export default function ForWhom() {
  return (
    <Section className="bg-surface">
      <SectionHead eyebrow={forWhom.eyebrow} title={forWhom.title} />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {forWhom.cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div className="card card-hover h-full p-6 sm:p-7">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/8 text-primary">
                <Icon name={c.icon} size={28} />
              </div>
              <h3 className="mt-5 text-[19px] sm:text-[21px] text-ink">
                {c.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {c.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
