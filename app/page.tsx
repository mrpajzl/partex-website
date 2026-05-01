"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Mail, Phone, MapPin, Clock, Users, Calculator, Clipboard, ArrowRight, X, ExternalLink, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const usefulLinks = [
  { title: "ARES", description: "Vyhledávání ekonomických subjektů", href: "http://wwwinfo.mfcr.cz/ares/ares_es.html.cz" },
  { title: "Plátci DPH", description: "Čísla účtů pro ekonomickou činnost", href: "http://adisspr.mfcr.cz/adis/jepo/epo/dpr/apl_ramce.htm?R=/adistc/DphReg?ZPRAC=FDPHI1%26poc_dic=2%26OK=Zobraz" },
  { title: "Ověření DIČ v ČR", description: "Registr plátců DPH v ČR", href: "http://adisreg.mfcr.cz/cgi-bin/adis/idph/int_dp_prij.cgi?ZPRAC=FDPHI1&poc_dic=1" },
  { title: "Ověření DIČ v EU", description: "VIES Evropské komise", href: "http://ec.europa.eu/taxation_customs/vies/?locale=cs" },
  { title: "Finanční úřady", description: "Číselník finančních úřadů ČR", href: "http://www.statnisprava.cz/rstsp/ciselniky.nsf/i/d0027" },
  { title: "Justice", description: "Oficiální server českého soudnictví", href: "http://portal.justice.cz/justice2/uvod/uvod.aspx" },
  { title: "Kurzy ČNB", description: "Kurzy devizového trhu", href: "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/" },
];

const FOUNDATION_DATE = new Date("2004-11-15T00:00:00+01:00");
const FOUNDATION_YEAR = FOUNDATION_DATE.getFullYear();
const CURRENT_YEAR = new Date().getFullYear();

function getYearsSinceFoundation() {
  const today = new Date();
  let years = today.getFullYear() - FOUNDATION_DATE.getFullYear();
  const anniversaryThisYear = new Date(today.getFullYear(), FOUNDATION_DATE.getMonth(), FOUNDATION_DATE.getDate());

  if (today < anniversaryThisYear) {
    years -= 1;
  }

  return years;
}

const realServices = [
  {
    title: "Účetnictví",
    icon: Calculator,
    description: "Kompletní účetní a daňová agenda pro fyzické i právnické osoby.",
    details: [
      "zpracování daňové evidence, jednoduché účetnictví",
      "vedení účetnictví pro fyzické i právnické osoby",
      "rekonstrukce účetnictví za uplynulá období",
      "evidence majetku, kniha jízd, skladové hospodářství, směrnice, cestovní příkazy a další",
      "zpracování různých daňových přiznání (DPH, daň silniční, daň z příjmů a další)",
      "zpracování daní nemovitého majetku (daň z nemovitostí a daň z nabytí nemovitosti)",
      "zpracování různé administrativy pro OSSZ, zdravotní pojišťovny, finanční úřady, úřady práce a další, včetně zastupování na úřadech",
      "zpracování podnikatelských záměrů, včetně kalkulace",
      "poradenství v oblasti účetnictví, daní i financí",
    ],
  },
  {
    title: "Mzdy a personalistika",
    icon: Users,
    description: "Mzdy, personalistika, přehledy, dotace a komunikace s institucemi.",
    details: [
      "zpracování mezd zaměstnanců",
      "zpracování měsíčních a ročních přehledů pro OSSZ, zdravotní pojišťovny a FÚ, zastupování na úřadech",
      "poradenství v oblasti mzdové a personální problematiky",
      "zpracování podkladů pro poskytnutí dotací dle § 78a zákona o zaměstnanosti",
      "měsíční uzávěrky mezd pro účetnictví i daňovou evidenci",
      "spolupráce s exekutory či insolvenčními správci",
    ],
  },
  {
    title: "Rekvalifikace, odborná praxe",
    icon: Clipboard,
    description: "Odborná praxe pro absolventy, účastníky rekvalifikací a studenty.",
    intro: "Odbornou praxi v našich prostorách nabízíme těmto osobám:",
    details: [
      "absolventům SŠ i VŠ, kteří mají zájem o účetní profesi",
      "účastníkům kurzů v rámci rekvalifikace pořádané úřadem práce",
      "studentům, kteří mají povinnou odbornou praxi v rámci výuky",
    ],
  },
];

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
  const yearsWithClients = getYearsSinceFoundation();
  const [activeService, setActiveService] = useState<(typeof realServices)[number] | null>(null);
  const [usefulLinksOpen, setUsefulLinksOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hero = useQuery(api.content.getHero);
  const about = useQuery(api.content.getAbout);



  return (
    <main id="top" className="min-h-screen bg-[#f7f8ff] text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 shadow-[0_16px_50px_rgba(45,55,130,0.10)] backdrop-blur-xl">
        <nav className="container mx-auto px-4 py-2.5 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-3">
            <a href="#top" className="group flex min-w-0 flex-1 items-center gap-3 rounded-full pr-2 transition hover:opacity-90" aria-label="Zpět na začátek stránky">
              <Image
                src="/partex-logo.png"
                alt="Partex real s. r. o. - účetnictví, mzdy, personalistika"
                width={1116}
                height={302}
                priority
                className="h-12 w-auto max-w-[12rem] flex-shrink object-contain object-left sm:h-14 sm:max-w-[16rem] md:h-16 md:max-w-[20rem]"
              />
            </a>
            <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 text-sm font-semibold text-slate-700 shadow-inner lg:flex">
              <a href="#sluzby" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Služby</a>
              <a href="#o-nas" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">O nás</a>
              <Link href="/cenik" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Ceník</Link>
              <a href="#kontakt" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Kontakt</a>
            </div>
            <a
              href="#kontakt"
              className="group hidden flex-shrink-0 items-center gap-1.5 rounded-full bg-[#57F287] px-3 py-2.5 text-xs font-extrabold text-[#17351f] shadow-[0_12px_30px_rgba(87,242,135,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#4ADB7A] sm:text-sm md:px-6 md:py-3 lg:inline-flex"
            >
              <span className="hidden sm:inline">Kontaktujte nás</span><span className="sm:hidden">Kontakt</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/90 text-[#2C1E2C] shadow-sm ring-1 ring-slate-200 transition hover:bg-white lg:hidden"
              aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700 shadow-[0_18px_50px_rgba(45,55,130,0.14)] lg:hidden">
              <div className="grid gap-2">
                <a onClick={() => setMobileMenuOpen(false)} href="#sluzby" className="rounded-2xl px-4 py-3 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Služby</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#o-nas" className="rounded-2xl px-4 py-3 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">O nás</a>
                <Link onClick={() => setMobileMenuOpen(false)} href="/cenik" className="rounded-2xl px-4 py-3 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Ceník</Link>
                <a onClick={() => setMobileMenuOpen(false)} href="#kontakt" className="rounded-2xl px-4 py-3 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Kontakt</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#kontakt" className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#57F287] px-4 py-3 font-extrabold text-[#17351f] transition hover:bg-[#4ADB7A]">
                  Kontaktujte nás
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <div className="relative z-10 bg-[#2C1E2C] px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-[0.10em] text-white shadow-inner sm:text-sm sm:tracking-[0.18em]">
        <span className="mx-auto block max-w-[21rem] sm:max-w-none">Již {yearsWithClients} let jsme tu pro naše klienty</span>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#5865F2] text-white pt-6 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(87,242,135,0.30),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.22),transparent_26%),linear-gradient(135deg,#5865F2_0%,#4450d4_48%,#2C1E2C_100%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-white/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-6 py-10 md:py-12">
          <div className="grid items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="max-w-[20rem] text-3xl font-black leading-[1.02] tracking-tight sm:max-w-4xl sm:text-4xl md:text-6xl lg:text-7xl">
                {hero?.title || "Vaše cesta k úspěchu je i naše práce"}
              </h1>
              <p className="mt-5 max-w-[20rem] text-base leading-7 text-white/86 sm:max-w-2xl sm:text-lg md:text-2xl md:leading-9">{hero?.subtitle || "Pomůžeme vám dosáhnout vašich cílů"}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#sluzby"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-extrabold text-[#5865F2] sm:px-8 sm:py-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1 hover:bg-[#f4f6ff]"
                >
                  Naše služby
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="relative hidden min-h-[380px] items-center justify-center md:flex">
              <div className="absolute -right-16 top-8 h-[28rem] w-[28rem] rounded-full border border-white/10" />
              <div className="absolute -right-8 top-20 h-80 w-80 rounded-full bg-[#57F287]/18 blur-3xl" />
              <PartexIllustration className="relative z-10 w-[580px] max-w-none translate-x-4 translate-y-14 object-contain drop-shadow-[0_34px_45px_rgba(0,0,0,0.24)] lg:w-[680px] lg:translate-x-16" />
            </div>
          </div>
        </div>
        
        {/* Diagonal separator using SVG */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-32 w-full" viewBox="0 0 1200 140" preserveAspectRatio="none">
            <path d="M0,100 L1200,0 L1200,140 L0,140 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="sluzby" className="relative bg-white py-14 md:py-28">
        <div className="absolute inset-x-0 top-8 mx-auto h-48 max-w-5xl rounded-full bg-[#5865F2]/5 blur-3xl" />
        <div className="container relative mx-auto w-full max-w-[100vw] px-4 sm:px-6">
          <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-slate-950 md:text-5xl">Co nabízíme?</h2>
          <p className="mx-auto mb-10 max-w-[18rem] text-center text-base leading-7 text-slate-600 sm:max-w-2xl md:mb-16 md:text-lg md:leading-8">Naše služby jsou navrženy tak, aby vyhovovaly vašim potřebám — přehledně, spolehlivě a bez zbytečného papírování.</p>
          
          <div className="mx-auto grid w-full max-w-[calc(100vw-2rem)] gap-5 md:max-w-6xl md:grid-cols-3 md:gap-8">
            {realServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative w-full overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_55px_rgba(29,38,90,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(88,101,242,0.16)]"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#5865F2]/8 transition group-hover:bg-[#57F287]/18" />
                  <div className="relative mb-6 flex h-18 w-18 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[#5865F2] to-[#2C1E2C] shadow-lg shadow-[#5865F2]/20">
                    <Icon className="h-9 w-9 text-white" />
                  </div>
                  <h3 className="relative mb-4 text-2xl font-black text-slate-950">{service.title}</h3>
                  <p className="relative mb-6 overflow-wrap-anywhere leading-7 text-slate-600">{service.description}</p>
                  <button
                    type="button"
                    onClick={() => setActiveService(service)}
                    className="relative inline-flex items-center rounded-full bg-[#57F287] px-6 py-2.5 font-extrabold text-[#17351f] shadow-lg shadow-[#57F287]/20 transition-all hover:-translate-y-0.5 hover:bg-[#4ADB7A]"
                  >
                    Zjistit více
                  </button>
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
            <div className="mt-8 flex justify-center">
              <Image
                src="/babybox.gif"
                alt="Podporujeme Babybox"
                width={468}
                height={60}
                unoptimized
                className="h-auto w-full max-w-[468px] rounded-2xl bg-white/95 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.16)]"
              />
            </div>
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
              <div className="mt-10 rounded-3xl bg-white p-6 text-lg leading-8 text-slate-700 shadow-sm ring-1 ring-slate-200">
                Společnost Partex real s. r. o. byla založena 15. listopadu {FOUNDATION_YEAR}. Již {yearsWithClients} let jsme tu pro naše klienty a pomáháme jim s účetnictvím, daněmi, mzdami i související administrativou.
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
              { label: "Adresa", value: "Hrnčířská 42/1\n733 01 Karviná-Fryštát", icon: MapPin, href: "https://www.google.com/maps/search/?api=1&query=Hrn%C4%8D%C3%AD%C5%99sk%C3%A1%2042%2F1%2C%20733%2001%20Karvin%C3%A1-Fry%C5%A1t%C3%A1t" },
              { label: "E-mail", value: "partex@seznam.cz", icon: Mail, href: "mailto:partex@seznam.cz" },
              { label: "Telefon", value: "+420 775 554 377", icon: Phone, href: "tel:+420775554377" },
              { label: "Otevírací doba", value: "pondělí – pátek\n8:00 – 16:30", icon: Clock },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="w-14 h-14 bg-[#5865F2]/10 rounded-full flex items-center justify-center mx-auto mb-4 transition group-hover:bg-[#5865F2]/15">
                    <Icon className="w-7 h-7 text-[#5865F2]" />
                  </div>
                  <h3 className="font-bold mb-3 text-gray-900">{item.label}</h3>
                  <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed group-hover:text-[#5865F2]">{item.value}</p>
                </>
              );

              if (item.href) {
                const isExternal = item.href.startsWith("http");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="group block bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={item.label} className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-slate-200">
            <iframe
              title="Mapa Partex real s. r. o."
              src="https://www.google.com/maps?q=Hrn%C4%8D%C3%AD%C5%99sk%C3%A1%2042%2F1%2C%20733%2001%20Karvin%C3%A1-Fry%C5%A1t%C3%A1t&output=embed"
              className="h-96 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>



      <div className="fixed bottom-4 left-4 z-[90] flex flex-col items-start gap-3 sm:left-auto sm:right-4 sm:items-end">
        {usefulLinksOpen && (
          <div className="w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_70px_rgba(6,23,39,0.24)] ring-1 ring-slate-200">
            <div className="flex items-center justify-between bg-[#2C1E2C] px-5 py-4 text-white">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.18em] text-[#57F287]">Pro klienty</div>
                <div className="text-lg font-black">Užitečné odkazy</div>
              </div>
              <button type="button" onClick={() => setUsefulLinksOpen(false)} className="rounded-full bg-white/10 p-2 transition hover:bg-white/20" aria-label="Zavřít užitečné odkazy">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] divide-y divide-slate-100 overflow-y-auto">
              {usefulLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-4 px-5 py-3.5 transition hover:bg-[#5865F2]/5">
                  <span>
                    <span className="block font-bold text-slate-950 group-hover:text-[#5865F2]">{link.title}</span>
                    <span className="mt-0.5 block text-sm leading-5 text-slate-500">{link.description}</span>
                  </span>
                  <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-[#5865F2]" />
                </a>
              ))}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setUsefulLinksOpen((open) => !open)}
          className="rounded-full bg-[#57F287] px-3.5 py-2.5 text-xs font-black sm:px-5 sm:py-3 sm:text-sm text-[#17351f] shadow-[0_18px_42px_rgba(87,242,135,0.34)] transition hover:-translate-y-0.5 hover:bg-[#4ADB7A]"
          aria-expanded={usefulLinksOpen}
        >
          Užitečné odkazy
        </button>
      </div>

      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061727]/70 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="service-dialog-title">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] md:p-10">
            <button
              type="button"
              onClick={() => setActiveService(null)}
              className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-950"
              aria-label="Zavřít detail služby"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[#5865F2] to-[#2C1E2C] shadow-lg shadow-[#5865F2]/20">
              <activeService.icon className="h-8 w-8 text-white" />
            </div>
            <h3 id="service-dialog-title" className="pr-12 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{activeService.title}</h3>
            <p className="mt-4 text-lg leading-8 text-slate-600">{activeService.description}</p>
            {activeService.intro && <p className="mt-7 font-bold text-slate-950">{activeService.intro}</p>}
            <ul className="mt-6 space-y-4">
              {activeService.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-slate-700">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#57F287]" />
                  <span className="leading-7">{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#kontakt" onClick={() => setActiveService(null)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5865F2] px-7 py-3.5 font-extrabold text-white transition hover:bg-[#4752C4]">
                Poptat službu
                <ArrowRight className="h-5 w-5" />
              </a>
              <button type="button" onClick={() => setActiveService(null)} className="inline-flex items-center justify-center rounded-full border border-slate-200 px-7 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50">
                Zavřít
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#2C1E2C] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Partex real s. r. o.</h3>
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
            <p>&copy; {FOUNDATION_YEAR}–{CURRENT_YEAR} Partex real s. r. o. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
