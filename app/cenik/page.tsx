"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

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

const pricingItems = [
  { service: "Vedení daňové evidence – plátce DPH", price: "Od 1 500 Kč/měsíc" },
  { service: "Vedení účetnictví – neplátce DPH", price: "Od 2 000 Kč/měsíc" },
  { service: "Vedení účetnictví – plátce DPH", price: "Od 2 000 Kč/měsíc" },
  { service: "Vedení účetnictví – řádek", price: "Od 25 Kč" },
  { service: "Vedení účetnictví – SVJ nebo družstvo", price: "Od 100 Kč/měsíc" },
  { service: "Mzdy – 1 zaměstnanec/měsíc", price: "300 Kč" },
  { service: "Mzdy zaměstnance na dotaci/měsíc", price: "400 Kč / 1 zaměstnanec" },
  { service: "Daňové přiznání pro závislou činnost – §6 daně z příjmů", price: "500 Kč" },
  { service: "Daňové přiznání FO – příjmy z podnikání, ostatní příjmy", price: "2 000 Kč", note: "bez účtování, vypracování z dodaných údajů, včetně přehledu o příjmech a výdajích na OSSZ a ZP" },
  { service: "Daňové přiznání FO – příjmy z podnikání, ostatní příjmy", price: "5 000 Kč", note: "včetně zaúčtování, uzávěrkových operací, apod. včetně přehledu o příjmech a výdajích na OSSZ a ZP" },
  { service: "Daňové přiznání pro právnické osoby", price: "Od 3 000 Kč", note: "bez účtování, vypracování z dodaných údajů" },
  { service: "Daň z nemovitých věcí (1 ks)", price: "1 000 Kč" },
  { service: "Daň z nabytí nemovitých věcí (1 ks)", price: "1 000 Kč" },
  { service: "Kontrolní hlášení pro DPH (1 ks) dle podkladů", price: "500 Kč" },
  { service: "Daň z přidané hodnoty (1 ks) dle podkladů", price: "500 Kč" },
  { service: "Daň silniční za 1 vozidlo", price: "500 Kč" },
  { service: "Daň silniční za každé další vozidlo", price: "100 Kč" },
  { service: "Individuální konzultace, poradenství", price: "1 000 Kč/hod." },
  { service: "Zastupování na úřadech", price: "500 Kč/hod." },
  { service: "Založení s.r.o.", price: "Od 8 000 Kč" },
  { service: "Umístění sídla – Karviná nebo Praha", price: "Od 2 000 Kč/měsíc" },
  { service: "Vypracování podnikatelského záměru", price: "Od 5 000 Kč" },
  { service: "Zpracování žádosti o úvěr", price: "Od 1 000 Kč" },
  { service: "Zpracování dotací – čtvrtletně (zaměstnanci)", price: "3 000 Kč" },
  { service: "Žádost o dotace – zaměstnanci", price: "5 000 Kč" },
  { service: "Náhradní plnění – zápis 1 firmy na portál MPSV", price: "150 Kč" },
  { service: "Tvorba vnitropodnikových směrnic", price: "dle dohody" },
  { service: "Vystavování tuzemských faktur", price: "150 Kč/1 ks" },
  { service: "Vystavování zahraničních faktur", price: "200 Kč/1 ks" },
  { service: "Výkazy pro ČSÚ", price: "1 000 Kč/1 ks" },
  { service: "Personální audit ve firmě", price: "Od 5 000 Kč" },
  { service: "Kontrola účetnictví minulých let", price: "500 Kč/hod." },
  { service: "Odklad daňového přiznání FO", price: "3 000 Kč" },
  { service: "Odklad daňového přiznání PO", price: "5 000 Kč" },
  { service: "Správa nemovitostí (družstva, SVJ...)", price: "150 Kč/jednotka" },
  { service: "Žádosti, odvolání, prominutí penále a další", price: "Od 1 000 Kč" },
  { service: "Poradenství v oblasti správního řízení v silniční dopravě", price: "Od 1 500 Kč/hod." },
  { service: "Poradenství v oblasti celního a daňového řízení", price: "Od 1 500 Kč/hod." },
];

function Header() {
  const yearsWithClients = getYearsSinceFoundation();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 text-slate-950 shadow-[0_16px_50px_rgba(45,55,130,0.10)] backdrop-blur-xl">
        <nav className="container mx-auto px-5 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group rounded-full pr-3 transition hover:opacity-90">
              <span className="leading-tight">
                <span className="block text-xl font-black tracking-tight text-[#2C1E2C] md:text-2xl">Partex real</span>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.26em] text-[#5865F2] sm:block">účetnictví · daně · mzdy</span>
              </span>
            </Link>
            <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 text-sm font-semibold text-slate-700 shadow-inner md:flex">
              <Link href="/#sluzby" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Služby</Link>
              <Link href="/#o-nas" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">O nás</Link>
              <Link href="/cenik" className="rounded-full bg-[#5865F2]/10 px-4 py-2 text-[#5865F2] transition">Ceník</Link>
              <Link href="/#kontakt" className="rounded-full px-4 py-2 transition hover:bg-[#5865F2]/10 hover:text-[#5865F2]">Kontakt</Link>
            </div>
            <Link
              href="/#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[#57F287] px-4 py-3 text-sm font-extrabold text-[#17351f] shadow-[0_12px_30px_rgba(87,242,135,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#4ADB7A] md:px-6"
            >
              <span className="hidden sm:inline">Kontaktujte nás</span><span className="sm:hidden">Kontakt</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </nav>
      </header>
      <div className="relative z-10 bg-[#2C1E2C] px-6 py-3 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-inner">
        Již {yearsWithClients} let jsme tu pro naše klienty
      </div>
    </>
  );
}

export default function CenikPage() {
  return (
    <main className="min-h-screen bg-[#f7f8ff] text-slate-950">
      <Header />

      <section className="relative overflow-hidden bg-[#5865F2] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(87,242,135,0.26),transparent_28%),linear-gradient(135deg,#5865F2_0%,#4450d4_55%,#2C1E2C_100%)]" />
        <div className="container relative mx-auto px-6 text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-[#57F287]">Platný od 1. 1. 2024</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Ceník služeb</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/86">Orientační ceny účetních, daňových a poradenských služeb. Finální rozsah rádi upřesníme podle vašich potřeb.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_22px_70px_rgba(29,38,90,0.10)] ring-1 ring-slate-200">
            <div className="hidden md:grid grid-cols-[1.5fr_0.8fr_1.2fr] bg-[#2C1E2C] px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white">
              <div>Služba</div>
              <div>Cena</div>
              <div>Poznámka</div>
            </div>
            <div className="divide-y divide-slate-100">
              {pricingItems.map((item, index) => (
                <div key={`${item.service}-${index}`} className="grid gap-3 px-6 py-5 transition hover:bg-[#5865F2]/5 md:grid-cols-[1.5fr_0.8fr_1.2fr] md:items-center">
                  <div className="font-bold text-slate-950">{item.service}</div>
                  <div className="text-lg font-black text-[#5865F2]">{item.price}</div>
                  <div className="text-sm leading-6 text-slate-600">{item.note || "—"}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-[#5865F2] px-8 py-4 font-extrabold text-white shadow-[0_18px_40px_rgba(88,101,242,0.28)] transition-all hover:-translate-y-1 hover:bg-[#4752C4]"
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
              <h3 className="font-bold text-xl mb-4">Partex Real s.r.o.</h3>
              <p className="text-gray-300 leading-relaxed">Profesionální účetní a daňové služby pro vaši firmu</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Rychlé odkazy</h3>
              <ul className="space-y-3">
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
            <p>&copy; {FOUNDATION_YEAR}–{CURRENT_YEAR} Partex Real s.r.o. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
