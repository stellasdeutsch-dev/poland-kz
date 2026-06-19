import { parentPeace } from "../content";
import { SectionHead, Reveal } from "./ui";
import Icon from "./Icon";

export default function ParentPeace() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="rounded-[28px] bg-primary px-6 py-12 sm:px-10 sm:py-14 text-white">
          <SectionHead
            eyebrow={parentPeace.eyebrow}
            title={parentPeace.title}
            dark
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {parentPeace.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white">
                    <Icon name={c.icon} size={24} />
                  </div>
                  <h3 className="mt-4 text-[18px] text-white">{c.title}</h3>
                  <p className="mt-2 text-[15px] text-white/80">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
