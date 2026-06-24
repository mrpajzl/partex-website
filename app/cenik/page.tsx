import { CenikClient } from "./CenikClient";
import { getServerSiteContent } from "@/lib/server-site-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CenikPage() {
  const initialContent = await getServerSiteContent();

  return <CenikClient initialContent={initialContent} />;
}
