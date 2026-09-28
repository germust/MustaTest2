import { ArrowDown, MessageCircle } from "lucide-react";
import { ctaLabels, hero } from "@/config/content";
import { generalWhatsappUrl } from "@/lib/links";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/icons";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="relative overflow-hidden bg-ivory pt-[68px] lg:pt-[84px]">
      <Container className="grid items-center gap-12 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-28 xl:pt-24">
        <div className="lg:col-span-7">
          <p className="mb-6 flex items-center gap-3 text-eyebrow font-semibold text-teal-dark">
            <span className="h-px w-8 bg-teal" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 id="inicio-titulo" className="max-w-[15ch] text-display font-bold text-navy sm:max-w-[16ch]">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-[38rem] text-lead text-muted">{hero.lead}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={generalWhatsappUrl}
              icon={<MessageCircle size={18} strokeWidth={1.75} />}
              className="w-full sm:w-auto"
            >
              {ctaLabels.meeting}
            </ButtonLink>
            <ButtonLink
              href="#servicios"
              variant="secondary"
              icon={<ArrowDown size={18} strokeWidth={1.75} />}
              className="w-full sm:w-auto"
            >
              {ctaLabels.services}
            </ButtonLink>
          </div>

          <ul className="mt-12 grid max-w-[40rem] grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-7 text-small font-medium text-navy sm:flex sm:flex-wrap sm:gap-x-8">
            {hero.highlights.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5">
                <Icon name={item.icon} size={18} strokeWidth={1.6} className="shrink-0 text-teal" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-[520px] lg:col-span-5 lg:max-w-none">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
