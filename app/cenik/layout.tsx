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
        url: absoluteUrl("/partex-logo.png"),
        width: 1116,
        height: 302,
        alt: "Logo Partex real s. r. o.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pricingSeo.title,
    description: pricingSeo.description,
    images: [absoluteUrl("/partex-logo.png")],
  },
};

export default function CenikLayout({ children }: { children: React.ReactNode }) {
  return children;
}
