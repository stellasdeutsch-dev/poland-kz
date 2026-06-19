import { ArrowRight } from "lucide-react";
import { hero } from "../content";
import { scrollToId, QUIZ_ID } from "../lib/scroll";

/** Sticky bottom CTA on mobile only. */
export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 p-3 backdrop-blur-sm sm:hidden">
      <button
        onClick={() => scrollToId(QUIZ_ID)}
        className="btn btn-primary w-full"
      >
        {hero.ctaPrimary}
        <ArrowRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
