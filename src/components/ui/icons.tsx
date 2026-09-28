import {
  CalendarSync,
  ChartColumn,
  Layers,
  ScanSearch,
  ShieldCheck,
  Workflow,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/config/content";

/** Íconos lineales asociados a las claves usadas en src/config/content.ts. */
export const iconMap: Record<IconKey, LucideIcon> = {
  workflow: Workflow,
  chart: ChartColumn,
  automation: Zap,
  shield: ShieldCheck,
  search: ScanSearch,
  layers: Layers,
  calendar: CalendarSync,
};

export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Component = iconMap[name];
  return <Component aria-hidden="true" {...props} />;
}

/**
 * Ícono lineal de LinkedIn. Lucide eliminó los íconos de marcas en su versión 1;
 * este trazado corresponde al ícono lineal histórico de Lucide (licencia ISC),
 * para mantener el mismo estilo que el resto.
 */
export function LinkedinIcon({ size = 24, strokeWidth = 2, className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
