import type { MetadataRoute } from "next";
import { sitemapPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPages;
}
