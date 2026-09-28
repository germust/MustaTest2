import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.seo.description,
    lang: siteConfig.language,
    start_url: "/",
    display: "browser",
    background_color: "#F7F8F6",
    theme_color: "#122332",
    icons: [
      { src: siteConfig.brand.monogram, sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
