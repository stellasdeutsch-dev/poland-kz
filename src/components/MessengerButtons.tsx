import { MessageCircle } from "lucide-react";
import { useContent, useLang } from "../i18n";

/** WhatsApp contact button. */
export default function MessengerButtons({
  size = "md",
}: {
  size?: "sm" | "md";
}) {
  const { site } = useContent();
  const { lang } = useLang();
  const pad = size === "sm" ? "min-h-11 px-4 text-[15px]" : "";
  const label = lang === "kz" ? "WhatsApp-қа жазу" : "Написать в WhatsApp";
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-outline w-full gap-2.5 ${pad}`}
    >
      <MessageCircle size={19} strokeWidth={2.4} />
      {label}
    </a>
  );
}
