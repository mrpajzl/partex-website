"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { type CSSProperties } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { CURRENT_YEAR, FOUNDATION_DATE } from "@/lib/foundation";
import { getDefaultSiteContent, mergeSiteContent, type PricingItem, type SiteContent } from "@/lib/site-content";
import { pricingBreadcrumbJsonLd, pricingPageJsonLd } from "@/lib/seo";
import { activeSite } from "@/lib/sites";

function getPricingItemCount(items: PricingItem[]): number {
  return items.reduce((count, item) => count + 1 + getPricingItemCount(item.children ?? []), 0);
}

function getPricingItemCountLabel(count: number) {
  if (count === 1) return "1 položka";
  if (count >= 2 && count <= 4) return `${count} položky`;
  return `${count} položek`;
}

function PriceItem({ item, sectionTitle, index }: { item: PricingItem; sectionTitle: string; index: number }) {
  return (
    <div className="px-5 py-3.5 transition hover:bg-[var(--color-primary)]/5 md:px-6">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
        <div className="min-w-0">
          <div className="font-bold leading-6 text-slate-950">{item.service}</div>
          {item.note && (
            <div className="mt-1.5 inline-flex max-w-full rounded-xl bg-[var(--color-primary)]/8 px-3 py-1.5 text-xs font-medium leading-5 text-slate-700 ring-1 ring-[var(--color-primary)]/10">
              {item.note}
            </div>
          )}
        </div>
        {item.price && (
          <div className="flex items-start md:justify-end">
            <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1.5 text-sm font-black whitespace-nowrap text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/10 md:text-right">
              <span className="sr-only">Cena: </span>{item.price}
            </span>
          </div>
        )}
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
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-black whitespace-nowrap text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/15">
                      <span className="sr-only">Cena: </span>{child.price}
                    </span>
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

type CenikClientProps = {
  initialContent?: Partial<SiteContent>;
};

export function CenikClient({ initialContent }: CenikClientProps) {
  const defaults = getDefaultSiteContent(activeSite.key);
  const site = mergeSiteContent(initialContent, defaults);
  const themeStyle = {
    "--color-primary": activeSite.theme.primary,
    "--color-primary-hover": activeSite.theme.primaryHover,
    "--color-accent": activeSite.theme.accent,
    "--color-accent-hover": activeSite.theme.accentHover,
    "--color-accent-text": activeSite.theme.accentText,
    "--color-page-bg": activeSite.theme.pageBg,
    "--color-dark": activeSite.theme.dark,
  } as CSSProperties;

  return (
    <main id="top" style={themeStyle} className="min-h-screen bg-[var(--color-page-bg)] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingPageJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingBreadcrumbJsonLd()) }}
      />
      <a href="#main-content" className="skip-link">Přejít na ceník</a>
      <SiteHeader site={site} currentPath="/cenik" />

      <section id="main-content" tabIndex={-1} className="relative overflow-hidden bg-[var(--color-primary)] py-20 text-white md:py-28">
        <div className="absolute inset-0" style={{ background: [activeSite.theme.heroRadial, activeSite.theme.heroGradient].filter(Boolean).join(",") }} />
        <div className="container relative mx-auto px-6 text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">{site.pricingPage.eyebrow}</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">{site.pricingPage.title}</h1>
          <p className="mx-auto mt-5 max-w-[20rem] text-base leading-7 text-white/86 sm:max-w-2xl sm:text-lg sm:leading-8">{site.pricingPage.description}</p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-[100vw] px-4 sm:px-6">
          <div className="mx-auto max-w-[calc(100vw-2rem)] space-y-5 md:max-w-none">
            {site.pricingPage.sections.map((section, sectionIndex) => {
              const itemCountLabel = getPricingItemCountLabel(getPricingItemCount(section.items));
              const sectionHeadingId = `pricing-section-${sectionIndex}-heading`;
              const sectionDescriptionId = `pricing-section-${sectionIndex}-description`;
              const sectionCountId = `pricing-section-${sectionIndex}-count`;

              return (
                <section
                  key={section.title}
                  aria-labelledby={sectionHeadingId}
                  aria-describedby={`${sectionDescriptionId} ${sectionCountId}`}
                  className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_45px_rgba(29,38,90,0.08)] ring-1 ring-slate-200"
                >
                  <div className="border-b border-slate-100 bg-gradient-to-r from-[var(--color-dark)] to-[var(--color-primary)] px-5 py-4 text-white md:px-6">
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                      <div>
                        <h2 id={sectionHeadingId} className="text-xl font-black tracking-tight">{section.title}</h2>
                        <p id={sectionDescriptionId} className="mt-1 max-w-2xl text-xs leading-5 text-white/78">{section.description}</p>
                      </div>
                      <div id={sectionCountId} className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">{itemCountLabel}</div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {section.items.map((item, index) => <PriceItem key={`${section.title}-${item.service}-${index}`} item={item} sectionTitle={section.title} index={index} />)}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3.5 font-extrabold text-white shadow-[0_18px_40px_rgba(88,101,242,0.28)] transition-all hover:-translate-y-1 hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
            >
              Kontaktujte nás pro cenovou nabídku
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--color-dark)] py-10 text-center text-sm text-white/70">
        © {FOUNDATION_DATE.getFullYear()}–{CURRENT_YEAR} {activeSite.name}. Všechna práva vyhrazena.
      </footer>
    </main>
  );
}
