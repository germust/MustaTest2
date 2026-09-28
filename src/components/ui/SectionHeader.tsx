import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Encabezado de sección: etiqueta, título (h2) e introducción. */
export function SectionHeader({ id, eyebrow, title, intro, tone = "light", className }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-5 flex items-center gap-3 text-eyebrow font-semibold uppercase",
            dark ? "text-teal-light" : "text-teal-dark",
          )}
        >
          <span className={cn("h-px w-8", dark ? "bg-teal-light" : "bg-teal")} aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className={cn("text-h2 font-semibold", dark ? "text-white" : "text-navy")}>
        {title}
      </h2>
      {intro ? (
        <p className={cn("mt-5 text-lead", dark ? "text-line" : "text-muted")}>{intro}</p>
      ) : null}
    </div>
  );
}
