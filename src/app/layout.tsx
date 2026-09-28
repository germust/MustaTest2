import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const { seo, brand } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder.name }],
  creator: siteConfig.founder.name,
  publisher: siteConfig.name,
  category: "business",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: brand.ogImage.src,
        width: brand.ogImage.width,
        height: brand.ogImage.height,
        alt: brand.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [{ url: brand.ogImage.src, alt: brand.ogImage.alt }],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: brand.monogram, type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  other: {
    "geo.region": "AR-S",
    "geo.placename": siteConfig.location.city,
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F8F6",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.language} data-scroll-behavior="smooth" className={inter.variable}>
      <body>
        <a
          href="#contenido"
          className="sr-only rounded-[10px] bg-navy px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          Saltar al contenido
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
