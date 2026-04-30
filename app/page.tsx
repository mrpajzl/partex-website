"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Mail, Phone, MapPin, Clock, Users, Calculator, Clipboard, ArrowRight, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PartexIllustration({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/partex-real-illustration.svg"
      alt="Partex real účetní služby"
      width={336}
      height={235}
      className={className}
      priority
    />
  );
}

export default function Home() {
  const hero = useQuery(api.content.getHero);
  const services = useQuery(api.content.getServices);
  const about = useQuery(api.content.getAbout);

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
    <main className="min-h-screen bg-[#f7f8ff] text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 shadow-[0_16px_50px_rgba(45,55,130,0.10)] backdrop-blur-xl">
        <nav className="container mx-auto px-5 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group rounded-full pr-3 transition hover:opacity-90">
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
            <div className="relative hidden min-h-[520px] items-center justify-center md:flex">
              <div className="absolute -right-16 top-8 h-[28rem] w-[28rem] rounded-full border border-white/10" />
              <div className="absolute -right-8 top-20 h-80 w-80 rounded-full bg-[#57F287]/18 blur-3xl" />
              <PartexIllustration className="relative z-10 w-[680px] max-w-none translate-x-4 translate-y-20 object-contain drop-shadow-[0_34px_45px_rgba(0,0,0,0.24)] lg:w-[790px] lg:translate-x-16" />
            </div>
          </div>
        </div>
        
        {/* Diagonal separator using SVG */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 L1200,0 L1200,120 L0,120 Z" fill="#ffffff"></path>
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


      {/* Pricing CTA Section */}
      <section className="relative overflow-hidden bg-[#f7f8ff] py-20 md:py-28">
        <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#5865F2]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#57F287]/14 blur-3xl" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-[0_28px_80px_rgba(29,38,90,0.10)] md:grid-cols-[1fr_auto] md:p-12">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-[#5865F2]">Ceník služeb</p>
              <h2 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 md:text-5xl">Jasné ceny pro účetnictví, daně i mzdy</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Podívejte se na přehled služeb a orientační ceny. Pro konkrétní rozsah vám připravíme nabídku na míru.</p>
            </div>
            <Link
              href="/cenik"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#5865F2] px-8 py-4 font-extrabold text-white shadow-[0_18px_40px_rgba(88,101,242,0.28)] transition-all hover:-translate-y-1 hover:bg-[#4752C4]"
            >
              Zobrazit ceník
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
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
            <h2 className="text-3xl md:text-4xl font-bold">Přispívejme na babybox</h2>
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
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-[#f7f8ff] p-8 shadow-[0_18px_55px_rgba(29,38,90,0.08)] md:p-12">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10 text-slate-950">Co je náhradní plnění?</h2>
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              <p>Každé firmě, která zaměstnává <strong>nad 25 pracovníků, vzniká povinnost zaměstnávat osoby se zdravotním postižením (OZP)</strong>, a to v povinném podílu 4 % k celkovému přepočtenému počtu zaměstnanců.</p>
              <p>V případě, že firma nezaměstnává požadovaný počet OZP, musí ze zákona odvést státu vypočtenou částku.</p>
              <p><strong>Náhradní plnění představuje ideální alternativu</strong>, pokud vaše firma nemůže přímo zaměstnávat OZP a zároveň chcete ušetřit na zmíněném odvodu státu. Stačí si objednat naše služby a my vám poskytneme tzv. náhradní plnění.</p>
            </div>
            <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-slate-950">Důležité odkazy</h3>
              <ul className="space-y-3 text-slate-700">
                <li><a className="font-semibold text-[#5865F2] underline-offset-4 hover:underline" href="http://portal.mpsv.cz/sz/obecne/prav_predpisy/vyklady/plneni_povinneho_podilu_ozp" target="_blank" rel="noreferrer">Souhrn legislativy k povinnému podílu zaměstnávání OZP</a></li>
                <li>Aktuální zákon č. 435/2004 Sb., o zaměstnanosti — zaměstnávání OZP: <a className="font-semibold text-[#5865F2] underline-offset-4 hover:underline" href="http://www.mpsv.cz/ppropo.php?ID=z435_2004_2#par81" target="_blank" rel="noreferrer">§81–83</a></li>
                <li>Prováděcí vyhláška č. 518/2004 Sb. — výpočet plnění povinného podílu: <a className="font-semibold text-[#5865F2] underline-offset-4 hover:underline" href="http://www.mpsv.cz/ppropo.php?ID=v518_2004#par16" target="_blank" rel="noreferrer">§17–20</a></li>
              </ul>
            </div>
            <p className="mt-8 text-lg text-slate-700">Pokud máte zájem o tuto službu, neváhejte nás <a className="font-semibold text-[#5865F2] underline-offset-4 hover:underline" href="#kontakt">kontaktovat</a>.</p>
          </div>
        </div>
      </section>

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
      <section id="kontakt" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Kontakty</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto">
            {[
              { label: "Adresa", value: "Hrnčířská 42/1\n733 01 Karviná-Fryštát", icon: MapPin },
              { label: "E-mail", value: "partex@seznam.cz", icon: Mail },
              { label: "Telefon", value: "+420 775 554 377", icon: Phone },
              { label: "Otevírací doba", value: "pondělí – pátek\n8:00 – 16:30", icon: Clock },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#5865F2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#5865F2]" />
                  </div>
                  <h3 className="font-bold mb-3 text-gray-900">{item.label}</h3>
                  <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">{item.value}</p>
                </div>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-slate-200">
            <iframe
              title="Mapa Partex Real"
              src="https://www.google.com/maps?q=Hrn%C4%8D%C3%AD%C5%99sk%C3%A1%2042%2F1%2C%20733%2001%20Karvin%C3%A1-Fry%C5%A1t%C3%A1t&output=embed"
              className="h-96 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

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
              <p className="text-gray-300 mb-2">partex@seznam.cz</p>
              <p className="text-gray-300">+420 775 554 377</p>
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
