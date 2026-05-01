"use client";

import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { defaultSiteContent, mergeSiteContent, type SiteContent } from "@/lib/site-content";
import { Eye, LogOut, Save, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TabKey = "hero" | "services" | "pricing" | "about" | "contact" | "links" | "other";

const tabs: { key: TabKey; label: string }[] = [
  { key: "hero", label: "Hero + menu" },
  { key: "services", label: "Služby" },
  { key: "pricing", label: "Ceník" },
  { key: "about", label: "O nás" },
  { key: "contact", label: "Kontakt" },
  { key: "links", label: "Odkazy" },
  { key: "other", label: "Bannery" },
];

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-600">Načítám administraci…</div>;
  }

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return <ContentAdmin />;
}

function SignIn() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signIn("password", { email, password, flow });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Přihlášení se nepovedlo.");
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
        <button disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
          {submitting ? "Pracuji…" : flow === "signIn" ? "Přihlásit" : "Vytvořit účet"}
        </button>
        <button type="button" onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")} className="mt-4 w-full text-sm font-semibold text-[#5865F2] hover:underline">
          {flow === "signIn" ? "První přihlášení? Vytvořit admin účet" : "Účet už existuje? Přihlásit"}
        </button>
        <p className="mt-5 text-xs leading-5 text-slate-500">Doporučení: nastavte v Convex environment proměnnou <code>ADMIN_EMAILS</code> se seznamem povolených e-mailů.</p>
      </form>
    </main>
  );
}

function ContentAdmin() {
  const { signOut } = useAuthActions();
  const stored = useQuery(api.content.getSiteContent, { key: "main" });
  const saveContent = useMutation(api.content.upsertSiteContent);
  const [activeTab, setActiveTab] = useState<TabKey>("hero");
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [status, setStatus] = useState<string | null>(null);

  const loadedContent = useMemo(() => mergeSiteContent(stored?.value as Partial<SiteContent> | undefined), [stored]);

  useEffect(() => {
    setContent(loadedContent);
  }, [loadedContent]);

  async function handleSave() {
    setStatus("Ukládám…");
    await saveContent({ key: "main", value: content });
    setStatus("Uloženo.");
    setTimeout(() => setStatus(null), 2500);
  }

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="min-h-screen bg-[#f7f8ff] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <h1 className="text-2xl font-black">Partex CMS</h1>
            <p className="text-sm text-slate-500">Jednoduchá správa veškerého viditelného obsahu webu</p>
          </div>
          <div className="flex items-center gap-2">
            {status && <span className="text-sm font-semibold text-[#5865F2]">{status}</span>}
            <Link href="/" className="btn-secondary-sm gap-2"><Eye className="h-4 w-4" /> Web</Link>
            <button onClick={handleSave} className="btn-primary gap-2"><Save className="h-4 w-4" /> Uložit</button>
            <button onClick={() => void signOut()} className="btn-secondary-sm gap-2"><LogOut className="h-4 w-4" /> Odhlásit</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[230px_1fr]">
        <aside className="space-y-2">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`w-full rounded-2xl px-4 py-3 text-left font-bold transition ${activeTab === tab.key ? "bg-[#5865F2] text-white shadow-lg" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"}`}>
              {tab.label}
            </button>
          ))}
        </aside>

        <section className="rounded-[2rem] bg-white p-6 shadow-[0_18px_60px_rgba(29,38,90,0.08)] ring-1 ring-slate-200">
          {activeTab === "hero" && <HeroEditor content={content} update={update} />}
          {activeTab === "services" && <JsonEditor title="Služby na homepage" description="Karty služeb včetně detailu v modálním okně." value={content.services} onChange={(value) => update("services", value)} />}
          {activeTab === "pricing" && <PricingEditor content={content} update={update} />}
          {activeTab === "about" && <AboutEditor content={content} update={update} />}
          {activeTab === "contact" && <JsonEditor title="Kontakt" description="Kontaktní karty a URL mapy." value={content.contact} onChange={(value) => update("contact", value)} />}
          {activeTab === "links" && <JsonEditor title="Užitečné odkazy" description="Seznam odkazů v plovoucím panelu pro klienty." value={content.usefulLinks} onChange={(value) => update("usefulLinks", value)} />}
          {activeTab === "other" && <OtherEditor content={content} update={update} />}
        </section>
      </div>
    </main>
  );
}

function HeroEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Hero + navigace" description="Hlavní nadpis, CTA a menu v hlavičce." />
      <TextField label="Nadpis" value={content.hero.title} onChange={(title) => update("hero", { ...content.hero, title })} />
      <TextArea label="Podnadpis" value={content.hero.subtitle} onChange={(subtitle) => update("hero", { ...content.hero, subtitle })} />
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Text tlačítka" value={content.hero.primaryCtaText} onChange={(primaryCtaText) => update("hero", { ...content.hero, primaryCtaText })} />
        <TextField label="Odkaz tlačítka" value={content.hero.primaryCtaHref} onChange={(primaryCtaHref) => update("hero", { ...content.hero, primaryCtaHref })} />
      </div>
      <JsonEditor title="Navigace" description="Položky menu: label + href." value={content.navigation} onChange={(value) => update("navigation", value)} compact />
    </div>
  );
}

function PricingEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Ceník" description="CTA na homepage a kompletní ceník na stránce /cenik." />
      <JsonEditor title="CTA na homepage" description="Blok odkazující na ceník." value={content.pricingCta} onChange={(value) => update("pricingCta", value)} compact />
      <JsonEditor title="Stránka ceníku" description="Skupiny, položky, ceny, poznámky a pod-položky." value={content.pricingPage} onChange={(value) => update("pricingPage", value)} compact />
    </div>
  );
}

function AboutEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  return (
    <div className="space-y-6">
      <SectionTitle title="O nás" description="Text sekce O nás na homepage." />
      <TextField label="Nadpis" value={content.about.title} onChange={(title) => update("about", { ...content.about, title })} />
      <TextArea label="Obsah" rows={10} value={content.about.content} onChange={(body) => update("about", { ...content.about, content: body })} />
      <TextField label="Patička webu — slogan" value={content.footer.tagline} onChange={(tagline) => update("footer", { ...content.footer, tagline })} />
    </div>
  );
}

function OtherEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Bannery a další obsah" description="Babybox, náhradní plnění a pracovní pozice." />
      <JsonEditor title="Babybox banner" description="Zapnutí, nadpis, obrázek a alt text." value={content.supportBanner} onChange={(value) => update("supportBanner", value)} compact />
      <JsonEditor title="Náhradní plnění" description="Texty a důležité odkazy." value={content.replacementFulfillment} onChange={(value) => update("replacementFulfillment", value)} compact />
      <JsonEditor title="Náborový banner" description="Zapnutí a text výzvy." value={content.hiring} onChange={(value) => update("hiring", value)} compact />
    </div>
  );
}

function JsonEditor<T>({ title, description, value, onChange, compact = false }: { title: string; description: string; value: T; onChange: (value: T) => void; compact?: boolean }) {
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDraft(JSON.stringify(value, null, 2));
    setError(null);
  }, [value]);

  function apply(next: string) {
    setDraft(next);
    try {
      onChange(JSON.parse(next) as T);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Neplatný JSON");
    }
  }

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <SectionTitle title={title} description={description} small={compact} />
      <textarea className={`input font-mono text-sm ${compact ? "min-h-[220px]" : "min-h-[520px]"}`} value={draft} onChange={(e) => apply(e.target.value)} spellCheck={false} />
      {error ? <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">Neuloží se, dokud JSON nebude platný: {error}</div> : <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700"><Sparkles className="h-4 w-4" /> JSON je v pořádku</div>}
    </div>
  );
}

function SectionTitle({ title, description, small = false }: { title: string; description: string; small?: boolean }) {
  return (
    <div>
      <h2 className={`${small ? "text-xl" : "text-3xl"} font-black text-slate-950`}>{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input className="input" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <textarea className="input" rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
