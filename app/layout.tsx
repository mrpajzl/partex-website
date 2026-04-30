import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/lib/convex";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Partex real s. r. o. - Účetní a daňové služby",
  description: "Profesionální účetní a daňové služby pro fyzické i právnické osoby. Mzdové služby, vedení účetnictví, daňové poradenství.",
  keywords: ["účetnictví", "daně", "mzdy", "poradenství", "Hradec Králové"],
  authors: [{ name: "Partex real s. r. o." }],
  openGraph: {
    title: "Partex real s. r. o. - Účetní a daňové služby",
    description: "Profesionální účetní a daňové služby pro fyzické i právnické osoby",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
