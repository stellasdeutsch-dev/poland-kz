import { useState } from "react";
import { MessageCircle, Send, X, Plus } from "lucide-react";
import { site } from "../content";

/** Floating messenger button, always visible (bottom-right). */
export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-5">
      {open && (
        <div className="flex flex-col gap-3">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в WhatsApp"
            className="grid h-12 w-12 place-items-center rounded-full bg-success text-white shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle size={22} strokeWidth={2.3} />
          </a>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в Telegram"
            className="grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105"
          >
            <Send size={20} strokeWidth={2.3} />
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Закрыть" : "Связаться с нами"}
        aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-xl transition-transform hover:scale-105"
      >
        {open ? <X size={24} /> : <Plus size={26} />}
      </button>
    </div>
  );
}
