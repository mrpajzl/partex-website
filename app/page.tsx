"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Mail, Phone, MapPin, Clock, Users, Calculator, Clipboard, ArrowRight, Sparkles, type LucideIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

function PartexMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="8" y="8" width="80" height="80" rx="24" fill="url(#partex-bg)" />
      <path d="M28 66V30h24c10.5 0 17 5.8 17 15.1 0 9.4-6.5 15-17.2 15H42v6H28Z" fill="white" opacity="0.96" />
      <path d="M42 47.7h9.1c3.5 0 5.4-1.2 5.4-3.7 0-2.4-1.9-3.7-5.4-3.7H42v7.4Z" fill="#5865F2" />
      <path d="M27 72c14-1 27.7-6.2 40-16" stroke="#57F287" strokeWidth="6" strokeLinecap="round" />
      <defs>
        <linearGradient id="partex-bg" x1="12" y1="10" x2="87" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6B74FF" />
          <stop offset="0.55" stopColor="#5865F2" />
          <stop offset="1" stopColor="#33245C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Home() {
  const hero = useQuery(api.content.getHero);
  const services = useQuery(api.content.getServices);
  const newsletter = useQuery(api.content.getNewsletter);
  const serviceDetails = useQuery(api.content.getServiceDetails);
  const about = useQuery(api.content.getAbout);
  const contact = useQuery(api.content.getContact);

  const subscribe = useMutation(api.content.subscribe);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("loading");
    try {
      await subscribe({ email });
      setSubscribeStatus("success");
      setEmail("");
    } catch {
      setSubscribeStatus("error");
    }
  };

  const iconMap: Record<string, LucideIcon> = {
    users: Users,
    calculator: Calculator,
    clipboard: Clipboard,
    "map-pin": MapPin,
    mail: Mail,
    phone: Phone,
    clock: Clock,
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8ff] text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 shadow-[0_16px_50px_rgba(45,55,130,0.10)] backdrop-blur-xl">
        <nav className="container mx-auto px-5 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group flex items-center gap-3 rounded-full pr-3 transition hover:opacity-90">
              <span className="grid h-16 w-16 place-items-center rounded-[1.35rem] bg-white shadow-[0_16px_35px_rgba(88,101,242,0.26)] ring-1 ring-[#5865F2]/10 md:h-[4.75rem] md:w-[4.75rem]">
                <PartexMark className="h-14 w-14 md:h-[4.1rem] md:w-[4.1rem]" />
              </span>
              <span className="leading-tight">
                <span className="block text-xl font-black tracking-tight text-[#2C1E2C] md:text-2xl">Partex real</span>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.26em] text-[#5865F2] sm:block">účetnictví · daně · mzdy</span>
              </span>
            </Link>
            <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 text-sm font-semibold text-slate-700 shadow-inner md:flex">
              <a href="#sluzby" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Služby</a>
              <a href="#o-nas" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">O nás</a>
              <Link href="/cenik" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Ceník</Link>
              <a href="#kontakt" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Kontakt</a>
            </div>
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[#57F287] px-4 py-3 text-sm font-extrabold text-[#17351f] shadow-[0_12px_30px_rgba(87,242,135,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#4ADB7A] md:px-6"
            >
              <span className="hidden sm:inline">Kontaktujte nás</span><span className="sm:hidden">Kontakt</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#5865F2] text-white pt-12 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(87,242,135,0.30),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.22),transparent_26%),linear-gradient(135deg,#5865F2_0%,#4450d4_48%,#2C1E2C_100%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-white/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-6 py-20 md:py-24">
          <div className="grid items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur">
                <Sparkles className="h-4 w-4 text-[#57F287]" />
                Partner pro firmy, které chtějí mít pořádek v číslech
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
                {hero?.title || "Vaše cesta k úspěchu je i naše práce"}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/86 md:text-2xl md:leading-9">{hero?.subtitle || "Pomůžeme vám dosáhnout vašich cílů"}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href={hero?.ctaLink || "#kontakt"}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-extrabold text-[#5865F2] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1 hover:bg-[#f4f6ff]"
                >
                  {hero?.ctaText || "Zjistit více"}
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
                <a href="#sluzby" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur transition hover:bg-white/18">Naše služby</a>
              </div>
            </div>
            <div className="relative hidden min-h-[430px] items-center justify-center md:flex">
              <div className="absolute h-80 w-80 rounded-full bg-[#57F287]/20 blur-3xl" />
              <div className="relative w-full max-w-md rounded-[2.5rem] border border-white/18 bg-white/12 p-8 shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
                <div className="absolute -right-5 -top-5 rounded-3xl bg-[#57F287] px-5 py-3 text-sm font-black text-[#17351f] shadow-xl">bez chaosu</div>
                <div className="grid aspect-square place-items-center rounded-[2rem] bg-white shadow-2xl">
                  <PartexMark className="h-64 w-64" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm font-bold">
                  <div className="rounded-2xl bg-white/12 p-3">Účetnictví</div>
                  <div className="rounded-2xl bg-white/12 p-3">Daně</div>
                  <div className="rounded-2xl bg-white/12 p-3">Mzdy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Diagonal separator using SVG */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 L1200,60 L1200,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="sluzby" className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-x-0 top-8 mx-auto h-48 max-w-5xl rounded-full bg-[#5865F2]/5 blur-3xl" />
        <div className="container relative mx-auto px-6">
          <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-slate-950 md:text-5xl">Co nabízíme?</h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-8 text-slate-600">Naše služby jsou navrženy tak, aby vyhovovaly vašim potřebám — přehledně, spolehlivě a bez zbytečného papírování.</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services?.map((service) => {
              const Icon = service.icon ? iconMap[service.icon] : Users;
              return (
                <div 
                  key={service._id} 
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_18px_55px_rgba(29,38,90,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(88,101,242,0.16)]"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#5865F2]/8 transition group-hover:bg-[#57F287]/18" />
                  <div className="relative mb-6 flex h-18 w-18 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[#5865F2] to-[#2C1E2C] shadow-lg shadow-[#5865F2]/20">
                    <Icon className="h-9 w-9 text-white" />
                  </div>
                  <h3 className="relative mb-4 text-2xl font-black text-slate-950">{service.title}</h3>
                  <p className="relative mb-6 leading-7 text-slate-600">{service.description}</p>
                  {service.ctaText && (
                    <a 
                      href={service.ctaLink || "#"}
                      className="relative inline-flex items-center rounded-full bg-[#57F287] px-6 py-2.5 font-extrabold text-[#17351f] shadow-lg shadow-[#57F287]/20 transition-all hover:-translate-y-0.5 hover:bg-[#4ADB7A]"
                    >
                      {service.ctaText}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section with Diagonals */}
      <section className="relative bg-[#5865F2] text-white py-32">
        {/* Top diagonal */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M0,0 L1200,60 L1200,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{newsletter?.title || "Přispívejme na babybox"}</h2>
            {newsletter?.description && (
              <p className="mb-10 text-lg opacity-90">{newsletter.description}</p>
            )}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Váš email"
                className="px-6 py-3.5 rounded-full text-gray-900 flex-1 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
                disabled={subscribeStatus === "loading"}
              />
              <button
                type="submit"
                className="bg-white text-[#5865F2] px-8 py-3.5 rounded-full font-semibold hover:bg-slate-100 transition-all hover:scale-105 disabled:opacity-50 whitespace-nowrap"
                disabled={subscribeStatus === "loading"}
              >
                {newsletter?.ctaText || "Sofia"}
              </button>
            </form>
            {subscribeStatus === "success" && (
              <p className="mt-6 text-green-200 font-medium">✓ Děkujeme za odběr!</p>
            )}
            {subscribeStatus === "error" && (
              <p className="mt-6 text-red-200 font-medium">✗ Tento email již je zaregistrován</p>
            )}
          </div>
        </div>

        {/* Bottom diagonal */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 L1200,60 L1200,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Service Details */}
      {serviceDetails && serviceDetails.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Co je náhradní plnění?</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {serviceDetails.map((detail) => (
                <div key={detail._id} className="bg-[#f7f8ff] rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{detail.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{detail.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {about && (
        <section id="o-nas" className="py-20 md:py-28 bg-[#f7f8ff]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">{about.title}</h2>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {about.content}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Job Posting Section */}
      <section className="relative bg-[#5865F2] text-white py-32">
        {/* Top diagonal */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M0,0 L1200,60 L1200,120 L0,120 Z" fill="#F8F9FA"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Hledáme pozici do našich řad</h2>
            <p className="text-lg opacity-90 mb-8">Máme otevřenou pozici pro účetního/mzdového specialistu</p>
            <a 
              href="#kontakt"
              className="inline-block bg-white text-[#5865F2] px-8 py-3.5 rounded-full font-semibold hover:bg-slate-100 transition-all hover:scale-105"
            >
              Kontaktujte nás
            </a>
          </div>
        </div>

        {/* Bottom diagonal to contact/footer */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 L1200,60 L1200,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Contact Section */}
      {contact && contact.length > 0 && (
        <section id="kontakt" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Kontakty</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto">
              {contact.map((item) => {
                const Icon = item.icon ? iconMap[item.icon] : Mail;
                return (
                  <div key={item._id} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-[#5865F2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#5865F2]" />
                    </div>
                    <h3 className="font-bold mb-3 text-gray-900">{item.label}</h3>
                    <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">{item.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-100 rounded-3xl h-96 flex items-center justify-center shadow-lg overflow-hidden">
              <p className="text-gray-500 text-lg">Google Map zde</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#2C1E2C] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Partex Real s.r.o.</h3>
              <p className="text-gray-300 leading-relaxed">Profesionální účetní a daňové služby pro vaši firmu</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Rychlé odkazy</h3>
              <ul className="space-y-3">
                <li><a href="#sluzby" className="text-gray-300 hover:text-white transition">Služby</a></li>
                <li><a href="#o-nas" className="text-gray-300 hover:text-white transition">O nás</a></li>
                <li><Link href="/cenik" className="text-gray-300 hover:text-white transition">Ceník</Link></li>
                <li><a href="#kontakt" className="text-gray-300 hover:text-white transition">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Kontakt</h3>
              <p className="text-gray-300 mb-2">info@partex.cz</p>
              <p className="text-gray-300">+420 123 456 789</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Partex Real s.r.o. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
