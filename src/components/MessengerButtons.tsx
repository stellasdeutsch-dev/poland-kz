import { MessageCircle } from "lucide-react";
import { site, hero } from "../content";

/** WhatsApp contact button. */
export default function MessengerButtons({
  size = "md",
}: {
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? "min-h-11 px-4 text-[15px]" : "";
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-outline w-full gap-2.5 ${pad}`}
    >
      <MessageCircle size={19} strokeWidth={2.4} />
      Написать в {hero.ctaWhatsApp}
    </a>
  );
}
