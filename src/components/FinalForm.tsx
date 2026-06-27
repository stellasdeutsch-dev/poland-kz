import { useState } from "react";
import { Check, ShieldCheck, CheckCircle2, Gift } from "lucide-react";
import { finalForm } from "../content";
import { FORM_ID } from "../lib/scroll";
import { submitLead } from "../lib/leads";

export default function FinalForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    // Show success immediately; deliver the lead in the background.
    setDone(true);
    void submitLead({ source: "final-form", name, phone });
  }

  return (
    <section id={FORM_ID} className="scroll-mt-16 bg-ink py-14 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          {/* Left: pitch + checklist */}
          <div className="text-white">
            <p
              className="eyebrow"
              style={{ color: "var(--color-promo)" }}
            >
              {finalForm.eyebrow}
            </p>
            <h2 className="mt-3 text-[28px] sm:text-[36px] lg:text-[44px] text-white">
              {finalForm.title}
            </h2>
            <p className="mt-3 text-[16px] text-white/70">{finalForm.subtitle}</p>

            <ul className="mt-7 grid gap-3">
              {finalForm.checklist.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] sm:text-[16px] text-white/90">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-promo text-ink">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] font-bold text-promo">
              <ShieldCheck size={17} strokeWidth={2.4} />
              {finalForm.guarantee}
            </div>
          </div>

          {/* Right: white form card */}
          <div className="rounded-[24px] bg-white p-6 sm:p-8">
            {done ? (
              <div className="grid h-full place-items-center py-10 text-center">
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
                    <CheckCircle2 size={36} strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-[22px] text-ink">Заявка принята</h3>
                  <p className="mx-auto mt-2 max-w-xs text-[15px] text-ink-soft">
                    {finalForm.successMsg}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-4">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-promo px-3 py-1.5 text-[13px] font-extrabold text-ink">
                  <Gift size={15} />
                  Гайд о поступлении в подарок
                </div>

                <label className="grid gap-1.5">
                  <span className="text-[13px] font-semibold text-ink-soft">
                    {finalForm.nameLabel}
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="h-12 rounded-xl border border-ink/12 bg-white px-4 text-[16px] text-ink outline-none focus:border-primary"
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-[13px] font-semibold text-ink-soft">
                    {finalForm.phoneLabel}
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

                <label className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
                  />
                  {finalForm.consentLabel}
                </label>

                <button type="submit" className="btn btn-primary w-full text-[17px]">
                  {finalForm.submit}
                </button>
                <p className="text-center text-[12.5px] text-ink-soft">
                  {finalForm.reassurance}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
