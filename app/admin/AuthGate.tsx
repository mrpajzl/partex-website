"use client";

import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const auth = useConvexAuth();

  if (!auth || auth.isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-600">Načítám administraci…</div>;
  }

  if (!auth.isAuthenticated) {
    return <SignIn />;
  }

  return <>{children}</>;
}

function SignIn() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hasUsers = useQuery(api.adminAuth.hasUsers);
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (hasUsers === false) {
      setFlow("signUp");
    }
  }, [hasUsers]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signIn("password", { email, password, flow });
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.includes("InvalidAccountId")) {
        setFlow("signUp");
        setError("Účet zatím neexistuje. Vytvořte první admin účet tímto e-mailem a heslem.");
      } else if (message.includes("InvalidSecret")) {
        setError("Nesprávné heslo.");
      } else {
        setError(message || "Přihlášení se nepovedlo.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8ff] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-[0_24px_80px_rgba(29,38,90,0.14)] ring-1 ring-slate-200">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-[#5865F2]/10 p-3 text-[#5865F2]"><Shield className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-950">Partex CMS</h1>
            <p className="text-sm text-slate-500">Přihlášení přes Convex Auth</p>
          </div>
        </div>
        <label className="label">E-mail</label>
        <input className="input mb-4" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="label">Heslo</label>
        <input className="input mb-5" type="password" autoComplete={flow === "signIn" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <button disabled={submitting || hasUsers === undefined} className="btn-primary w-full justify-center disabled:opacity-60">
          {submitting ? "Pracuji…" : hasUsers === undefined ? "Kontroluji administraci…" : flow === "signIn" ? "Přihlásit" : "Vytvořit první admin účet"}
        </button>
        <button type="button" onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")} className="mt-4 w-full text-sm font-semibold text-[#5865F2] hover:underline">
          {flow === "signIn" ? "První přihlášení? Vytvořit admin účet" : "Účet už existuje? Přihlásit"}
        </button>
        <p className="mt-5 text-xs leading-5 text-slate-500">Doporučení: nastavte v Convex environment proměnnou <code>ADMIN_EMAILS</code> se seznamem povolených e-mailů.</p>
      </form>
    </main>
  );
}
