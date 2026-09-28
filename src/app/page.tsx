import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Problems } from "@/components/sections/Problems";
import { Services } from "@/components/sections/Services";
import { RevealObserver } from "@/components/ui/RevealObserver";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="focus:shadow-none focus:outline-none">
        <Hero />
        <Problems />
        <Services />
        <Method />
        <EngagementModels />
        <About />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
