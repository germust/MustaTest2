/**
 * Lógica del formulario de contacto, separada de la interfaz.
 *
 * Modos de envío:
 * - Sin configuración: se arma un mensaje de WhatsApp o un correo con los datos
 *   ingresados. El sitio no almacena ni transmite datos por su cuenta.
 * - Con NEXT_PUBLIC_CONTACT_FORM_ENDPOINT: se envía un POST en JSON al servicio
 *   configurado (compatible con Formspree). Ver README → "Formulario".
 */
import { siteConfig } from "@/config/site";
import { mailtoUrl, whatsappUrl } from "@/lib/links";

export type ContactFormData = {
  name: string;
  company: string;
  contact: string;
  service: string;
  message: string;
};

export type ContactFormField = keyof ContactFormData;
export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export const fieldLimits: Record<ContactFormField, number> = {
  name: 80,
  company: 120,
  contact: 120,
  service: 80,
  message: 1500,
};

// Caracteres de control (excepto saltos de línea y tabulaciones) y caracteres
// invisibles de formato que no deberían llegar al mensaje.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁠-⁤﻿]/g;
const ANGLE_BRACKETS = /[<>]/g;

/** Normaliza un texto de una línea: sin caracteres de control ni espacios repetidos. */
function cleanLine(value: string, max: number): string {
  return value
    .normalize("NFC")
    .replace(CONTROL_CHARS, "")
    .replace(ANGLE_BRACKETS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** Normaliza un texto multilínea conservando párrafos. */
function cleanMultiline(value: string, max: number): string {
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(ANGLE_BRACKETS, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

export function sanitizeContactForm(raw: Record<ContactFormField, unknown>): ContactFormData {
  const text = (value: unknown) => (typeof value === "string" ? value : "");
  return {
    name: cleanLine(text(raw.name), fieldLimits.name),
    company: cleanLine(text(raw.company), fieldLimits.company),
    contact: cleanLine(text(raw.contact), fieldLimits.contact),
    service: cleanLine(text(raw.service), fieldLimits.service),
    message: cleanMultiline(text(raw.message), fieldLimits.message),
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidPhone(value: string): boolean {
  if (!/^\+?[\d\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (data.name.length < 2) {
    errors.name = "Ingresá tu nombre.";
  }

  if (!data.contact) {
    errors.contact = "Ingresá un correo electrónico o un número de WhatsApp.";
  } else if (data.contact.includes("@")) {
    if (!EMAIL_PATTERN.test(data.contact)) {
      errors.contact = "El correo electrónico no parece válido. Revisá que tenga el formato nombre@dominio.com.";
    }
  } else if (!isValidPhone(data.contact)) {
    errors.contact = "El número no parece válido. Incluí el código de área, por ejemplo +54 341 1234567.";
  }

  if (data.message.length < 10) {
    errors.message = "Contanos brevemente la necesidad (al menos 10 caracteres).";
  }

  return errors;
}

function summaryLines(data: ContactFormData): string[] {
  const lines = [`Nombre: ${data.name}`];
  if (data.company) lines.push(`Empresa: ${data.company}`);
  lines.push(`Contacto: ${data.contact}`);
  if (data.service) lines.push(`Servicio de interés: ${data.service}`);
  lines.push("", data.message);
  return lines;
}

export function buildWhatsappLink(data: ContactFormData): string {
  const intro = `Hola ${siteConfig.founder.firstName}, te escribo desde la página de Must Consulting.`;
  return whatsappUrl([intro, "", ...summaryLines(data)].join("\n"));
}

export function buildMailtoLink(data: ContactFormData): string {
  const subject = data.company
    ? `Consulta desde el sitio: ${data.company}`
    : "Consulta desde el sitio de Must Consulting";
  return mailtoUrl({ subject, body: summaryLines(data).join("\n") });
}

export const hasFormEndpoint = siteConfig.contactForm.endpoint !== "";

/**
 * Envía los datos al servicio configurado. Devuelve true si el servicio
 * respondió correctamente.
 */
export async function submitToEndpoint(data: ContactFormData, honeypot: string): Promise<boolean> {
  if (!hasFormEndpoint) return false;
  const response = await fetch(siteConfig.contactForm.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      nombre: data.name,
      empresa: data.company,
      contacto: data.contact,
      servicio: data.service,
      mensaje: data.message,
      _subject: "Nueva consulta desde el sitio de Must Consulting",
      // Campo trampa para bots (Formspree lo descarta si tiene contenido).
      _gotcha: honeypot,
    }),
  });
  return response.ok;
}
