import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tinywiki.vercel.app"),

  title: {
    default: "TinyWiki",
    template: "%s | TinyWiki",
  },

  description:
    "Wiki minimalista de sustentabilidad y tiny houses (Argentina / LATAM). Contenido curado con fuentes + datos estructurados para análisis y BI.",

  openGraph: {
    type: "website",
    url: "https://tinywiki.vercel.app",
    siteName: "TinyWiki",
    title: "TinyWiki",
    description:
      "Wiki minimalista de sustentabilidad y tiny houses (Argentina / LATAM). Contenido curado con fuentes + datos estructurados para análisis y BI.",
    locale: "es_AR",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "TinyWiki – Sustainability and off-grid knowledge",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TinyWiki",
    description:
      "Wiki minimalista de sustentabilidad y tiny houses (Argentina / LATAM).",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}