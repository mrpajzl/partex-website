import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.seo.homepageDescription,
    id: "/",
    lang: "cs-CZ",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "browser"],
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: siteConfig.theme.primary,
    categories: ["business", "finance", "productivity"],
    shortcuts: [
      {
        name: "Ceník služeb",
        short_name: "Ceník",
        description: `Orientační ceník služeb ${siteConfig.shortName}`,
        url: "/cenik",
      },
    ],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
