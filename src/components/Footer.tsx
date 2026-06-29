import { MessageCircle, Camera, Mail, MapPin, Phone } from "lucide-react";
import { site, footer } from "../content";

export default function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-14 text-white sm:pb-14">
      <div className="container-x">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white font-display font-extrabold">
                P
              </span>
              <span className="font-display text-[18px] font-extrabold">
                {site.brand}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[14px] text-white/60">
              {footer.about}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-[14px] text-white/60">
              <MapPin size={15} strokeWidth={2.2} />
              {site.officeCity}
            </p>
          </div>

          <div>
            <p className="font-display text-[14px] font-bold uppercase tracking-wide text-white/40">
              Связаться
            </p>
            <div className="mt-4 grid gap-3 text-[15px]">
              <a
                href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white"
              >
                <Phone size={17} strokeWidth={2.2} /> {site.phoneDisplay}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white"
              >
                <MessageCircle size={17} strokeWidth={2.2} /> WhatsApp
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white"
              >
                <Camera size={17} strokeWidth={2.2} /> Instagram
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white"
              >
                <Mail size={17} strokeWidth={2.2} /> {site.email}
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-[14px] font-bold uppercase tracking-wide text-white/40">
              Документы
            </p>
            <div className="mt-4 grid gap-3 text-[15px]">
              <a href="#" className="text-white/80 hover:text-white">
                {footer.privacy}
              </a>
              <p className="text-[13px] text-white/50">{footer.legal}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-[13px] text-white/40">
          © {site.brand}. {footer.rights}
        </div>
      </div>
    </footer>
  );
}
