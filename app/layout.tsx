import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/lib/convex";
import { absoluteUrl, homepageSeo, organizationJsonLd, siteConfig, websiteJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homepageSeo.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: homepageSeo.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
    languages: {
      "cs-CZ": "/",
    },
  },
  category: "AccountingService",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: homepageSeo.title,
    description: homepageSeo.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [
      {
        url: absoluteUrl("/partex-logo.png"),
        width: 1116,
        height: 302,
        alt: "Logo Partex real s. r. o.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageSeo.title,
    description: homepageSeo.description,
    images: [absoluteUrl("/partex-logo.png")],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#5865F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
