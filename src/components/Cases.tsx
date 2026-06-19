import { MapPin, Quote } from "lucide-react";
import { cases } from "../content";
import { Section, SectionHead, Reveal } from "./ui";
import { unsplash, unsplashSrcSet } from "../lib/img";

export default function Cases() {
  return (
    <Section>
      <SectionHead eyebrow={cases.eyebrow} title={cases.title} />
      <div className="mt-10 [column-fill:_balance] sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {cases.items.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.06}>
            <figure className="card card-hover card-glow group mb-4 break-inside-avoid overflow-hidden">
              {/* real photo with overlay caption */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={unsplash(c.photo, 420)}
                  srcSet={unsplashSrcSet(c.photo, 420)}
                  alt={`${c.name}, ${c.from}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.15) 55%, rgba(10,10,15,0) 100%)",
                  }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-display text-[18px] font-extrabold">
                    {c.name}
                  </p>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-[13px] text-white/90">
                    <MapPin size={13} strokeWidth={2.4} />
                    {c.from} → {c.specialty}
                  </p>
                </figcaption>
              </div>
              <blockquote className="p-5">
                <Quote size={20} className="text-primary/30" strokeWidth={2.4} />
                <p className="mt-2 text-[15px] text-ink">{c.quote}</p>
                <p className="mt-3 text-[13px] font-semibold text-ink-soft">
                  {c.university}
                </p>
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
