import { useContent } from "../i18n";
import { SectionHead, Reveal } from "./ui";
import Icon from "./Icon";

export default function Trust() {
  const { trust } = useContent();
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
      </div>
    </section>
  );
}
