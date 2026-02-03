import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/lib/convex";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Partex Real - Účetní a daňové služby",
  description: "Profesionální účetní a daňové služby pro fyzické i právnické osoby. Mzdové služby, vedení účetnictví, daňové poradenství.",
  keywords: ["účetnictví", "daně", "mzdy", "poradenství", "Hradec Králové"],
  authors: [{ name: "Partex Real s.r.o." }],
  openGraph: {
    title: "Partex Real - Účetní a daňové služby",
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
