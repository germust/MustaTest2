import Image from "next/image";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** "primary" sobre fondos claros, "negative" sobre fondos azul marino. */
  variant?: "primary" | "negative";
  /** Definir el ancho con clases (por ejemplo "w-32"); la altura se calcula sola. */
  className?: string;
  alt?: string;
  preload?: boolean;
};

/**
 * Muestra el archivo oficial del logo sin modificarlo.
 *
 * El SVG original incluye margen vacío en su lienzo; este componente recorta
 * visualmente esa zona con CSS (overflow oculto), sin alterar trazados,
 * colores ni proporciones.
 */
export function Logo({ variant = "primary", className, alt = siteConfig.name, preload }: LogoProps) {
  const asset = variant === "negative" ? siteConfig.brand.logoNegative : siteConfig.brand.logoPrimary;
  const crop = asset.crop ?? { x: 0, y: 0, width: asset.width, height: asset.height };

  const imageStyle: CSSProperties = {
    position: "absolute",
    maxWidth: "none",
    height: "auto",
    width: `${(asset.width / crop.width) * 100}%`,
    left: `${(-crop.x / crop.width) * 100}%`,
    top: `${(-crop.y / crop.height) * 100}%`,
  };

  return (
    <span
      className={cn("relative block overflow-hidden", className)}
      style={{ aspectRatio: `${crop.width} / ${crop.height}` }}
    >
      <Image
        src={asset.src}
        alt={alt}
        width={asset.width}
        height={asset.height}
        unoptimized
        preload={preload}
        style={imageStyle}
      />
    </span>
  );
}
