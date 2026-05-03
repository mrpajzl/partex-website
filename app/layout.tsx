import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/lib/convex";
import { absoluteUrl, homepageSeo, organizationJsonLd, siteConfig, websiteJsonLd } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homepageSeo.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: homepageSeo.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.seo.keywords],
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
        url: absoluteUrl(siteConfig.logo?.src ?? siteConfig.heroImage.src),
        width: siteConfig.logo?.width ?? siteConfig.heroImage.width,
        height: siteConfig.logo?.height ?? siteConfig.heroImage.height,
        alt: siteConfig.logo?.alt ?? siteConfig.heroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageSeo.title,
    description: homepageSeo.description,
    images: [absoluteUrl(siteConfig.logo?.src ?? siteConfig.heroImage.src)],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: siteConfig.theme.primary,
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
        <Analytics />
      </body>
    </html>
  );
}
