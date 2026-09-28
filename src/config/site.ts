/**
 * Configuración central de Must Consulting.
 *
 * Todos los datos de la empresa, contacto, enlaces, dominio y archivos de marca
 * se definen acá. Los componentes leen estos valores: no hace falta editar
 * cada sección para cambiar un teléfono, un correo o una URL.
 *
 * Los valores marcados como PENDIENTE están listos para completarse.
 */

/**
 * Dominio del sitio (canonical, sitemap, Open Graph, JSON-LD).
 *
 * PENDIENTE: definir el dominio definitivo en la variable de entorno
 * NEXT_PUBLIC_SITE_URL (por ejemplo, en Vercel → Settings → Environment Variables).
 * Mientras tanto, en Vercel se usa automáticamente el dominio de producción del
 * proyecto y, en local, http://localhost:3000.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) return `https://${vercelProduction}`;

  return "http://localhost:3000";
}

/**
 * Recorte del lienzo de los archivos del logo.
 *
 * El SVG oficial tiene un lienzo de 2172 × 724 con margen vacío alrededor del
 * logotipo. El componente <Logo> muestra solo esta zona mediante CSS, sin
 * modificar el archivo. Si se reemplaza el archivo por uno sin margen, usar
 * `crop: null`.
 */
const officialLogoCrop = { x: 349, y: 125, width: 1445, height: 478 };

const founder = {
  name: "Germán Mustafha",
  firstName: "Germán",
  role: "Ingeniero Industrial",
} as const;

export const siteConfig = {
  name: "Must Consulting",
  tagline: "Procesos, datos y cumplimiento para crecer con orden y confianza.",
  url: resolveSiteUrl(),
  language: "es-AR",
  locale: "es_AR",

  founder,

  location: {
    city: "Rosario",
    region: "Santa Fe",
    country: "Argentina",
    countryCode: "AR",
    short: "Rosario, Argentina",
    full: "Rosario, Santa Fe, Argentina",
  },

  contact: {
    email: "germust.cs@gmail.com",
    whatsapp: {
      /** Número tal como se muestra en pantalla. */
      display: "+54 341 6715384",
      /**
       * Número para los enlaces https://wa.me/ (solo dígitos, con código de país).
       * Verificar: la tarjeta de presentación usa 5493416715384 (con 9).
       */
      number: "543416715384",
    },
  },

  social: {
    /**
     * PENDIENTE: URL del perfil de LinkedIn, por ejemplo
     * "https://www.linkedin.com/in/usuario/". Mientras esté vacía, el enlace no
     * se muestra en la página. Al completarla aparece en Sobre Must, Contacto,
     * Footer y en los datos estructurados (JSON-LD).
     */
    linkedin: "",
  },

  /** Archivos de marca ubicados en /public/brand. */
  brand: {
    logoPrimary: {
      src: "/brand/Must_Consulting_Logo_Vector.svg",
      width: 2172,
      height: 724,
      crop: officialLogoCrop as typeof officialLogoCrop | null,
    },
    /**
     * PROVISIONAL: versión negativa derivada del logo oficial (mismos trazados;
     * el azul pasa a blanco). Reemplazar por el archivo negativo oficial.
     */
    logoNegative: {
      src: "/brand/logo-negative-provisional.svg",
      width: 2172,
      height: 724,
      crop: officialLogoCrop as typeof officialLogoCrop | null,
    },
    /**
     * PROVISIONAL: monograma derivado del logo oficial ("M" y cuadrado).
     * Se usa como favicon. Reemplazar por el monograma oficial.
     */
    monogram: "/brand/monogram-provisional.svg",
    ogImage: {
      src: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Must Consulting. Procesos, datos y cumplimiento para crecer con orden y confianza.",
    },
  },

  seo: {
    title: "Must Consulting | Procesos, datos y cumplimiento para PyMEs",
    description:
      "Consultoría en mejora de procesos, Power BI, automatización, ISO 9001 y preparación para SOC 2 para PyMEs de Rosario y Argentina.",
    keywords: [
      "Consultoría para PyMEs",
      "Mejora de procesos",
      "Consultoría de procesos en Rosario",
      "Power BI",
      "Automatización",
      "Transformación digital",
      "ISO 9001",
      "SOC 2",
      "Sistemas de gestión",
      "Cumplimiento",
      "Indicadores de gestión",
      "Mejora continua",
    ],
  },

  /** Mensajes precargados de WhatsApp de uso general. */
  whatsappMessages: {
    general: `Hola ${founder.firstName}, vi la página de Must Consulting y quisiera conversar sobre una necesidad de mi empresa.`,
  },

  /**
   * Formulario de contacto.
   *
   * Sin configuración, el formulario prepara un mensaje de WhatsApp o un correo
   * con los datos ingresados: el sitio no almacena ni envía datos por su cuenta.
   *
   * Para enviar a un servicio (Formspree u otro compatible), definir la variable
   * de entorno NEXT_PUBLIC_CONTACT_FORM_ENDPOINT. Ver README → "Formulario".
   */
  contactForm: {
    endpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || "",
  },

  /** Fecha de la última revisión de la política de privacidad. */
  privacyPolicyUpdated: "28 de septiembre de 2026",
} as const;

export type SiteConfig = typeof siteConfig;
