/**
 * Textos del sitio. Se mantienen separados de los componentes para poder
 * revisarlos y editarlos en un solo lugar.
 *
 * Los íconos se indican con una clave (ver src/components/ui/icons.tsx).
 */
import { siteConfig } from "@/config/site";

const greeting = `Hola ${siteConfig.founder.firstName},`;

export type IconKey =
  | "workflow"
  | "chart"
  | "automation"
  | "shield"
  | "search"
  | "layers"
  | "calendar";

export const navigation = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "como-trabajamos", label: "Cómo trabajamos" },
  { id: "sobre-must", label: "Sobre Must" },
  { id: "contacto", label: "Contacto" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];

export const ctaLabels = {
  meeting: "Coordinar una reunión",
  services: "Conocer los servicios",
  whatsapp: "Escribir por WhatsApp",
  email: "Enviar un email",
  consultService: "Consultar por este servicio",
  consultModel: "Consultar por esta modalidad",
} as const;

export const hero = {
  eyebrow: "CONSULTORÍA PARA PyMEs",
  title: siteConfig.tagline,
  lead: "Ayudamos a empresas a ordenar su gestión, mejorar sus procesos, utilizar mejor la información y desarrollar sistemas de cumplimiento que puedan sostener en el tiempo.",
  highlights: [
    { icon: "workflow", label: "Procesos" },
    { icon: "chart", label: "Datos y Power BI" },
    { icon: "automation", label: "Automatización" },
    { icon: "shield", label: "ISO 9001 · SOC 2" },
  ] satisfies { icon: IconKey; label: string }[],
};

export const problems = {
  title: "Problemas que aparecen cuando la empresa crece",
  intro: "La operación puede crecer más rápido que los procesos, los controles y la información.",
  items: [
    "Demoras, errores y tareas repetitivas",
    "Información distribuida en diferentes archivos",
    "Reportes que requieren demasiado trabajo manual",
    "Conocimiento concentrado en pocas personas",
    "Procesos sin responsables claros",
    "Falta de indicadores confiables",
    "Documentación desactualizada",
    "Requerimientos normativos difíciles de organizar",
  ],
  closing: "¿Reconocés alguna de estas situaciones en tu empresa?",
  closingCta: "Conversemos",
};

export type Service = {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: IconKey;
  whatsappMessage: string;
  note?: string;
};

export const services = {
  eyebrow: "Servicios",
  title: "Soluciones adaptadas a cada etapa de la empresa",
  intro: "Cuatro áreas de trabajo que pueden abordarse por separado o de forma combinada, según las prioridades y los recursos de cada empresa.",
  items: [
    {
      id: "procesos",
      title: "Procesos y operaciones",
      description:
        "Relevamos cómo se trabaja hoy y rediseñamos los procesos para que las tareas, los responsables y los controles queden claros.",
      icon: "workflow",
      items: [
        "Diagnóstico y relevamiento de procesos",
        "Mapeo y rediseño de procesos",
        "Identificación de cuellos de botella",
        "Reducción de errores, demoras y retrabajos",
        "Definición de funciones y responsabilidades",
        "Procedimientos e instructivos operativos",
        "Planes de mejora continua",
      ],
      whatsappMessage: `${greeting} quisiera recibir más información sobre el servicio de mejora de procesos.`,
    },
    {
      id: "datos",
      title: "Datos y Power BI",
      description:
        "Ordenamos la información disponible y construimos indicadores y tableros que ayudan a seguir la operación y a tomar decisiones.",
      icon: "chart",
      items: [
        "Definición de indicadores y métricas",
        "Diseño de tableros en Power BI",
        "Consolidación de información dispersa",
        "Automatización de reportes",
        "Mejora de controles operativos",
        "Información clara para la toma de decisiones",
      ],
      whatsappMessage: `${greeting} quisiera recibir más información sobre el servicio de datos y tableros en Power BI.`,
    },
    {
      id: "automatizacion",
      title: "Automatización y transformación digital",
      description:
        "Reducimos el trabajo manual y repetitivo con soluciones proporcionadas al tamaño, los recursos y la madurez de cada empresa.",
      icon: "automation",
      items: [
        "Identificación de tareas manuales repetitivas",
        "Automatización de tareas, reportes y controles",
        "Integración y mejora de herramientas existentes",
        "Digitalización de procesos administrativos y operativos",
        "Soluciones adaptadas al tamaño y madurez de cada empresa",
      ],
      whatsappMessage: `${greeting} quisiera recibir más información sobre el servicio de automatización y transformación digital.`,
    },
    {
      id: "cumplimiento",
      title: "Sistemas de gestión y cumplimiento",
      description:
        "Acompañamos la implementación y mejora de sistemas de gestión y la preparación para auditorías y requerimientos de cumplimiento.",
      icon: "shield",
      items: [
        "Implementación y mejora de sistemas de gestión ISO 9001",
        "Preparación y acompañamiento para SOC 2",
        "Diseño y seguimiento de controles",
        "Gestión de riesgos",
        "Desarrollo y revisión de políticas y procedimientos",
        "Organización de evidencias de cumplimiento",
        "Gestión de proveedores",
        "Preparación para auditorías internas y externas",
      ],
      note: "Must Consulting no es una entidad certificadora. La certificación la otorgan organismos o auditores independientes.",
      whatsappMessage: `${greeting} quisiera recibir más información sobre el servicio de sistemas de gestión y cumplimiento.`,
    },
  ] satisfies Service[],
};

export const method = {
  eyebrow: "Cómo trabajamos",
  title: "Un método simple, con entregables claros",
  intro:
    "Partimos del problema real y trabajamos con las personas involucradas para dejar herramientas que el equipo pueda sostener.",
  steps: [
    {
      number: "01",
      title: "Diagnosticar",
      description: "Objetivos, entrevistas, información disponible y situación actual.",
    },
    {
      number: "02",
      title: "Diseñar",
      description: "Procesos, indicadores, controles y plan de mejora.",
    },
    {
      number: "03",
      title: "Implementar",
      description: "Cambios acordados, documentación, automatizaciones y tableros.",
    },
    {
      number: "04",
      title: "Acompañar",
      description: "Seguimiento, ajustes y transferencia de conocimiento al equipo.",
    },
  ],
};

export const engagementModels = {
  eyebrow: "Modalidades",
  title: "Una modalidad adecuada para cada necesidad",
  note: "El alcance de cada propuesta se define después de una primera conversación, según la necesidad y las prioridades de la empresa.",
  items: [
    {
      id: "diagnostico",
      title: "Diagnóstico puntual",
      description:
        "Para entender la situación actual, identificar prioridades y definir un plan inicial.",
      icon: "search",
      whatsappMessage: `${greeting} quisiera conversar sobre un diagnóstico puntual para mi empresa.`,
    },
    {
      id: "proyecto",
      title: "Proyecto de implementación",
      description:
        "Para desarrollar e implementar procesos, tableros, automatizaciones o sistemas de gestión.",
      icon: "layers",
      whatsappMessage: `${greeting} quisiera conversar sobre un proyecto de implementación para mi empresa.`,
    },
    {
      id: "acompanamiento",
      title: "Acompañamiento mensual",
      description:
        "Para empresas que necesitan seguimiento, soporte y mejora continua.",
      icon: "calendar",
      whatsappMessage: `${greeting} quisiera conversar sobre un acompañamiento mensual para mi empresa.`,
    },
  ] satisfies {
    id: string;
    title: string;
    description: string;
    icon: IconKey;
    whatsappMessage: string;
  }[],
};

export const about = {
  eyebrow: "Sobre Must",
  title: "Experiencia técnica con una mirada práctica",
  paragraphs: [
    `Must Consulting fue creada por ${siteConfig.founder.name}, ${siteConfig.founder.role} especializado en procesos, datos y mejora de operaciones. Su experiencia combina industria, consultoría, análisis de información, transformación digital y sistemas de gestión.`,
    "El enfoque parte de comprender cómo trabaja realmente cada empresa y desarrollar soluciones proporcionadas a su tamaño, necesidades y recursos.",
  ],
  experienceLabel: "Experiencia en",
  experience: [
    "Industria",
    "Consultoría",
    "Análisis de información",
    "Transformación digital",
    "Sistemas de gestión",
  ],
  principlesLabel: "Enfoque de trabajo",
  principles: [
    "Comprender cómo trabaja realmente cada empresa",
    "Soluciones proporcionadas a su tamaño y recursos",
    "Herramientas que el equipo pueda sostener",
  ],
};

export const contact = {
  eyebrow: "Contacto",
  title: "Hablemos sobre el próximo desafío de tu empresa",
  intro:
    "Coordinemos una conversación breve para entender la necesidad y definir qué tipo de acompañamiento puede resultar más adecuado.",
  formTitle: "Contanos brevemente la necesidad",
  formIntro: "Los campos marcados con * son obligatorios.",
};
