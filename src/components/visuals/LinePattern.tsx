import { cn } from "@/lib/cn";

/**
 * Detalle decorativo de líneas finas y nodos (anillos concéntricos y una curva),
 * en línea con el hero. Se adapta a fondos claros u oscuros.
 */
export function LinePattern({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const ring = tone === "dark" ? "#FFFFFF" : "#D6E0E2";
  const ringOpacity = tone === "dark" ? 0.08 : 1;
  const curve = tone === "dark" ? "#7ED0C7" : "#2E7F7A";
  const node = tone === "dark" ? "#7ED0C7" : "#122332";

  return (
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("pointer-events-none", className)} aria-hidden="true" focusable="false">
      <circle cx="220" cy="100" r="96" stroke={ring} strokeOpacity={ringOpacity} strokeWidth="1.25" />
      <circle cx="220" cy="100" r="150" stroke={ring} strokeOpacity={ringOpacity} strokeWidth="1.25" />
      <path d="M20 250 C 90 196, 140 280, 200 214 S 280 120, 312 142" stroke={curve} strokeOpacity={tone === "dark" ? 0.55 : 0.7} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="200" cy="214" r="5" fill={node} fillOpacity={tone === "dark" ? 0.8 : 1} />
      <circle cx="312" cy="142" r="4" fill={curve} />
      <circle cx="20" cy="250" r="3.5" fill={curve} fillOpacity=".6" />
    </svg>
  );
}
