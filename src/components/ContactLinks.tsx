import { ExternalLink } from "lucide-react";
import BrandIcon from "./BrandIcon";
import Reveal from "./Reveal";
import type { ContactLink } from "@/data/portfolio";

export default function ContactLinks({ contacts }: { contacts: ContactLink[] }) {
  return (
    <ul className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {contacts.map((contact, index) => (
        <li key={contact.id}>
          <Reveal delay={index * 0.06} className="h-full">
            <a
              href={contact.href}
              {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={`Contact Qi via ${contact.label} (opens in a new tab)`}
              className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-line bg-white px-4 py-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-accent-soft/60 text-ink transition-colors duration-300 group-hover:bg-accent/40">
                <BrandIcon icon={contact.icon} />
              </span>

              <span className="text-sm font-semibold text-ink">{contact.label}</span>

              <span className="inline-flex items-center gap-1 text-[11px] text-muted-soft">
                Open
                <ExternalLink aria-hidden="true" className="h-3 w-3" />
              </span>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
