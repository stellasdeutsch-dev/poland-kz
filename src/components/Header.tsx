import { MessageCircle, Send } from "lucide-react";
import { site } from "../content";
import { scrollToId, QUIZ_ID } from "../lib/scroll";

export default function Header() {
  return (
    <header className="border-b border-ink/8 bg-bg">
      <div className="container-x flex items-center justify-between py-3.5">
        <a href="#top" className="flex items-center gap-2.5 no-underline">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white font-display font-extrabold">
            P
          </span>
          <span className="leading-tight">
            <span className="block font-display font-extrabold text-ink text-[17px] tracking-tight">
              {site.brand}
            </span>
            <span className="block text-[11px] text-ink-soft">
              {site.brandTagline}
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink/12 text-ink hover:border-ink transition-colors"
          >
            <MessageCircle size={18} strokeWidth={2.4} />
          </a>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink/12 text-ink hover:border-ink transition-colors"
          >
            <Send size={18} strokeWidth={2.4} />
          </a>
          <button
            onClick={() => scrollToId(QUIZ_ID)}
            className="btn btn-primary hidden sm:inline-flex !min-h-10 !py-2.5 !text-[15px]"
          >
            Оценить шансы
          </button>
        </div>
      </div>
    </header>
  );
}
