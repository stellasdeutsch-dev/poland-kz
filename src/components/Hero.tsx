import { ArrowRight, ShieldCheck } from "lucide-react";
import { useContent, useLang } from "../i18n";
import { scrollToId, QUIZ_ID } from "../lib/scroll";
import { unsplash, unsplashSrcSet } from "../lib/img";
import MessengerButtons from "./MessengerButtons";
import { Reveal } from "./ui";

export default function Hero() {
  const { hero } = useContent();
  const { lang } = useLang();
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft animated background accents */}
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-primary)" }}
      />
      <div
        aria-hidden
        className="animate-blob-slow pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--color-accent-red)" }}
      />

      <div className="container-x relative pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-20">
        <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          {/* Left: copy */}
          <div>
            <Reveal>
              <h1 className="text-[34px] leading-[1.04] sm:text-[48px] lg:text-[60px] text-ink max-w-[15ch]">
                {hero.h1Lines[0]}{" "}
                <span className="text-accent-red animate-pulse-scale">{hero.h1Lines[1]}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 max-w-xl text-[16px] sm:text-[18px] text-ink-soft">
                {hero.sub}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-7 flex flex-col gap-3 sm:max-w-md">
                <button
                  onClick={() => scrollToId(QUIZ_ID)}
                  className="btn btn-primary btn-shine btn-glow w-full text-[17px]"
                >
                  {hero.ctaPrimary}
                  <ArrowRight size={19} strokeWidth={2.5} />
                </button>
                <MessengerButtons />
              </div>
            </Reveal>

            {/* Trio of stats */}
            <Reveal delay={0.24}>
              <dl className="mt-9 grid grid-cols-3 gap-3 sm:gap-4 sm:max-w-2xl">
                {hero.stats.map((s) => (
                  <div
                    key={s.label}
                    className="card-hover rounded-2xl bg-surface px-2.5 py-4 sm:px-5 sm:py-6 text-center sm:text-left"
                  >
                    <dt className="font-display font-extrabold text-primary text-[19px] sm:text-[32px] tracking-tight whitespace-nowrap leading-none">
                      {s.value}
                    </dt>
                    <dd className="mt-1.5 text-[12px] sm:text-[14px] text-ink-soft leading-snug">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: photo (desktop) */}
          <Reveal delay={0.2} className="mt-10 hidden lg:mt-0 lg:block">
            <div className="relative">
              <div
                aria-hidden
                className="animate-blob absolute -inset-4 -z-10 rounded-[36px] opacity-20 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-primary),var(--color-accent-red))",
                }}
              />
              <img
                src={unsplash(hero.image, 720)}
                srcSet={unsplashSrcSet(hero.image, 720)}
                alt={hero.imageAlt}
                loading="eager"
                className="aspect-[4/5] w-full rounded-[28px] object-cover shadow-[0_40px_90px_-40px_rgba(40,38,255,0.45)]"
              />
              {/* floating guarantee card */}
              <div className="animate-float absolute -bottom-5 -left-5 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_50px_-20px_rgba(10,10,15,0.35)]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-success/12 text-success">
                  <ShieldCheck size={18} strokeWidth={2.4} />
                </span>
                <span className="text-[13px] font-bold text-ink leading-tight">
                  {lang === "kz" ? "100% кепілдік" : "100% гарантия"}
                  <br />
                  <span className="font-medium text-ink-soft">
                    {lang === "kz" ? "немесе қайтарамыз" : "или вернём взнос"}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
