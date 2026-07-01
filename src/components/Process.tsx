import { useContent } from "../i18n";
import { Section, SectionHead, Reveal } from "./ui";

export default function Process() {
  const { process } = useContent();
  return (
    <Section className="bg-surface">
      <SectionHead eyebrow={process.eyebrow} title={process.title} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="card relative h-full p-6">
              <span className="font-display text-[40px] font-extrabold leading-none text-primary/15">
                {s.n}
              </span>
              <h3 className="mt-3 text-[18px] text-ink">{s.title}</h3>
              <p className="mt-2 text-[14.5px] text-ink-soft">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
