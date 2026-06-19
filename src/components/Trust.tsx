import { trust } from "../content";
import { SectionHead, Reveal } from "./ui";
import Icon from "./Icon";

export default function Trust() {
  return (
    <section className="py-20 sm:py-28 lg:py-36">
      <div className="container-x">
        <SectionHead eyebrow={trust.eyebrow} title={trust.title} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.06}>
              <div className="card card-hover h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white">
                  <Icon name={c.icon} size={22} />
                </div>
                <h3 className="mt-4 text-[18px] text-ink">{c.title}</h3>
                <p className="mt-2 text-[14.5px] text-ink-soft">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Partner logos (placeholders) */}
        <div className="mt-14 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-ink-soft">
            {trust.partnersTitle}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {trust.partners.map((p) => (
              <span
                key={p}
                className="rounded-xl bg-surface px-5 py-3 font-display text-[16px] font-extrabold text-ink/60"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
