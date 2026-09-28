import { cn } from "@/lib/cn";

/**
 * Composición abstracta del hero: flujos de procesos, capas de documentos,
 * datos y puntos conectados. SVG liviano, sin imágenes externas.
 * Colores de la paleta institucional; movimiento muy leve y opcional.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-full motion-safe:animate-fade-up", className)}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="404" cy="232" r="190" fill="#E6EEEE" opacity=".62" />
      <circle cx="404" cy="232" r="146" stroke="#D6E0E2" strokeWidth="1.5" />

      {/* Flujos */}
      <path d="M16 404 C 92 342, 150 452, 240 402 S 424 222, 584 252" stroke="#2E7F7A" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M36 204 C 124 250, 212 186, 300 230 S 468 362, 584 332" stroke="#5B6873" strokeOpacity=".35" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M64 494 C 168 456, 252 522, 354 474 S 508 410, 588 440" stroke="#7ED0C7" strokeWidth="1.5" strokeLinecap="round" />

      {/* Capas de documentos */}
      <rect x="250" y="150" width="236" height="164" rx="12" fill="#FFFFFF" stroke="#D6E0E2" strokeWidth="1.25" />
      <rect x="226" y="176" width="236" height="164" rx="12" fill="#FFFFFF" stroke="#D6E0E2" strokeWidth="1.25" />
      <rect x="202" y="202" width="236" height="164" rx="12" fill="#FFFFFF" stroke="#D6E0E2" strokeWidth="1.25" />
      <rect x="224" y="226" width="84" height="7" rx="3.5" fill="#122332" />
      <rect x="224" y="242" width="124" height="5" rx="2.5" fill="#D6E0E2" />
      <line x1="224" y1="340" x2="332" y2="340" stroke="#D6E0E2" strokeWidth="1.25" />
      <rect x="226" y="310" width="14" height="30" rx="2" fill="#7ED0C7" />
      <rect x="248" y="294" width="14" height="46" rx="2" fill="#7ED0C7" />
      <rect x="270" y="302" width="14" height="38" rx="2" fill="#7ED0C7" />
      <rect x="292" y="278" width="14" height="62" rx="2" fill="#2E7F7A" />
      <rect x="314" y="286" width="14" height="54" rx="2" fill="#7ED0C7" />
      <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <rect x="354" y="276" width="12" height="12" rx="3" stroke="#2E7F7A" />
        <path d="M357 282.5 l2.2 2.2 4-4.4" stroke="#2E7F7A" />
        <rect x="372" y="279.5" width="44" height="5" rx="2.5" fill="#D6E0E2" />
        <rect x="354" y="300" width="12" height="12" rx="3" stroke="#2E7F7A" />
        <path d="M357 306.5 l2.2 2.2 4-4.4" stroke="#2E7F7A" />
        <rect x="372" y="303.5" width="36" height="5" rx="2.5" fill="#D6E0E2" />
        <rect x="354" y="324" width="12" height="12" rx="3" stroke="#D6E0E2" />
        <rect x="372" y="327.5" width="40" height="5" rx="2.5" fill="#D6E0E2" />
      </g>

      {/* Mapa de proceso */}
      <g className="motion-safe:animate-float-soft">
        <rect x="40" y="96" width="180" height="64" rx="12" fill="#FFFFFF" stroke="#D6E0E2" strokeWidth="1.25" />
        <g strokeWidth="1.5">
          <line x1="76" y1="128" x2="106" y2="128" stroke="#5B6873" strokeOpacity=".45" />
          <line x1="128" y1="128" x2="148" y2="128" stroke="#5B6873" strokeOpacity=".45" />
          <line x1="170" y1="128" x2="188" y2="128" stroke="#5B6873" strokeOpacity=".45" />
          <circle cx="68" cy="128" r="8" fill="#FFFFFF" stroke="#122332" />
          <rect x="106" y="120" width="22" height="16" rx="4" fill="#FFFFFF" stroke="#122332" />
          <path d="M159 117 l11 11 -11 11 -11 -11 z" fill="#FFFFFF" stroke="#2E7F7A" strokeLinejoin="round" />
          <circle cx="196" cy="128" r="8" fill="#2E7F7A" stroke="#2E7F7A" />
        </g>
      </g>

      {/* Nodos */}
      <circle cx="16" cy="404" r="4.5" fill="#7ED0C7" />
      <circle cx="133.3" cy="402.5" r="7" fill="#122332" />
      <circle cx="584" cy="252" r="5.5" fill="#2E7F7A" />
      <circle cx="103" cy="221.3" r="4.5" fill="#5B6873" fillOpacity=".5" />
      <circle cx="224" cy="489.4" r="5.5" fill="#2E7F7A" />
      <circle cx="450.7" cy="434.6" r="4.5" fill="#7ED0C7" />
      <circle cx="484.8" cy="253.4" r="7" fill="#FFFFFF" stroke="#2E7F7A" strokeWidth="1.75" />
      <circle cx="526.4" cy="337.8" r="6" fill="#122332" />
    </svg>
  );
}
