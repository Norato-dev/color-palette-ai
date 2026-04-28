import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Palette AI — Generador de paletas con IA",
  description: "Describe un estilo y la IA genera tu paleta de colores lista para usar en CSS, Tailwind o Figma.",
  keywords: ["color palette", "AI", "design", "tailwind", "css", "generador de colores"],
  authors: [{ name: "David Norato", url: "https://davidnorato.dev" }],
  openGraph: {
    title: "Palette AI",
    description: "Genera paletas de colores con IA en segundos",
    url: "https://color.davidnorato.dev/",
    siteName: "Palette AI",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palette AI",
    description: "Genera paletas de colores con IA en segundos",
    creator: "@NoratoDev",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}