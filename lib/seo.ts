import type { MetadataRoute } from "next";

export const siteConfig = {
  name: "Partex real s. r. o.",
  shortName: "Partex real",
  url: "https://partexreal.cz",
  locale: "cs_CZ",
  language: "cs",
  email: "partex@seznam.cz",
  phone: "+420775554377",
  formattedPhone: "+420 775 554 377",
  foundingDate: "2004-11-15",
  address: {
    streetAddress: "Hrnčířská 42/1",
    addressLocality: "Karviná-Fryštát",
    postalCode: "733 01",
    addressCountry: "CZ",
  },
  geo: {
    latitude: 49.8537,
    longitude: 18.5421,
  },
  serviceArea: ["Karviná", "Moravskoslezský kraj", "Česká republika"],
  keywords: [
    "účetnictví Karviná",
    "daňová evidence Karviná",
    "vedení účetnictví",
    "mzdové účetnictví",
    "daňová přiznání",
    "personalistika",
    "náhradní plnění",
    "účetní služby pro firmy",
    "Partex real",
  ],
} as const;

export const homepageSeo = {
  title: "Účetnictví, mzdy a daně Karviná | Partex real s. r. o.",
  description:
    "Partex real s. r. o. poskytuje účetnictví, daňovou evidenci, mzdy, personalistiku a poradenství v Karviné. Osobní přístup, praxe od roku 2004.",
} as const;

export const pricingSeo = {
  title: "Ceník účetních, daňových a mzdových služeb | Partex real",
  description:
    "Orientační ceník služeb Partex real: vedení účetnictví a daňové evidence, mzdy, daňová přiznání, poradenství, zastupování a další administrativa.",
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
    logo: absoluteUrl("/partex-logo.png"),
    image: absoluteUrl("/partex-logo.png"),
    email: siteConfig.email,
    telephone: siteConfig.formattedPhone,
    foundingDate: siteConfig.foundingDate,
    priceRange: "Kč",
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.serviceArea.map((name) => ({ "@type": "AdministrativeArea", name })),
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
        telephone: siteConfig.formattedPhone,
        email: siteConfig.email,
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
      url: absoluteUrl("/partex-logo.png"),
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
      name: "Ceník služeb Partex real",
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
