import { Mail, MapPin, MessageCircle, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { contact, ctaLabels, services } from "@/config/content";
import { siteConfig } from "@/config/site";
import { generalMailtoUrl, generalWhatsappUrl, whatsappUrl } from "@/lib/links";
import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { LinkedinIcon } from "@/components/ui/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinePattern } from "@/components/visuals/LinePattern";

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-teal-light" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[0.8125rem] font-medium tracking-wide text-line/80 uppercase">{label}</p>
        <div className="mt-0.5 text-white">{children}</div>
      </div>
    </li>
  );
}

const iconProps = { size: 18, strokeWidth: 1.6 } as const;
const contactLinkClass = "break-words rounded-sm underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-teal-light";

export function Contact() {
  const { founder, location, contact: data, social } = siteConfig;
  const serviceOptions = [...services.items.map((service) => service.title), "Otro / todavía no lo sé"];

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="relative overflow-hidden bg-navy-2 py-20 text-white sm:py-24 lg:py-32">
      <LinePattern tone="dark" className="absolute -top-24 -right-24 hidden w-[34rem] opacity-80 lg:block" />

      <Container className="relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5" data-reveal>
          <SectionHeader id="contacto-titulo" tone="dark" eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro} />

          <ul className="mt-10 space-y-6">
            <ContactItem icon={<UserRound {...iconProps} />} label="Fundador">
              <span className="block font-semibold">{founder.name}</span>
              <span className="block text-small text-line">{founder.role}</span>
            </ContactItem>
            <ContactItem icon={<MapPin {...iconProps} />} label="Ubicación">
              {location.full}
            </ContactItem>
            <ContactItem icon={<MessageCircle {...iconProps} />} label="WhatsApp">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                {data.whatsapp.display}
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </ContactItem>
            <ContactItem icon={<Mail {...iconProps} />} label="Email">
              <a href={`mailto:${data.email}`} className={contactLinkClass}>
                {data.email}
              </a>
            </ContactItem>
            {social.linkedin ? (
              <ContactItem icon={<LinkedinIcon {...iconProps} />} label="LinkedIn">
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                  Ver perfil
                  <span className="sr-only"> de {founder.name} en LinkedIn (se abre en una pestaña nueva)</span>
                </a>
              </ContactItem>
            ) : null}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={generalWhatsappUrl} icon={<MessageCircle size={18} strokeWidth={1.75} />} className="w-full sm:w-auto">
              {ctaLabels.whatsapp}
            </ButtonLink>
            <ButtonLink href={generalMailtoUrl} variant="secondary-dark" icon={<Mail size={18} strokeWidth={1.75} />} className="w-full sm:w-auto">
              {ctaLabels.email}
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-7" data-reveal>
          <div className="rounded-xl bg-white p-6 text-navy sm:p-9 lg:p-10">
            <h3 className="text-h3 font-semibold">{contact.formTitle}</h3>
            <p className="mt-2 text-small text-muted">{contact.formIntro}</p>
            <ContactForm serviceOptions={serviceOptions} />
          </div>
        </div>
      </Container>
    </section>
  );
}
