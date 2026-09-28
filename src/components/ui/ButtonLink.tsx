import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "secondary-dark" | "text" | "text-dark";

const variants: Record<Variant, string> = {
  primary: "bg-teal text-white hover:bg-teal-dark",
  secondary: "border border-teal text-teal-dark hover:bg-surface",
  "secondary-dark": "border border-teal-light text-white hover:bg-white/10",
  text: "text-teal-dark hover:text-navy",
  "text-dark": "text-teal-light hover:text-white",
};

const isButtonVariant = (variant: Variant) => !variant.startsWith("text");

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Ícono al final (por ejemplo una flecha). */
  icon?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/**
 * Enlace con estilo de botón. Los enlaces externos (http/https) se abren en
 * una pestaña nueva de forma segura y lo anuncian a lectores de pantalla.
 */
export function ButtonLink({ href, children, variant = "primary", icon, className, ...rest }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={rest["aria-label"]}
      className={cn(
        "group inline-flex items-center gap-2 font-semibold transition-colors duration-200",
        isButtonVariant(variant)
          ? "min-h-12 justify-center rounded-[10px] px-6 py-3 text-[0.975rem] leading-tight"
          : "rounded-sm text-[0.975rem] leading-snug",
        variants[variant],
        className,
      )}
    >
      {children}
      {icon ? (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {external && !rest["aria-label"] ? <span className="sr-only"> (se abre en una pestaña nueva)</span> : null}
    </a>
  );
}
