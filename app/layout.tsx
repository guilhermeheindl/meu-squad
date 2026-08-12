import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Growth X · Cockpit do Squad",
  description: "Central de informações do squad Growth X — flags, tratativas, metas e responsabilidades.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${outfit.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
