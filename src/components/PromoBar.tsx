import { ArrowRight } from "lucide-react";
import { promoBar } from "../content";
import { scrollToId, QUIZ_ID } from "../lib/scroll";

export default function PromoBar() {
  return (
    <button
      onClick={() => scrollToId(QUIZ_ID)}
      className="sticky top-0 z-50 w-full bg-promo text-ink"
      aria-label={`${promoBar.text}. ${promoBar.cta}`}
    >
      <div className="container-x flex items-center justify-center gap-2 py-2.5 text-[13px] sm:text-sm font-semibold">
        <span className="text-center">{promoBar.text}</span>
        <span className="hidden sm:inline-flex items-center gap-1 whitespace-nowrap font-extrabold">
          {promoBar.cta}
          <ArrowRight size={15} strokeWidth={2.5} />
        </span>
      </div>
    </button>
  );
}
