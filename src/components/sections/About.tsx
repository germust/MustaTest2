import { ArrowUpRight, MapPin } from "lucide-react";
import { about } from "@/config/content";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinePattern } from "@/components/visuals/LinePattern";

export function About() {
  const { founder, location, social } = siteConfig;

  return (
    <section id="sobre-must" aria-labelledby="sobre-titulo" className="bg-white py-20 sm:py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7 lg:pr-10" data-reveal>
          <SectionHeader id="sobre-titulo" eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-8 max-w-2xl space-y-6 text-muted lg:max-w-none">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-lead text-navy" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside
          aria-label={`${founder.name}, fundador`}
          className="relative self-start overflow-hidden rounded-xl border border-line bg-ivory p-7 sm:p-10 lg:col-span-5"
          data-reveal
        >
          <LinePattern className="absolute -top-32 -right-28 w-60 sm:-top-24 sm:w-72" />

          <div className="relative">
            <p className="text-eyebrow font-semibold uppercase text-teal-dark">Fundador</p>
            <p className="mt-4 text-h3 font-semibold text-navy">{founder.name}</p>
            <p className="mt-1 text-muted">{founder.role}</p>
            <p className="mt-3 flex items-center gap-2 text-small text-muted">
              <MapPin size={16} strokeWidth={1.6} className="shrink-0 text-teal" aria-hidden="true" />
              {location.full}
            </p>

            <div className="mt-8 border-t border-line pt-8">
              <p className="text-eyebrow font-semibold uppercase text-teal-dark">{about.experienceLabel}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.experience.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-small text-navy">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-eyebrow font-semibold uppercase text-teal-dark">{about.principlesLabel}</p>
              <ul className="mt-4 space-y-3 text-[1rem] leading-snug text-navy">
                {about.principles.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.6em] h-px w-4 shrink-0 bg-teal" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {social.linkedin ? (
              <ButtonLink
                href={social.linkedin}
                variant="text"
                icon={<ArrowUpRight size={18} strokeWidth={1.75} />}
                className="mt-8"
              >
                Ver perfil en LinkedIn
              </ButtonLink>
            ) : null}
          </div>
        </aside>
      </Container>
    </section>
  );
}
