import { AdminAuthProvider } from "./AdminAuthProvider";
import { AuthGate } from "./AuthGate";

export const dynamic = "force-dynamic";

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
