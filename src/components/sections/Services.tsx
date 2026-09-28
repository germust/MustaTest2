import { ArrowRight, Check, Info } from "lucide-react";
import { ctaLabels, services } from "@/config/content";
import { whatsappUrl } from "@/lib/links";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="bg-ivory py-20 sm:py-24 lg:py-32">
      <Container>
        <div data-reveal>
          <SectionHeader id="servicios-titulo" eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
        </div>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-7">
          {services.items.map((service, index) => (
            <article
              key={service.id}
              aria-labelledby={`servicio-${service.id}`}
              data-reveal
              style={revealDelay((index % 2) * 80)}
              className="flex flex-col rounded-xl border border-line bg-white p-7 sm:p-9 lg:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-[10px] border border-line bg-ivory text-teal">
                  <Icon name={service.icon} size={22} strokeWidth={1.5} />
                </span>
                <span className="text-small font-semibold tabular-nums text-muted" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 id={`servicio-${service.id}`} className="mt-7 text-h3 font-semibold text-navy">
                {service.title}
              </h3>
              <p className="mt-3 max-w-2xl text-muted">{service.description}</p>

              <ul className="mt-7 space-y-3 border-t border-line pt-7 text-[1rem] leading-snug text-navy md:columns-2 md:gap-x-8 lg:columns-1">
                {service.items.map((item) => (
                  <li key={item} className="flex break-inside-avoid gap-3">
                    <Check size={18} strokeWidth={1.75} className="mt-px shrink-0 text-teal" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {service.note ? (
                <p className="mt-6 flex gap-2.5 rounded-[10px] bg-ivory p-4 text-small text-muted">
                  <Info size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-teal-dark" aria-hidden="true" />
                  <span>{service.note}</span>
                </p>
              ) : null}

              <div className="mt-auto pt-8">
                <ButtonLink
                  href={whatsappUrl(service.whatsappMessage)}
                  variant="text"
                  icon={<ArrowRight size={18} strokeWidth={1.75} />}
                >
                  {ctaLabels.consultService}
                  <span className="sr-only">: {service.title}, por WhatsApp</span>
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
