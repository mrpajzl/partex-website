import type { Metadata } from "next";
import { absoluteUrl, pricingSeo, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pricingSeo.title },
  description: pricingSeo.description,
  alternates: {
    canonical: "/cenik",
  },
  openGraph: {
    title: pricingSeo.title,
    description: pricingSeo.description,
    url: "/cenik",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
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
    title: pricingSeo.title,
    description: pricingSeo.description,
    images: [absoluteUrl(siteConfig.logo?.src ?? siteConfig.heroImage.src)],
  },
};

export default function CenikLayout({ children }: { children: React.ReactNode }) {
  return children;
}
