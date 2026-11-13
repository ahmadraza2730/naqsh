import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource-variable/bodoni-moda/opsz-italic.css";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource/noto-nastaliq-urdu/arabic-400.css";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Graphic design studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "graphic design Pakistan",
    "logo design Islamabad",
    "brand identity",
    "social media design",
    "packaging design",
    "Naqsh studio",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_PK",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#081626",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
