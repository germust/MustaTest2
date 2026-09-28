"use client";

import { ChevronDown, CircleAlert, CircleCheck, Mail, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import {
  buildMailtoLink,
  buildWhatsappLink,
  fieldLimits,
  hasFormEndpoint,
  sanitizeContactForm,
  submitToEndpoint,
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
  type ContactFormField,
} from "@/lib/contact-form";
import { generalWhatsappUrl } from "@/lib/links";
import { cn } from "@/lib/cn";

type Status =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "opened"; channel: "whatsapp" | "email"; href: string }
  | { type: "sent" }
  | { type: "error" };

const emptyForm: ContactFormData = { name: "", company: "", contact: "", service: "", message: "" };

const fields: Record<ContactFormField, { id: string; label: string; required: boolean }> = {
  name: { id: "contacto-nombre", label: "Nombre", required: true },
  company: { id: "contacto-empresa", label: "Empresa", required: false },
  contact: { id: "contacto-medio", label: "Correo o WhatsApp", required: true },
  service: { id: "contacto-servicio", label: "Servicio de interés", required: false },
  message: { id: "contacto-mensaje", label: "Mensaje", required: true },
};

const fieldOrder = Object.keys(fields) as ContactFormField[];

const controlClass =
  "block w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[1rem] leading-normal text-navy transition-colors duration-200 placeholder:text-muted hover:border-muted/60 focus:border-teal aria-[invalid=true]:border-navy aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-navy";

function FieldShell({
  field,
  error,
  hint,
  children,
}: {
  field: ContactFormField;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  const { id, label, required } = fields[field];
  return (
    <div data-field={field}>
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-medium text-navy">
        {label}
        {required ? (
          <>
            <span className="ml-0.5 text-teal-dark" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (obligatorio)</span>
          </>
        ) : (
          <span className="ml-1.5 text-small font-normal text-muted">(opcional)</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-ayuda`} className="-mt-1 mb-2 text-small text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-small font-medium text-navy">
          <CircleAlert size={17} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            <span className="sr-only">Error: </span>
            {error}
          </span>
        </p>
      ) : null}
    </div>
  );
}

function describedBy(field: ContactFormField, error?: string, hasHint = false): string | undefined {
  const { id } = fields[field];
  const ids = [hasHint ? `${id}-ayuda` : "", error ? `${id}-error` : ""].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function ContactForm({ serviceOptions }: { serviceOptions: string[] }) {
  const [values, setValues] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);

  const errorList = fieldOrder.filter((field) => errors[field]);

  // Tras un envío con errores, el foco pasa al resumen de errores.
  useEffect(() => {
    if (attempts > 0) summaryRef.current?.focus();
  }, [attempts]);

  function update(field: ContactFormField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Una vez intentado el envío, los errores se actualizan mientras se corrige.
    if (attempts > 0) {
      setErrors(validateContactForm(sanitizeContactForm(next)));
    }
    if (status.type === "opened" || status.type === "error") setStatus({ type: "idle" });
  }

  // Los enlaces del resumen llevan el foco al campo y dejan visible su etiqueta.
  function focusField(event: MouseEvent<HTMLAnchorElement>, field: ContactFormField) {
    const control = document.getElementById(fields[field].id);
    if (!control) return;
    event.preventDefault();
    control.focus({ preventScroll: true });
    control.closest("[data-field]")?.scrollIntoView({ block: "center" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.type === "sending") return;

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = submitter?.value === "email" ? "email" : "whatsapp";

    const data = sanitizeContactForm(values);
    const found = validateContactForm(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus({ type: "idle" });
      setAttempts((count) => count + 1);
      return;
    }

    if (hasFormEndpoint) {
      setStatus({ type: "sending" });
      try {
        const ok = await submitToEndpoint(data, honeypot);
        if (ok) {
          setValues(emptyForm);
          setStatus({ type: "sent" });
        } else {
          setStatus({ type: "error" });
        }
      } catch {
        setStatus({ type: "error" });
      }
      return;
    }

    if (channel === "email") {
      const href = buildMailtoLink(data);
      setStatus({ type: "opened", channel, href });
      window.location.href = href;
    } else {
      const href = buildWhatsappLink(data);
      setStatus({ type: "opened", channel, href });
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  const sending = status.type === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8" aria-describedby="contacto-privacidad">
      {errorList.length > 0 && attempts > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="group"
          aria-labelledby="contacto-errores-titulo"
          className="mb-8 rounded-[10px] border border-navy bg-ivory p-5"
        >
          <p id="contacto-errores-titulo" className="flex items-center gap-2 font-semibold text-navy">
            <CircleAlert size={19} strokeWidth={1.75} aria-hidden="true" />
            Revisá {errorList.length === 1 ? "el siguiente campo" : `los siguientes ${errorList.length} campos`}:
          </p>
          <ul className="mt-3 space-y-1.5 pl-7 text-small">
            {errorList.map((field) => (
              <li key={field}>
                <a
                  href={`#${fields[field].id}`}
                  onClick={(event) => focusField(event, field)}
                  className="font-medium text-teal-dark underline underline-offset-4 hover:text-navy"
                >
                  {fields[field].label}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldShell field="name" error={errors.name}>
          <input
            id={fields.name.id}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={fieldLimits.name}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name", errors.name)}
            className={controlClass}
          />
        </FieldShell>

        <FieldShell field="company" error={errors.company}>
          <input
            id={fields.company.id}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={fieldLimits.company}
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy("company", errors.company)}
            className={controlClass}
          />
        </FieldShell>

        <FieldShell field="contact" error={errors.contact} hint="Un correo o un número con código de área.">
          <input
            id={fields.contact.id}
            name="contact"
            type="text"
            autoComplete="email"
            required
            maxLength={fieldLimits.contact}
            value={values.contact}
            onChange={(event) => update("contact", event.target.value)}
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={describedBy("contact", errors.contact, true)}
            className={controlClass}
          />
        </FieldShell>

        <FieldShell field="service" error={errors.service} hint="Podés dejarlo sin completar.">
          <div className="relative">
            <select
              id={fields.service.id}
              name="service"
              value={values.service}
              onChange={(event) => update("service", event.target.value)}
              aria-describedby={describedBy("service", errors.service, true)}
              className={cn(controlClass, "appearance-none pr-11")}
            >
              <option value="">Seleccioná una opción</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown size={18} strokeWidth={1.75} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          </div>
        </FieldShell>

        <div className="sm:col-span-2">
          <FieldShell field="message" error={errors.message}>
            <textarea
              id={fields.message.id}
              name="message"
              rows={5}
              required
              maxLength={fieldLimits.message}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy("message", errors.message)}
              className={cn(controlClass, "min-h-36 resize-y")}
            />
          </FieldShell>
        </div>
      </div>

      {hasFormEndpoint ? (
        // Campo trampa para bots: oculto para personas y tecnologías de asistencia.
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contacto-web">No completar este campo</label>
          <input
            id="contacto-web"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {hasFormEndpoint ? (
          <button
            type="submit"
            aria-disabled={sending}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-teal px-6 py-3 text-[0.975rem] font-semibold text-white transition-colors duration-200 hover:bg-teal-dark aria-disabled:cursor-progress aria-disabled:opacity-80"
          >
            <Send size={18} strokeWidth={1.75} aria-hidden="true" />
            {sending ? "Enviando…" : "Enviar consulta"}
          </button>
        ) : (
          <>
            <button
              type="submit"
              name="channel"
              value="whatsapp"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-teal px-6 py-3 text-[0.975rem] font-semibold text-white transition-colors duration-200 hover:bg-teal-dark"
            >
              <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
              Enviar por WhatsApp
            </button>
            <button
              type="submit"
              name="channel"
              value="email"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-teal px-6 py-3 text-[0.975rem] font-semibold text-teal-dark transition-colors duration-200 hover:bg-surface"
            >
              <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
              Preparar un email
            </button>
          </>
        )}
      </div>

      <div role="status" aria-live="polite">
        {status.type === "opened" ? (
          <p className="mt-6 flex items-start gap-2.5 rounded-[10px] bg-ivory p-4 text-small text-navy">
            <CircleCheck size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-teal-dark" aria-hidden="true" />
            <span>
              {status.channel === "whatsapp"
                ? "Se abrió WhatsApp con tu mensaje listo para enviar. "
                : "Se abrió tu aplicación de correo con el mensaje listo para enviar. "}
              Si no se abrió,{" "}
              <a
                href={status.href}
                {...(status.channel === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-medium text-teal-dark underline underline-offset-4 hover:text-navy"
              >
                usá este enlace
              </a>
              {status.channel === "email" ? ` o escribí a ${siteConfig.contact.email}` : ""}.
            </span>
          </p>
        ) : null}
        {status.type === "sent" ? (
          <p className="mt-6 flex items-start gap-2.5 rounded-[10px] bg-ivory p-4 text-small text-navy">
            <CircleCheck size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-teal-dark" aria-hidden="true" />
            <span>Gracias. Recibimos tu consulta y te vamos a responder por el medio que indicaste.</span>
          </p>
        ) : null}
        {status.type === "error" ? (
          <p className="mt-6 flex items-start gap-2.5 rounded-[10px] border border-navy bg-ivory p-4 text-small text-navy">
            <CircleAlert size={18} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              No pudimos enviar el formulario. Probá nuevamente o escribinos por{" "}
              <a href={generalWhatsappUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-teal-dark underline underline-offset-4">
                WhatsApp
              </a>{" "}
              o a{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-teal-dark underline underline-offset-4">
                {siteConfig.contact.email}
              </a>
              .
            </span>
          </p>
        ) : null}
      </div>

      <p id="contacto-privacidad" className="mt-6 text-small text-muted">
        {hasFormEndpoint
          ? "Los datos se envían a través de un servicio de formularios y se usan solo para responder tu consulta. "
          : "Al enviar se abre WhatsApp o tu aplicación de correo con el mensaje listo. El sitio no almacena estos datos. "}
        <Link href="/privacidad" className="font-medium text-teal-dark underline underline-offset-4 hover:text-navy">
          Política de privacidad
        </Link>
        .
      </p>
    </form>
  );
}
