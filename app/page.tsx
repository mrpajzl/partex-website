"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Mail, Phone, MapPin, Clock, Users, Calculator, Clipboard, ArrowRight, X, ExternalLink, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useState } from "react";
import { getDefaultSiteContent, mergeSiteContent, type SiteContent, type SiteService } from "@/lib/site-content";
import { homepageJsonLd } from "@/lib/seo";
import { activeSite } from "@/lib/sites";

const iconMap = { Calculator, Users, Clipboard, Mail, Phone, MapPin, Clock };

const FOUNDATION_DATE = new Date(`${activeSite.contact.foundingDate}T00:00:00+01:00`);
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


function BrandHeroImage({ className = "" }: { className?: string }) {
  return (
    <Image
      src={activeSite.heroImage.src}
      alt={activeSite.heroImage.alt}
      width={activeSite.heroImage.width}
      height={activeSite.heroImage.height}
      className={className}
      priority
    />
  );
}

function BrandLogo() {
  if (activeSite.logo) {
    return (
      <Image
        src={activeSite.logo.src}
        alt={activeSite.logo.alt}
        width={activeSite.logo.width}
        height={activeSite.logo.height}
        priority
        className="h-12 w-auto max-w-[12rem] flex-shrink object-contain object-left sm:h-14 sm:max-w-[16rem] md:h-16 md:max-w-[20rem]"
      />
    );
  }

  return (
    <span className="leading-tight">
      <span className="block text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{activeSite.textLogo?.title ?? activeSite.shortName}</span>
      <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-primary)] sm:text-sm">{activeSite.textLogo?.subtitle}</span>
    </span>
  );
}

export default function Home() {
  const yearsWithClients = getYearsSinceFoundation();
  const [activeService, setActiveService] = useState<SiteService | null>(null);
  const [usefulLinksOpen, setUsefulLinksOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const defaults = getDefaultSiteContent(activeSite.key);
  const storedContent = useQuery(api.content.getSiteContent, { key: activeSite.contentKey });
  const site = mergeSiteContent(storedContent?.value as Partial<SiteContent> | undefined, defaults);
  const themeStyle = {
    "--color-primary": activeSite.theme.primary,
    "--color-primary-hover": activeSite.theme.primaryHover,
    "--color-primary-dark": activeSite.theme.primaryDark,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd()) }}
      />
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 shadow-[0_16px_50px_rgba(45,55,130,0.10)] backdrop-blur-xl">
        <nav className="container mx-auto px-4 py-2.5 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-3">
            <a href="#top" className="group flex min-w-0 flex-1 items-center gap-3 rounded-full pr-2 transition hover:opacity-90" aria-label="Zpět na začátek stránky">
              <BrandLogo />
            </a>
            <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 text-sm font-semibold text-slate-700 shadow-inner lg:flex">
              {site.navigation.map((item) => item.href.startsWith("/") ? (
                <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 transition hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]">{item.label}</Link>
              ) : (
                <a key={item.href} href={item.href} className="rounded-full px-4 py-2 transition hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]">{item.label}</a>
              ))}
            </div>
            <a
              href="#kontakt"
              className="group hidden flex-shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-3 py-2.5 text-xs font-extrabold text-[var(--color-accent-text)] shadow-[0_12px_30px_rgba(87,242,135,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)] sm:text-sm md:px-6 md:py-3 lg:inline-flex"
            >
              <span className="hidden sm:inline">Kontaktujte nás</span><span className="sm:hidden">Kontakt</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/90 text-[var(--color-dark)] shadow-sm ring-1 ring-slate-200 transition hover:bg-white lg:hidden"
              aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700 shadow-[0_18px_50px_rgba(45,55,130,0.14)] lg:hidden">
              <div className="grid gap-2">
                {site.navigation.map((item) => item.href.startsWith("/") ? (
                  <Link key={item.href} onClick={() => setMobileMenuOpen(false)} href={item.href} className="rounded-2xl px-4 py-3 transition hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]">{item.label}</Link>
                ) : (
                  <a key={item.href} onClick={() => setMobileMenuOpen(false)} href={item.href} className="rounded-2xl px-4 py-3 transition hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]">{item.label}</a>
                ))}
                <a onClick={() => setMobileMenuOpen(false)} href="#kontakt" className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-4 py-3 font-extrabold text-[var(--color-accent-text)] transition hover:bg-[var(--color-accent-hover)]">
                  Kontaktujte nás
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <div className="relative z-10 bg-[var(--color-dark)] px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-[0.10em] text-white shadow-inner sm:text-sm sm:tracking-[0.18em]">
        <span className="mx-auto block max-w-[21rem] sm:max-w-none">{site.hero.yearsBannerPrefix} {yearsWithClients} {site.hero.yearsBannerSuffix}</span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] text-white pt-6 pb-20">
        <div className="absolute inset-0" style={{ background: `${activeSite.theme.heroRadial},${activeSite.theme.heroGradient}` }} />
        <div className="absolute inset-x-0 top-0 h-28 bg-white/10 blur-3xl" />
        <div className="container relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-12">
          <div className={`grid items-center gap-2 md:grid-cols-[minmax(0,1fr)_minmax(460px,0.95fr)] lg:grid-cols-[minmax(0,0.96fr)_minmax(600px,1.04fr)] lg:gap-0 ${activeSite.heroImage.position === "left" ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}>
            <div className="relative z-20 max-w-5xl">
              <h1 className="max-w-[22rem] text-3xl font-black leading-[1.02] tracking-tight sm:max-w-4xl sm:text-4xl md:max-w-[50rem] md:text-6xl lg:max-w-[58rem] lg:text-7xl">
                {site.hero.title}
              </h1>
              <p className="mt-5 max-w-[22rem] text-base leading-7 text-white/86 sm:max-w-2xl sm:text-lg md:max-w-[38rem] md:text-2xl md:leading-9">{site.hero.subtitle}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href={site.hero.primaryCtaHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-extrabold text-[var(--color-primary)] sm:px-8 sm:py-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1 hover:bg-[#f4f6ff]"
                >
                  {site.hero.primaryCtaText}
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="relative hidden min-h-[500px] items-center justify-center md:flex lg:min-h-[540px]">
              <div className="absolute right-2 top-0 h-[36rem] w-[36rem] rounded-full border border-white/10" />
              <div className="absolute right-16 top-12 h-[26rem] w-[26rem] rounded-full bg-[var(--color-accent)]/18 blur-3xl" />
              <BrandHeroImage className={`relative z-10 max-w-none object-contain drop-shadow-[0_34px_45px_rgba(0,0,0,0.24)] ${activeSite.heroImage.position === "left" ? "w-[390px] translate-y-8 lg:w-[460px]" : "w-[820px] -translate-x-8 translate-y-16 lg:w-[960px] lg:-translate-x-12 xl:w-[1040px]"}`} />
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
        <div className="absolute inset-x-0 top-8 mx-auto h-48 max-w-5xl rounded-full bg-[var(--color-primary)]/5 blur-3xl" />
        <div className="container relative mx-auto w-full max-w-[100vw] px-4 sm:px-6">
          <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{site.services.heading}</h2>
          <p className="mx-auto mb-10 max-w-[18rem] text-center text-base leading-7 text-slate-600 sm:max-w-2xl md:mb-16 md:text-lg md:leading-8">{site.services.description}</p>
          
          <div className="mx-auto grid w-full max-w-[calc(100vw-2rem)] gap-5 md:max-w-6xl md:grid-cols-3 md:gap-8">
            {site.services.cards.map((service) => {
              const Icon = iconMap[service.icon] ?? Calculator;
              return (
                <div
                  key={service.title}
                  className="group relative w-full overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_55px_rgba(29,38,90,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(88,101,242,0.16)]"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-primary)]/8 transition group-hover:bg-[var(--color-accent)]/18" />
                  <div className="relative mb-6 flex h-18 w-18 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-dark)] shadow-lg shadow-[var(--color-primary)]/20">
                    <Icon className="h-9 w-9 text-white" />
                  </div>
                  <h3 className="relative mb-4 text-2xl font-black text-slate-950">{service.title}</h3>
                  <p className="relative mb-6 overflow-wrap-anywhere leading-7 text-slate-600">{service.description}</p>
                  <button
                    type="button"
                    onClick={() => setActiveService(service)}
                    className="relative inline-flex items-center rounded-full bg-[var(--color-accent)] px-6 py-2.5 font-extrabold text-[var(--color-accent-text)] shadow-lg shadow-[var(--color-accent)]/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)]"
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
      <section className="relative overflow-hidden bg-[var(--color-page-bg)] py-20 md:py-28">
        <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[var(--color-accent)]/14 blur-3xl" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-[0_28px_80px_rgba(29,38,90,0.10)] md:grid-cols-[1fr_auto] md:p-12">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-[var(--color-primary)]">{site.pricingCta.eyebrow}</p>
              <h2 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{site.pricingCta.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{site.pricingCta.description}</p>
            </div>
            <Link
              href="/cenik"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 font-extrabold text-white shadow-[0_18px_40px_rgba(88,101,242,0.28)] transition-all hover:-translate-y-1 hover:bg-[var(--color-primary-hover)]"
            >
              {site.pricingCta.buttonText}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Support Banner Section with Diagonals */}
      {site.supportBanner.enabled && <section className="relative bg-[var(--color-primary)] text-white py-32">
        {/* Top diagonal */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M0,0 L1200,60 L1200,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{site.supportBanner.title}</h2>
            <div className="mt-8 flex justify-center">
              <Image
                src={site.supportBanner.imageUrl}
                alt={site.supportBanner.imageAlt}
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
      </section>}

      {/* Service Details */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-[var(--color-page-bg)] p-8 shadow-[0_18px_55px_rgba(29,38,90,0.08)] md:p-12">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10 text-slate-950">{site.replacementFulfillment.title}</h2>
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              {site.replacementFulfillment.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-slate-950">{site.replacementFulfillment.linksTitle}</h3>
              <ul className="space-y-3 text-slate-700">
                {site.replacementFulfillment.links.map((link) => <li key={link.href}><a className="font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline" href={link.href} target="_blank" rel="noreferrer">{link.title}</a>{link.description ? ` — ${link.description}` : ""}</li>)}
              </ul>
            </div>
            <p className="mt-8 text-lg text-slate-700">{site.replacementFulfillment.closingText} <a className="font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline" href="#kontakt">Kontaktovat</a>.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-nas" className="py-20 md:py-28 bg-[var(--color-page-bg)]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">{site.about.title}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {site.about.content}
            </div>
            <div className="mt-10 rounded-3xl bg-white p-6 text-lg leading-8 text-slate-700 shadow-sm ring-1 ring-slate-200">
              Společnost Partex real s. r. o. byla založena 15. listopadu {FOUNDATION_YEAR}. Již {yearsWithClients} let jsme tu pro naše klienty a pomáháme jim s účetnictvím, daněmi, mzdami i související administrativou.
            </div>
          </div>
        </div>
      </section>

      {/* Job Posting Section */}
      {site.hiring.enabled && <section className="relative bg-[var(--color-primary)] text-white py-32">
        {/* Top diagonal */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M0,0 L1200,60 L1200,120 L0,120 Z" fill="#F8F9FA"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{site.hiring.title}</h2>
            <p className="text-lg opacity-90 mb-8">{site.hiring.description}</p>
            <a 
              href="#kontakt"
              className="inline-block bg-white text-[var(--color-primary)] px-8 py-3.5 rounded-full font-semibold hover:bg-slate-100 transition-all hover:scale-105"
            >
              {site.hiring.buttonText}
            </a>
          </div>
        </div>

        {/* Bottom diagonal to contact/footer */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 L1200,60 L1200,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>}

      {/* Contact Section */}
      <section id="kontakt" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">{site.contact.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto">
            {site.contact.items.map((item) => {
              const Icon = iconMap[item.icon] ?? MapPin;
              const content = (
                <>
                  <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4 transition group-hover:bg-[var(--color-primary)]/15">
                    <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-bold mb-3 text-gray-900">{item.label}</h3>
                  <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed group-hover:text-[var(--color-primary)]">{item.value}</p>
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
              src={site.contact.mapEmbedUrl}
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
            <div className="flex items-center justify-between bg-[var(--color-dark)] px-5 py-4 text-white">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">Pro klienty</div>
                <div className="text-lg font-black">Užitečné odkazy</div>
              </div>
              <button type="button" onClick={() => setUsefulLinksOpen(false)} className="rounded-full bg-white/10 p-2 transition hover:bg-white/20" aria-label="Zavřít užitečné odkazy">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] divide-y divide-slate-100 overflow-y-auto">
              {site.usefulLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-4 px-5 py-3.5 transition hover:bg-[var(--color-primary)]/5">
                  <span>
                    <span className="block font-bold text-slate-950 group-hover:text-[var(--color-primary)]">{link.title}</span>
                    <span className="mt-0.5 block text-sm leading-5 text-slate-500">{link.description}</span>
                  </span>
                  <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-[var(--color-primary)]" />
                </a>
              ))}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setUsefulLinksOpen((open) => !open)}
          className="rounded-full bg-[var(--color-accent)] px-3.5 py-2.5 text-xs font-black sm:px-5 sm:py-3 sm:text-sm text-[var(--color-accent-text)] shadow-[0_18px_42px_rgba(87,242,135,0.34)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)]"
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
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-dark)] shadow-lg shadow-[var(--color-primary)]/20">
              {(() => {
                const Icon = iconMap[activeService.icon] ?? Calculator;
                return <Icon className="h-8 w-8 text-white" />;
              })()}
            </div>
            <h3 id="service-dialog-title" className="pr-12 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{activeService.title}</h3>
            <p className="mt-4 text-lg leading-8 text-slate-600">{activeService.description}</p>
            {activeService.intro && <p className="mt-7 font-bold text-slate-950">{activeService.intro}</p>}
            <ul className="mt-6 space-y-4">
              {activeService.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-slate-700">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <span className="leading-7">{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#kontakt" onClick={() => setActiveService(null)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3.5 font-extrabold text-white transition hover:bg-[var(--color-primary-hover)]">
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
      <footer className="bg-[var(--color-dark)] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Partex real s. r. o.</h3>
              <p className="text-gray-300 leading-relaxed">{site.footer.tagline}</p>
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
              <p className="text-gray-300 mb-2">{site.contact.items.find((item) => item.icon === "Mail")?.value}</p>
              <p className="text-gray-300">{site.contact.items.find((item) => item.icon === "Phone")?.value}</p>
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
