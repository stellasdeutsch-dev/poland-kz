import { whyPoland } from "../content";
import { Section, SectionHead, Reveal } from "./ui";
import Icon from "./Icon";

export default function WhyPoland() {
  return (
    <Section>
      <SectionHead eyebrow={whyPoland.eyebrow} title={whyPoland.title} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyPoland.cards.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.07}>
            <div className="card card-hover card-glow h-full p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/8 text-primary group-hover:bg-primary/15">
                <Icon name={c.icon} size={24} />
              </div>
              <h3 className="mt-4 text-[18px] sm:text-[20px] text-ink">
                {c.title}
              </h3>
              <p className="mt-2 text-[15px] text-ink-soft">{c.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
