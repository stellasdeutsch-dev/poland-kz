import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "../content";
import { Section, SectionHead } from "./ui";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="bg-surface">
      <SectionHead eyebrow={faq.eyebrow} title={faq.title} />
      <div className="mx-auto mt-10 max-w-3xl">
        <ul className="grid gap-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display text-[16px] sm:text-[18px] font-bold text-ink">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus size={18} strokeWidth={2.6} />
                  </span>
                </button>
                {/* CSS-only expand/collapse via grid-template-rows */}
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] text-ink-soft">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
