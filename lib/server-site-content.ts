import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { SiteContent } from "@/lib/site-content";
import { activeSite } from "@/lib/sites";

export async function getServerSiteContent() {
  const storedContent = await fetchQuery(api.content.getSiteContent, { key: activeSite.contentKey });
  return storedContent?.value as Partial<SiteContent> | undefined;
}
