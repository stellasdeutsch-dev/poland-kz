import { MessageCircle } from "lucide-react";
import { useContent } from "../i18n";

/** Floating WhatsApp button, always visible (bottom-right). */
export default function FloatingContact() {
  const { site } = useContent();
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className="fixed bottom-20 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-xl transition-transform hover:scale-105 sm:bottom-5"
    >
      <MessageCircle size={26} strokeWidth={2.3} />
    </a>
  );
}
