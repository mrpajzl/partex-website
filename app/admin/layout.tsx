import type { Metadata } from "next";
import { AdminAuthProvider } from "./AdminAuthProvider";
import { AuthGate } from "./AuthGate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administrace | Partex real",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AuthGate>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </AuthGate>
    </AdminAuthProvider>
  );
}
