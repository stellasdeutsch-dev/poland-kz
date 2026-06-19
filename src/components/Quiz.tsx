import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Gift, CheckCircle2 } from "lucide-react";
import { quiz } from "../content";
import { QUIZ_ID } from "../lib/scroll";

type Phase = "questions" | "form" | "done";

export default function Quiz() {
  const total = quiz.steps.length;
  const [phase, setPhase] = useState<Phase>("questions");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const step = quiz.steps[stepIndex];
  // progress: questions + 1 form step
  const progress =
    phase === "done"
      ? 100
      : phase === "form"
        ? ((total + 0.5) / (total + 1)) * 100
        : (stepIndex / (total + 1)) * 100;

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [step.id]: value }));
    if (stepIndex < total - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setPhase("form");
    }
  }

  function back() {
    if (phase === "form") {
      setPhase("questions");
      return;
    }
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Заглушка: позже подключим Telegram-бот / CRM webhook
    console.log("[QUIZ LEAD]", { answers, name, phone });
    setPhase("done");
  }

  const stepNumber =
    phase === "done" ? total + 1 : phase === "form" ? total + 1 : stepIndex + 1;

  // Entrance animation keyed per view, re-mounts (and replays the CSS
  // `.reveal` animation) on change. No animation lib in the render path.
  const viewKey = phase === "questions" ? `q-${stepIndex}` : phase;

  return (
    <section id={QUIZ_ID} className="scroll-mt-16 py-14 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="eyebrow justify-center">{quiz.eyebrow}</p>
            <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[40px] text-ink">
              {quiz.title}
            </h2>
            <p className="mt-3 text-[15px] sm:text-[17px] text-ink-soft">
              {quiz.subtitle}
            </p>
          </div>

          <div className="card mt-8 p-5 sm:p-8 shadow-[0_24px_60px_-30px_rgba(40,38,255,0.35)]">
            {/* progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-[12px] font-semibold text-ink-soft mb-2">
                <span>
                  {phase === "done"
                    ? "Готово"
                    : `Шаг ${stepNumber} из ${total + 1}`}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out motion-reduce:transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div key={viewKey} className="reveal">
              {phase === "questions" && (
                <>
                  {step.hint && (
                    <p className="mb-3 text-[13px] text-primary font-semibold">
                      {step.hint}
                    </p>
                  )}
                  <h3 className="text-[20px] sm:text-[24px] text-ink">
                    {step.question}
                  </h3>
                  <div className="mt-5 grid gap-3">
                    {step.options.map((opt) => {
                      const active = answers[step.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => choose(opt.value)}
                          className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-4 text-left text-[15px] sm:text-[16px] font-semibold transition-colors ${
                            active
                              ? "border-primary bg-primary/5 text-ink"
                              : "border-ink/12 hover:border-primary hover:bg-surface text-ink"
                          }`}
                        >
                          {opt.label}
                          <ArrowRight
                            size={18}
                            strokeWidth={2.4}
                            className="shrink-0 text-primary"
                          />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {phase === "form" && (
                <>
                  <h3 className="text-[20px] sm:text-[24px] text-ink">
                    {quiz.resultTitle}
                  </h3>
                  <p className="mt-2 text-[14px] sm:text-[15px] text-ink-soft">
                    {quiz.resultText}
                  </p>
                  <form onSubmit={submit} className="mt-5 grid gap-3">
                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-semibold text-ink-soft">
                        {quiz.formNameLabel}
                      </span>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Например, Алия"
                        className="h-12 rounded-xl border border-ink/12 bg-white px-4 text-[16px] text-ink outline-none focus:border-primary"
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-semibold text-ink-soft">
                        {quiz.formPhoneLabel}
                      </span>
                      <div className="flex items-center rounded-xl border border-ink/12 bg-white focus-within:border-primary">
                        <span className="flex items-center gap-1.5 pl-4 pr-3 text-[16px] text-ink-soft border-r border-ink/10">
                          🇰🇿 +7
                        </span>
                        <input
                          required
                          type="tel"
                          inputMode="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="700 000 00 00"
                          className="h-12 flex-1 rounded-r-xl bg-transparent px-3 text-[16px] text-ink outline-none"
                        />
                      </div>
                    </label>
                    <button type="submit" className="btn btn-primary mt-1 w-full">
                      <Gift size={18} strokeWidth={2.4} />
                      {quiz.formSubmit}
                    </button>
                    <p className="text-center text-[12px] text-ink-soft">
                      {quiz.consent}
                    </p>
                  </form>
                </>
              )}

              {phase === "done" && (
                <div className="py-6 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
                    <CheckCircle2 size={36} strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-[22px] text-ink">Спасибо!</h3>
                  <p className="mx-auto mt-2 max-w-sm text-[15px] text-ink-soft">
                    {quiz.successMsg}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-[13px] font-semibold text-ink">
                    <Gift size={16} className="text-primary" />
                    Гайд о поступлении уже в пути
                  </div>
                </div>
              )}
            </div>

            {/* back */}
            {phase !== "done" && (stepIndex > 0 || phase === "form") && (
              <button
                onClick={back}
                className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink-soft hover:text-ink"
              >
                <ArrowLeft size={16} strokeWidth={2.4} />
                Назад
              </button>
            )}
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[13px] text-ink-soft">
            <Check size={15} className="text-success" strokeWidth={3} />
            Без спама. Сначала напишем в мессенджер.
          </p>
        </div>
      </div>
    </section>
  );
}
