import type { MetadataRoute } from "next";
import { activeSite as siteConfig } from "@/lib/sites";

export { siteConfig };

export const homepageSeo = {
  title: siteConfig.seo.homepageTitle,
  description: siteConfig.seo.homepageDescription,
} as const;

export const pricingSeo = {
  title: siteConfig.seo.pricingTitle,
  description: siteConfig.seo.pricingDescription,
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export const sitemapPages: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl("/"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: absoluteUrl("/cenik"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  },
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "AccountingService", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo?.src ?? siteConfig.heroImage.src),
    image: absoluteUrl(siteConfig.heroImage.src),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.formattedPhone,
    foundingDate: siteConfig.contact.foundingDate,
    priceRange: "Kč",
    address: {
      "@type": "PostalAddress",
      ...siteConfig.contact.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    areaServed: siteConfig.contact.serviceArea.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:30",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.formattedPhone,
        email: siteConfig.contact.email,
        contactType: "customer service",
        areaServed: "CZ",
        availableLanguage: ["cs"],
      },
    ],
    knowsAbout: [
      "vedení účetnictví",
      "daňová evidence",
      "daňová přiznání",
      "mzdové účetnictví",
      "personalistika",
      "náhradní plnění",
      "zastupování na úřadech",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Účetní, daňové a mzdové služby",
      itemListElement: [
        "Účetnictví a daňová evidence",
        "Mzdy a personalistika",
        "Daňová přiznání",
        "Poradenství a zastupování",
        "Náhradní plnění",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, provider: { "@id": `${siteConfig.url}/#organization` } },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "cs-CZ",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function homepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#webpage`,
    url: absoluteUrl("/"),
    name: homepageSeo.title,
    description: homepageSeo.description,
    inLanguage: "cs-CZ",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.heroImage.src),
    },
  };
}

export function pricingPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/cenik#webpage`,
    url: absoluteUrl("/cenik"),
    name: pricingSeo.title,
    description: pricingSeo.description,
    inLanguage: "cs-CZ",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    mainEntity: {
      "@type": "OfferCatalog",
      name: `Ceník služeb ${siteConfig.shortName}`,
      url: absoluteUrl("/cenik"),
      provider: { "@id": `${siteConfig.url}/#organization` },
      itemListElement: [
        "Účetnictví",
        "Mzdy a zaměstnanci",
        "Daňová přiznání",
        "Daně a hlášení",
        "Poradenství a zastupování",
        "Ostatní služby",
      ].map((name) => ({
        "@type": "OfferCatalog",
        name,
      })),
    },
  };
}
