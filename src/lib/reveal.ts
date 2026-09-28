import type { CSSProperties } from "react";

/** Retardo escalonado para elementos con `data-reveal`. */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
