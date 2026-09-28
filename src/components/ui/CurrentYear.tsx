"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

/**
 * Año actual para el copyright. Se calcula en el navegador, de modo que se
 * mantiene correcto aunque el sitio estático se haya generado el año anterior.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(subscribe, getYear, () => buildYear);
  return <>{year}</>;
}
