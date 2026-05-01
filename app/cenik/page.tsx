"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mergeSiteContent, type PricingItem, type SiteContent } from "@/lib/site-content";

const FOUNDATION_DATE = new Date("2004-11-15T00:00:00+01:00");
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

function Header({ site }: { site: SiteContent }) {
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
                width={1116}
                height={302}
                priority
                className="h-12 w-auto max-w-[12rem] flex-shrink object-contain object-left sm:h-14 sm:max-w-[16rem] md:h-16 md:max-w-[20rem]"
              />
            </Link>
            <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 text-sm font-semibold text-slate-700 shadow-inner lg:flex">
              {site.navigation.map((item) => (
                <Link key={item.href} href={item.href.startsWith("#") ? `/${item.href}` : item.href} className={`rounded-full px-4 py-2 transition ${item.href === "/cenik" ? "bg-[#5865F2]/10 text-[#5865F2]" : "hover:bg-[#5865F2]/10 hover:text-[#5865F2]"}`}>{item.label}</Link>
              ))}
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
                {site.navigation.map((item) => (
                  <Link key={item.href} onClick={() => setMobileMenuOpen(false)} href={item.href.startsWith("#") ? `/${item.href}` : item.href} className={`rounded-2xl px-4 py-3 transition ${item.href === "/cenik" ? "bg-[#5865F2]/10 text-[#5865F2]" : "hover:bg-[#5865F2]/10 hover:text-[#5865F2]"}`}>{item.label}</Link>
                ))}
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
        {site.hero.yearsBannerPrefix} {yearsWithClients} {site.hero.yearsBannerSuffix}
      </div>
    </>
  );
}

function PriceItem({ item, sectionTitle, index }: { item: PricingItem; sectionTitle: string; index: number }) {
  return (
    <div className="px-5 py-3.5 transition hover:bg-[#5865F2]/5 md:px-6">
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
              <div key={`${sectionTitle}-${index}-${child.service}-${child.price}`} className="rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-200/70">
                <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_180px] md:items-start">
                  <div className="min-w-0">
                    <div className="font-semibold leading-6 text-slate-800">{child.service}</div>
                    {child.note && <p className="mt-1 text-xs leading-5 text-slate-500">{child.note}</p>}
                  </div>
                  <div className="flex md:justify-end">
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-black whitespace-nowrap text-[#5865F2] ring-1 ring-[#5865F2]/15">{child.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CenikPage() {
  const storedContent = useQuery(api.content.getSiteContent, { key: "main" });
  const site = mergeSiteContent(storedContent?.value as Partial<SiteContent> | undefined);

  return (
    <main id="top" className="min-h-screen bg-[#f7f8ff] text-slate-950">
      <Header site={site} />

      <section className="relative overflow-hidden bg-[#5865F2] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(87,242,135,0.26),transparent_28%),linear-gradient(135deg,#5865F2_0%,#4450d4_55%,#2C1E2C_100%)]" />
        <div className="container relative mx-auto px-6 text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-[#57F287]">{site.pricingPage.eyebrow}</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">{site.pricingPage.title}</h1>
          <p className="mx-auto mt-5 max-w-[20rem] text-base leading-7 text-white/86 sm:max-w-2xl sm:text-lg sm:leading-8">{site.pricingPage.description}</p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-[100vw] px-4 sm:px-6">
          <div className="mx-auto max-w-[calc(100vw-2rem)] space-y-5 md:max-w-none">
            {site.pricingPage.sections.map((section) => (
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
                  {section.items.map((item, index) => <PriceItem key={`${section.title}-${item.service}-${index}`} item={item} sectionTitle={section.title} index={index} />)}
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

      <footer className="bg-[#2C1E2C] py-10 text-center text-sm text-white/70">
        © {FOUNDATION_DATE.getFullYear()}–{CURRENT_YEAR} Partex real s. r. o. Všechna práva vyhrazena.
      </footer>
    </main>
  );
}
