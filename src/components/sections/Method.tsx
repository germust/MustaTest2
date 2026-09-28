import { method } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";

export function Method() {
  const lastIndex = method.steps.length - 1;

  return (
    <section id="como-trabajamos" aria-labelledby="metodo-titulo" className="bg-white py-20 sm:py-24 lg:py-32">
      <Container>
        <div data-reveal>
          <SectionHeader id="metodo-titulo" eyebrow={method.eyebrow} title={method.title} intro={method.intro} />
        </div>

        <ol className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {method.steps.map((step, index) => (
            <li
              key={step.number}
              data-reveal
              style={revealDelay(index * 70)}
              className="relative pl-[4.5rem] lg:pl-0"
            >
              {index < lastIndex ? (
                <>
                  {/* Conector vertical (móvil) y horizontal (escritorio) */}
                  <span className="absolute top-14 bottom-[-2rem] left-6 w-px bg-line lg:hidden" aria-hidden="true" />
                  <span className="absolute top-6 right-[-1.5rem] left-16 hidden h-px bg-line lg:block" aria-hidden="true" />
                </>
              ) : null}
              <span
                className="absolute top-0 left-0 flex size-12 items-center justify-center rounded-full border border-teal bg-white text-small font-semibold tabular-nums text-teal-dark lg:relative"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3 className="pt-2.5 text-h3 font-semibold text-navy lg:pt-0 lg:mt-8">
                <span className="sr-only">Etapa {step.number}: </span>
                {step.title}
              </h3>
              <p className="mt-3 max-w-[22rem] text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
