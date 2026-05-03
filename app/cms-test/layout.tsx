import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS test | Partex real",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CMSTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
