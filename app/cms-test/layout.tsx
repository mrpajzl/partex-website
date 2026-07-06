import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: `CMS test | ${siteConfig.shortName}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function CMSTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
