"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

const pricingSections = [
  {
    title: "Účetnictví",
    description: "Vedení účetnictví, daňové evidence a souvisejících agend.",
    items: [
      { service: "Vedení daňové evidence – plátce DPH", price: "Od 1 500 Kč/měsíc" },
      { service: "Vedení účetnictví – neplátce DPH", price: "Od 2 000 Kč/měsíc" },
      { service: "Vedení účetnictví – plátce DPH", price: "Od 2 000 Kč/měsíc" },
      { service: "Vedení účetnictví – řádek", price: "Od 25 Kč" },
      { service: "Vedení účetnictví – SVJ nebo družstvo", price: "Od 100 Kč/měsíc" },
    ],
  },
  {
    title: "Mzdy a zaměstnanci",
    description: "Mzdová agenda, dotace a navazující administrativa.",
    items: [
      { service: "Mzdy – 1 zaměstnanec/měsíc", price: "300 Kč" },
      { service: "Mzdy zaměstnance na dotaci/měsíc", price: "400 Kč / 1 zaměstnanec" },
      { service: "Zpracování dotací – čtvrtletně (zaměstnanci)", price: "3 000 Kč" },
      { service: "Žádost o dotace – zaměstnanci", price: "5 000 Kč" },
    ],
  },
  {
    title: "Daňová přiznání",
    description: "Přiznání pro fyzické i právnické osoby včetně přehledů.",
    items: [
      {
        service: "Daňové přiznání pro fyzické osoby",
        price: "od 500 Kč",
        children: [
          { service: "§6 daně z příjmů", price: "500 Kč" },
          { service: "příjmy z podnikání, ostatní příjmy", price: "2 000 Kč", note: "bez účtování, z dodaných údajů, včetně přehledů pro OSSZ a ZP" },
          { service: "příjmy z podnikání, ostatní příjmy", price: "5 000 Kč", note: "včetně zaúčtování, uzávěrkových operací a přehledů pro OSSZ a ZP" },
        ],
      },
      { service: "Daňové přiznání pro právnické osoby", price: "Od 3 000 Kč", note: "bez účtování, vypracování z dodaných údajů" },
      { service: "Odklad daňového přiznání FO", price: "3 000 Kč" },
      { service: "Odklad daňového přiznání PO", price: "5 000 Kč" },
    ],
  },
  {
    title: "Daně a hlášení",
    description: "Jednotlivá daňová podání, hlášení a výkazy dle podkladů.",
    items: [
      { service: "Daň z nemovitých věcí (1 ks)", price: "1 000 Kč" },
      { service: "Daň z nabytí nemovitých věcí (1 ks)", price: "1 000 Kč" },
      { service: "Kontrolní hlášení pro DPH (1 ks) dle podkladů", price: "500 Kč" },
      { service: "Daň z přidané hodnoty (1 ks) dle podkladů", price: "500 Kč" },
      { service: "Daň silniční za 1 vozidlo", price: "500 Kč" },
      { service: "Daň silniční za každé další vozidlo", price: "100 Kč" },
      { service: "Výkazy pro ČSÚ", price: "1 000 Kč/1 ks" },
    ],
  },
  {
    title: "Poradenství a zastupování",
    description: "Konzultace, kontrola účetnictví a zastupování na úřadech.",
    items: [
      { service: "Individuální konzultace, poradenství", price: "1 000 Kč/hod." },
      { service: "Zastupování na úřadech", price: "500 Kč/hod." },
      { service: "Kontrola účetnictví minulých let", price: "500 Kč/hod." },
      { service: "Žádosti, odvolání, prominutí penále a další", price: "Od 1 000 Kč" },
      { service: "Poradenství v oblasti správního řízení v silniční dopravě", price: "Od 1 500 Kč/hod." },
      { service: "Poradenství v oblasti celního a daňového řízení", price: "Od 1 500 Kč/hod." },
    ],
  },
  {
    title: "Ostatní služby",
    description: "Administrativa, fakturace, sídla, nemovitosti a firemní dokumenty.",
    items: [
      { service: "Založení s.r.o.", price: "Od 8 000 Kč" },
      { service: "Umístění sídla – Karviná nebo Praha", price: "Od 2 000 Kč/měsíc" },
      { service: "Vypracování podnikatelského záměru", price: "Od 5 000 Kč" },
      { service: "Zpracování žádosti o úvěr", price: "Od 1 000 Kč" },
      { service: "Náhradní plnění – zápis 1 firmy na portál MPSV", price: "150 Kč" },
      { service: "Tvorba vnitropodnikových směrnic", price: "dle dohody" },
      { service: "Vystavování tuzemských faktur", price: "150 Kč/1 ks" },
      { service: "Vystavování zahraničních faktur", price: "200 Kč/1 ks" },
      { service: "Personální audit ve firmě", price: "Od 5 000 Kč" },
      { service: "Správa nemovitostí (družstva, SVJ...)", price: "150 Kč/jednotka" },
    ],
  },
];
function Header() {
  const yearsWithClients = getYearsSinceFoundation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 text-slate-950 shadow-[0_16px_50px_rgba(45,55,130,0.10)] backdrop-blur-xl">
        <nav className="container mx-auto px-4 py-2.5 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-3">
            <Link href="/#top" className="group flex min-w-0 flex-1 items-center gap-3 rounded-full pr-2 transition hover:opacity-90" aria-label="Zpět na začátek stránky">
              <Image
                src="/partex-logo.png"
                alt="Partex real s. r. o. - účetnictví, mzdy, personalistika"
                width={1536}
                height={1024}
                priority
                className="h-12 w-auto max-w-[12rem] flex-shrink object-contain object-left sm:h-14 sm:max-w-[16rem] md:h-16 md:max-w-[20rem]"
              />
            </Link>
            <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 text-sm font-semibold text-slate-700 shadow-inner lg:flex">
              <Link href="/#sluzby" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Služby</Link>
              <Link href="/#o-nas" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">O nás</Link>
              <Link href="/cenik" className="rounded-full bg-[#5865F2]/10 px-4 py-2 text-[#5865F2] transition">Ceník</Link>
              <Link href="/#kontakt" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Kontakt</Link>
            </div>
            <Link
              href="/#kontakt"
              className="group hidden flex-shrink-0 items-center gap-1.5 rounded-full bg-[#57F287] px-3 py-2.5 text-xs font-extrabold text-[#17351f] shadow-[0_12px_30px_rgba(87,242,135,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#4ADB7A] sm:text-sm md:px-6 md:py-3 lg:inline-flex"
            >
              <span className="hidden sm:inline">Kontaktujte nás</span><span className="sm:hidden">Kontakt</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
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
                <Link onClick={() => setMobileMenuOpen(false)} href="/#sluzby" className="rounded-2xl px-4 py-3 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Služby</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/#o-nas" className="rounded-2xl px-4 py-3 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">O nás</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/cenik" className="rounded-2xl bg-[#5865F2]/10 px-4 py-3 text-[#5865F2]">Ceník</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/#kontakt" className="rounded-2xl px-4 py-3 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Kontakt</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/#kontakt" className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#57F287] px-4 py-3 font-extrabold text-[#17351f] transition hover:bg-[#4ADB7A]">
                  Kontaktujte nás
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
      <div className="relative z-10 bg-[#2C1E2C] px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-inner sm:text-sm sm:tracking-[0.18em]">
        Již {yearsWithClients} let jsme tu pro naše klienty
      </div>
    </>
  );
}

export default function CenikPage() {
  return (
    <main id="top" className="min-h-screen bg-[#f7f8ff] text-slate-950">
      <Header />

      <section className="relative overflow-hidden bg-[#5865F2] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(87,242,135,0.26),transparent_28%),linear-gradient(135deg,#5865F2_0%,#4450d4_55%,#2C1E2C_100%)]" />
        <div className="container relative mx-auto px-6 text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-[#57F287]">Platný od 1. 1. 2024</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Ceník služeb</h1>
          <p className="mx-auto mt-5 max-w-[20rem] text-base leading-7 text-white/86 sm:max-w-2xl sm:text-lg sm:leading-8">Orientační ceny účetních, daňových a poradenských služeb. Finální rozsah rádi upřesníme podle vašich potřeb.</p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-[100vw] px-4 sm:px-6">
          <div className="mx-auto max-w-[calc(100vw-2rem)] space-y-5 md:max-w-none">
            {pricingSections.map((section) => (
              <section key={section.title} className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_45px_rgba(29,38,90,0.08)] ring-1 ring-slate-200">
                <div className="border-b border-slate-100 bg-gradient-to-r from-[#2C1E2C] to-[#5865F2] px-5 py-4 text-white md:px-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-xl font-black tracking-tight">{section.title}</h2>
                      <p className="mt-1 max-w-2xl text-xs leading-5 text-white/78">{section.description}</p>
                    </div>
                    <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#57F287]">{section.items.length} položek</div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {section.items.map((item, index) => (
                    <div key={`${section.title}-${item.service}-${index}`} className="px-5 py-3.5 transition hover:bg-[#5865F2]/5 md:px-6">
                      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
                        <div className="min-w-0">
                          <div className="font-bold leading-6 text-slate-950">{item.service}</div>
                          {item.note && (
                            <div className="mt-1.5 inline-flex max-w-full rounded-xl bg-[#5865F2]/8 px-3 py-1.5 text-xs font-medium leading-5 text-slate-700 ring-1 ring-[#5865F2]/10">
                              {item.note}
                            </div>
                          )}
                        </div>
                        <div className="flex items-start md:justify-end">
                          <span className="rounded-full bg-[#5865F2]/10 px-3 py-1.5 text-sm font-black whitespace-nowrap text-[#5865F2] ring-1 ring-[#5865F2]/10 md:text-right">
                            {item.price}
                          </span>
                        </div>
                      </div>

                      {item.children && (
                        <div className="mt-3 rounded-2xl bg-slate-50 p-2.5 ring-1 ring-slate-200/80 md:ml-4 md:p-2.5">
                          <div className="space-y-2">
                            {item.children.map((child) => (
                              <div key={`${item.service}-${child.service}-${child.price}`} className="rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-200/70">
                                <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_180px] md:items-start">
                                  <div className="min-w-0">
                                    <div className="font-semibold leading-6 text-slate-800">{child.service}</div>
                                    {child.note && (
                                      <p className="mt-1 text-xs leading-5 text-slate-500">
                                        {child.note}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex md:justify-end">
                                    <span className="rounded-full bg-white px-3 py-1 text-sm font-black whitespace-nowrap text-[#5865F2] ring-1 ring-[#5865F2]/15">
                                      {child.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-[#5865F2] px-7 py-3.5 font-extrabold text-white shadow-[0_18px_40px_rgba(88,101,242,0.28)] transition-all hover:-translate-y-1 hover:bg-[#4752C4]"
            >
              Kontaktujte nás pro cenovou nabídku
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#2C1E2C] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Partex real s. r. o.</h3>
              <p className="text-gray-300 leading-relaxed">Profesionální účetní a daňové služby pro vaši firmu</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Rychlé odkazy</h3>
              <ul className="space-y-2">
                <li><Link href="/#sluzby" className="text-gray-300 hover:text-white transition">Služby</Link></li>
                <li><Link href="/#o-nas" className="text-gray-300 hover:text-white transition">O nás</Link></li>
                <li><Link href="/cenik" className="text-gray-300 hover:text-white transition">Ceník</Link></li>
                <li><Link href="/#kontakt" className="text-gray-300 hover:text-white transition">Kontakt</Link></li>
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
