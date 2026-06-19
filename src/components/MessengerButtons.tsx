import { MessageCircle, Send } from "lucide-react";
import { site } from "../content";
import { hero } from "../content";

/** WhatsApp + Telegram buttons. `variant` controls styling context. */
export default function MessengerButtons({
  size = "md",
}: {
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? "min-h-11 px-4 text-[15px]" : "";
  return (
    <div className="flex gap-3">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-outline flex-1 ${pad}`}
      >
        <MessageCircle size={18} strokeWidth={2.4} />
        {hero.ctaWhatsApp}
      </a>
      <a
        href={site.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-outline flex-1 ${pad}`}
      >
        <Send size={18} strokeWidth={2.4} />
        {hero.ctaTelegram}
      </a>
    </div>
  );
}
