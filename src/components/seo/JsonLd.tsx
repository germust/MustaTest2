import { services } from "@/config/content";
import { siteConfig } from "@/config/site";

/**
 * Datos estructurados (schema.org) del tipo ProfessionalService.
 * Solo incluye información real provista por la empresa; no hay dirección
 * física porque no fue definida.
 */
export function JsonLd() {
  const { url, name, founder, location, contact, social, brand, seo } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}/#organizacion`,
    name,
    description: seo.description,
    slogan: siteConfig.tagline,
    url,
    logo: `${url}${brand.logoPrimary.src}`,
    image: `${url}${brand.ogImage.src}`,
    email: contact.email,
    telephone: contact.whatsapp.display,
    inLanguage: siteConfig.language,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.countryCode,
    },
    areaServed: [
      { "@type": "City", name: location.city },
      { "@type": "Country", name: location.country },
    ],
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      ...(social.linkedin ? { sameAs: [social.linkedin] } : {}),
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: contact.email,
      telephone: contact.whatsapp.display,
      areaServed: location.countryCode,
      availableLanguage: "Spanish",
    },
    knowsAbout: seo.keywords,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de consultoría",
      itemListElement: services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.description },
      })),
    },
    ...(social.linkedin ? { sameAs: [social.linkedin] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // Se escapa "<" para evitar inyección de HTML (recomendación de Next.js).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
