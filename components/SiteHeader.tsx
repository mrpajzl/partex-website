"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { getYearsSinceFoundation, YearsBannerText } from "@/lib/foundation";
import type { SiteContent } from "@/lib/site-content";
import { activeSite } from "@/lib/sites";

type SiteHeaderProps = {
  site: SiteContent;
  currentPath?: "/" | "/cenik";
};

function BrandLogo() {
  if (activeSite.logo) {
    return (
      <Image
        src={activeSite.logo.src}
        alt={activeSite.logo.alt}
        width={activeSite.logo.width}
        height={activeSite.logo.height}
        priority
        sizes="(min-width: 768px) 20rem, (min-width: 640px) 16rem, 12rem"
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

export function SiteHeader({ site, currentPath = "/" }: SiteHeaderProps) {
  const yearsWithClients = getYearsSinceFoundation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuId = useId();
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const showYearsBanner = activeSite.key !== "kencka";

  const getNavHref = useCallback(
    (href: string) => (currentPath === "/cenik" && href.startsWith("#") ? `/${href}` : href),
    [currentPath]
  );

  const closeMobileMenu = useCallback((restoreFocus = false) => {
    setMobileMenuOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    mobileMenuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        closeMobileMenu(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [closeMobileMenu, mobileMenuOpen]);

  const renderNavItem = (item: SiteContent["navigation"][number], isMobile = false) => {
    const href = getNavHref(item.href);
    const isCurrentPage = currentPath === item.href;
    const className = isMobile
      ? `rounded-2xl px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${isCurrentPage ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"}`
      : `rounded-full px-4 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${isCurrentPage ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"}`;

    const commonProps = {
      className,
      "aria-current": isCurrentPage ? "page" as const : undefined,
      onClick: isMobile ? () => closeMobileMenu(false) : undefined,
    };

    if (href.startsWith("/")) {
      return (
        <Link key={item.href} href={href} {...commonProps}>
          {item.label}
        </Link>
      );
    }

    return (
      <a key={item.href} href={href} {...commonProps}>
        {item.label}
      </a>
    );
  };

  const logo = currentPath === "/" ? (
    <a href="#top" className="group flex min-w-0 flex-1 items-center gap-3 rounded-full pr-2 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]" aria-label="Zpět na začátek stránky">
      <BrandLogo />
    </a>
  ) : (
    <Link href="/#top" className="group flex min-w-0 flex-1 items-center gap-3 rounded-full pr-2 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]" aria-label="Zpět na začátek stránky">
      <BrandLogo />
    </Link>
  );

  const contactHref = currentPath === "/" ? "#kontakt" : "/#kontakt";
  const ContactLink = currentPath === "/" ? "a" : Link;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 text-slate-950 shadow-[0_16px_50px_rgba(45,55,130,0.10)] backdrop-blur-xl">
        <nav ref={navRef} aria-label="Hlavní navigace" className="container relative mx-auto px-4 py-2.5 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-3">
            {logo}
            <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 text-sm font-semibold text-slate-700 shadow-inner lg:flex">
              {site.navigation.map((item) => renderNavItem(item))}
            </div>
            <ContactLink
              href={contactHref}
              className="group hidden flex-shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-3 py-2.5 text-xs font-extrabold text-[var(--color-accent-text)] shadow-[0_12px_30px_rgba(87,242,135,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:text-sm md:px-6 md:py-3 lg:inline-flex"
            >
              <span className="hidden sm:inline">Kontaktujte nás</span><span className="sm:hidden">Kontakt</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </ContactLink>
            <button
              ref={mobileMenuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/90 text-[var(--color-dark)] shadow-sm ring-1 ring-slate-200 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] lg:hidden"
              aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuId}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              id={mobileMenuId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobilní navigace"
              className="absolute inset-x-4 top-full z-[60] mt-3 max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain rounded-3xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700 shadow-[0_18px_50px_rgba(45,55,130,0.14)] lg:hidden"
            >
              <div className="grid gap-2">
                {site.navigation.map((item) => renderNavItem(item, true))}
                <ContactLink onClick={() => closeMobileMenu(false)} href={contactHref} className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-4 py-3 font-extrabold text-[var(--color-accent-text)] transition hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]">
                  Kontaktujte nás
                  <ArrowRight className="h-4 w-4" />
                </ContactLink>
              </div>
            </div>
          )}
        </nav>
      </header>
      {showYearsBanner && (
        <div className="relative z-10 bg-[var(--color-dark)] px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-inner sm:text-sm sm:tracking-[0.18em]">
          <span className="mx-auto block max-w-[21rem] sm:max-w-none"><YearsBannerText years={yearsWithClients} /></span>
        </div>
      )}
    </>
  );
}
