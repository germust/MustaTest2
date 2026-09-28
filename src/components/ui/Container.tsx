import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Ancho máximo de contenido (1200 px) con márgenes laterales responsivos. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1248px] px-5 sm:px-8 lg:px-6", className)}>{children}</div>;
}
