import { ArrowRight } from "lucide-react";
import { ctaLabels, engagementModels } from "@/config/content";
import { whatsappUrl } from "@/lib/links";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function EngagementModels() {
  return (
    <section id="modalidades" aria-labelledby="modalidades-titulo" className="bg-ivory py-20 sm:py-24 lg:py-32">
      <Container>
        <div data-reveal>
          <SectionHeader id="modalidades-titulo" eyebrow={engagementModels.eyebrow} title={engagementModels.title} />
        </div>

        <div
          data-reveal
          className="mt-14 grid divide-y divide-line rounded-xl border border-line bg-white lg:mt-16 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
        >
          {engagementModels.items.map((model) => (
            <article key={model.id} aria-labelledby={`modalidad-${model.id}`} className="flex flex-col p-7 sm:p-9 lg:p-10">
              <Icon name={model.icon} size={26} strokeWidth={1.5} className="text-teal" />
              <h3 id={`modalidad-${model.id}`} className="mt-6 text-h3 font-semibold text-navy">
                {model.title}
              </h3>
              <p className="mt-3 text-muted">{model.description}</p>
              <div className="mt-auto pt-8">
                <ButtonLink href={whatsappUrl(model.whatsappMessage)} variant="text" icon={<ArrowRight size={18} strokeWidth={1.75} />}>
                  {ctaLabels.consultModel}
                  <span className="sr-only">: {model.title}, por WhatsApp</span>
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-small text-muted" data-reveal>
          {engagementModels.note}
        </p>
      </Container>
    </section>
  );
}
