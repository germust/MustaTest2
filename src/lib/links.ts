import { siteConfig } from "@/config/site";

/** Enlace de WhatsApp con un mensaje precargado opcional. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Enlace mailto con asunto y cuerpo opcionales. */
export function mailtoUrl(options: { subject?: string; body?: string } = {}): string {
  const params = new URLSearchParams();
  if (options.subject) params.set("subject", options.subject);
  if (options.body) params.set("body", options.body);
  // URLSearchParams codifica los espacios como "+", que algunos clientes de
  // correo muestran literalmente. Se reemplazan por %20.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${siteConfig.contact.email}${query ? `?${query}` : ""}`;
}

/** WhatsApp con el mensaje general del sitio. */
export const generalWhatsappUrl = whatsappUrl(siteConfig.whatsappMessages.general);

/** Correo con un asunto predefinido. */
export const generalMailtoUrl = mailtoUrl({ subject: "Consulta desde el sitio de Must Consulting" });
