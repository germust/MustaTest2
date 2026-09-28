import { ArrowRight } from "lucide-react";
import { problems } from "@/config/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";

export function Problems() {
  return (
    <section aria-labelledby="problemas-titulo" id="problemas" className="bg-white py-20 sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4" data-reveal>
          <SectionHeader id="problemas-titulo" eyebrow="Desafíos habituales" title={problems.title} intro={problems.intro} />
          <div className="mt-10 hidden lg:block">
            <p className="font-medium text-navy">{problems.closing}</p>
            <ButtonLink href="#contacto" variant="text" icon={<ArrowRight size={18} strokeWidth={1.75} />} className="mt-3">
              {problems.closingCta}
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-8 lg:pl-6">
          <ol className="grid border-b border-line sm:grid-cols-2 sm:gap-x-10">
            {problems.items.map((item, index) => (
              <li
                key={item}
                data-reveal
                style={revealDelay((index % 2) * 60)}
                className="flex items-baseline gap-5 border-t border-line py-6"
              >
                <span className="w-7 shrink-0 text-small font-semibold tabular-nums text-teal-dark" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[1.0625rem] font-medium leading-snug text-navy lg:text-lg">{item}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 lg:hidden">
            <p className="font-medium text-navy">{problems.closing}</p>
            <ButtonLink href="#contacto" variant="text" icon={<ArrowRight size={18} strokeWidth={1.75} />} className="mt-3">
              {problems.closingCta}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
