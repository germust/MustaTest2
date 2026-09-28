import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "secondary-dark" | "text";

const variants: Record<Variant, string> = {
  primary: "bg-teal text-white hover:bg-teal-dark",
  secondary: "border border-teal text-teal-dark hover:bg-surface",
  "secondary-dark": "border border-teal-light text-white hover:bg-white/10",
  text: "text-teal-dark hover:text-navy",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Ícono antes del texto (por ejemplo WhatsApp o email). */
  leadingIcon?: ReactNode;
  /** Ícono al final (por ejemplo una flecha); se desplaza levemente al pasar el mouse. */
  icon?: ReactNode;
  className?: string;
};

/**
 * Enlace con estilo de botón. Los enlaces externos (http/https) se abren en
 * una pestaña nueva de forma segura y lo anuncian a lectores de pantalla.
 */
export function ButtonLink({ href, children, variant = "primary", leadingIcon, icon, className }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-2 font-semibold transition-colors duration-200",
        variant !== "text"
          ? "min-h-12 justify-center rounded-[10px] px-6 py-3 text-[0.975rem] leading-tight"
          : "rounded-sm text-[0.975rem] leading-snug",
        variants[variant],
        className,
      )}
    >
      {leadingIcon ? (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {icon ? (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {external ? <span className="sr-only"> (se abre en una pestaña nueva)</span> : null}
    </a>
  );
}
