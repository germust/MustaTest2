"use client";

import { useEffect } from "react";

/**
 * Activa la aparición suave de los elementos con `data-reveal` cuando ingresan
 * al viewport. Un solo observador para toda la página; sin dependencias.
 * Con prefers-reduced-motion los elementos se muestran sin animación (ver CSS).
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
