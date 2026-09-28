import { Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { navigation } from "@/config/content";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/links";
import { Container } from "@/components/ui/Container";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { LinkedinIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";

const linkClass =
  "inline-flex items-center gap-2.5 rounded-sm text-line transition-colors duration-200 hover:text-white";

export function Footer({ basePath = "" }: { basePath?: string }) {
  const { contact, social, location } = siteConfig;

  return (
    <footer className="border-t border-white/10 bg-navy-2 text-line">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo variant="negative" alt={siteConfig.name} className="w-[156px]" />
            <p className="mt-6 max-w-sm text-small text-line">{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Secciones del sitio" className="md:col-span-3">
            <p className="text-eyebrow font-semibold uppercase text-teal-light">Secciones</p>
            <ul className="mt-5 space-y-3 text-small">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`${basePath}#${item.id}`} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-eyebrow font-semibold uppercase text-teal-light">{siteConfig.name}</p>
            <ul className="mt-5 space-y-3 text-small">
              <li className="flex items-center gap-2.5">
                <MapPin size={17} strokeWidth={1.6} className="shrink-0 text-teal-light" aria-hidden="true" />
                {location.short}
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  <Mail size={17} strokeWidth={1.6} className="shrink-0 text-teal-light" aria-hidden="true" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <MessageCircle size={17} strokeWidth={1.6} className="shrink-0 text-teal-light" aria-hidden="true" />
                  WhatsApp {contact.whatsapp.display}
                  <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              </li>
              {social.linkedin ? (
                <li>
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <LinkedinIcon size={17} strokeWidth={1.6} className="shrink-0 text-teal-light" />
                    LinkedIn
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[0.875rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear buildYear={new Date().getFullYear()} /> {siteConfig.name}. Todos los derechos reservados.
          </p>
          <Link href="/privacidad" className={linkClass}>
            Política de privacidad
          </Link>
        </div>
      </Container>
    </footer>
  );
}
