import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header basePath="/" />
      <main id="contenido" tabIndex={-1} className="bg-ivory pt-[68px] focus:shadow-none focus:outline-none lg:pt-[84px]">
        <Container className="py-24 sm:py-32">
          <p className="mb-5 flex items-center gap-3 text-eyebrow font-semibold uppercase text-teal-dark">
            <span className="h-px w-8 bg-teal" aria-hidden="true" />
            Error 404
          </p>
          <h1 className="text-h2 font-bold text-navy">No encontramos esta página</h1>
          <p className="mt-5 max-w-xl text-lead text-muted">Es posible que la dirección haya cambiado o no exista.</p>
          <Link
            href="/"
            className="mt-10 inline-flex min-h-12 items-center justify-center rounded-[10px] bg-teal px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-teal-dark"
          >
            Volver al inicio
          </Link>
        </Container>
      </main>
      <Footer basePath="/" />
    </>
  );
}
