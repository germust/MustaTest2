import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { hasFormEndpoint } from "@/lib/contact-form";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Información sobre el tratamiento de los datos del formulario de contacto de ${siteConfig.name}.`,
  alternates: { canonical: "/privacidad" },
  openGraph: { url: "/privacidad" },
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-[1.375rem] font-semibold leading-snug text-navy">{title}</h2>
      <div className="mt-3 space-y-3 text-muted">{children}</div>
    </section>
  );
}

const linkClass = "font-medium text-teal-dark underline underline-offset-4 hover:text-navy";

export default function PrivacyPage() {
  const { founder, location, contact } = siteConfig;
  const email = (
    <a href={`mailto:${contact.email}`} className={linkClass}>
      {contact.email}
    </a>
  );

  return (
    <>
      <Header basePath="/" />
      <main id="contenido" tabIndex={-1} className="bg-white pt-[68px] focus:shadow-none focus:outline-none lg:pt-[84px]">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 flex items-center gap-3 text-eyebrow font-semibold uppercase text-teal-dark">
              <span className="h-px w-8 bg-teal" aria-hidden="true" />
              {siteConfig.name}
            </p>
            <h1 className="text-h2 font-bold text-navy">Política de privacidad</h1>
            <p className="mt-5 text-lead text-muted">
              Esta página explica qué datos se solicitan en el sitio y para qué se utilizan.
            </p>

            <div className="mt-12 space-y-10">
              <Block title="Responsable">
                <p>
                  {siteConfig.name}, a cargo de {founder.name}, ubicada en {location.full}. Contacto: {email}.
                </p>
              </Block>

              <Block title="Datos que se solicitan">
                <p>
                  El formulario de contacto solicita nombre, empresa (opcional), un correo electrónico o número de
                  WhatsApp, el servicio de interés (opcional) y un mensaje.
                </p>
              </Block>

              <Block title="Cómo se envían los datos">
                {hasFormEndpoint ? (
                  <p>
                    Los datos del formulario se envían a través de un servicio externo de formularios, que los procesa
                    con el único fin de hacerlos llegar a {siteConfig.name}.
                  </p>
                ) : (
                  <p>
                    El sitio no envía ni almacena los datos del formulario. Al completarlo, se abre WhatsApp o la
                    aplicación de correo de la persona con el mensaje redactado; el envío lo realiza la propia persona
                    desde esa aplicación y queda sujeto a las políticas de privacidad de ese servicio.
                  </p>
                )}
              </Block>

              <Block title="Finalidad">
                <p>
                  Los datos se utilizan únicamente para responder la consulta y continuar la conversación iniciada por la
                  persona. No se utilizan con otros fines ni se ceden a terceros.
                </p>
              </Block>

              <Block title="Cookies y medición">
                <p>
                  El sitio no utiliza cookies de seguimiento ni herramientas de analítica o publicidad. El proveedor de
                  alojamiento puede registrar datos técnicos, como la dirección IP, para el funcionamiento y la
                  seguridad del servicio.
                </p>
              </Block>

              <Block title="Derechos de las personas">
                <p>
                  Podés solicitar el acceso, la rectificación o la eliminación de tus datos escribiendo a {email}, en
                  los términos de la Ley 25.326 de Protección de Datos Personales de la República Argentina.
                </p>
              </Block>

              <Block title="Cambios">
                <p>
                  Esta política puede actualizarse si cambia el funcionamiento del sitio. Última actualización:{" "}
                  {siteConfig.privacyPolicyUpdated}.
                </p>
              </Block>
            </div>

            <p className="mt-14">
              <Link href="/" className={linkClass}>
                Volver al inicio
              </Link>
            </p>
          </div>
        </Container>
      </main>
      <Footer basePath="/" />
    </>
  );
}
