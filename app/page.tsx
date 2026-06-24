import { HomeClient } from "./HomeClient";
import { getServerSiteContent } from "@/lib/server-site-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const initialContent = await getServerSiteContent();

  return <HomeClient initialContent={initialContent} />;
}
