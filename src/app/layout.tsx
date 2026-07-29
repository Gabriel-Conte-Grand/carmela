import type { Metadata, Viewport } from "next";
import { Figtree, Caveat } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Carmela 15 · Pool Party",
  description:
    "Te invito a mi Pool Party de 15. Sábado 3 de octubre, de 12 a 17 hs.",
  openGraph: {
    title: "Carmela 15 · Pool Party",
    description:
      "Sábado 3 de octubre · 12 a 17 hs. Confirmá, sumá temas y vení a la pile.",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e7c86",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${figtree.variable} ${caveat.variable}`}>
        {children}
      </body>
    </html>
  );
}
