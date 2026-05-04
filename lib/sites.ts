export type SiteKey = "partex" | "kencka";

export type SiteTheme = {
  primary: string;
  primaryHover: string;
  primaryDark: string;
  accent: string;
  accentHover: string;
  accentText: string;
  pageBg: string;
  dark: string;
  heroGradient: string;
  heroRadial: string;
};

export type RuntimeSite = {
  key: SiteKey;
  contentKey: string;
  name: string;
  shortName: string;
  url: string;
  locale: "cs_CZ";
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  textLogo?: {
    title: string;
    subtitle: string;
  };
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    position: "left" | "right";
  };
  seo: {
    homepageTitle: string;
    homepageDescription: string;
    pricingTitle: string;
    pricingDescription: string;
    keywords: string[];
  };
  contact: {
    email: string;
    phone: string;
    formattedPhone: string;
    foundingDate: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      postalCode: string;
      addressCountry: string;
    };
    geo: {
      latitude: number;
      longitude: number;
    };
    serviceArea: string[];
  };
  theme: SiteTheme;
};

const partexTheme: SiteTheme = {
  primary: "#5865F2",
  primaryHover: "#4752C4",
  primaryDark: "#2C1E2C",
  accent: "#57F287",
  accentHover: "#4ADB7A",
  accentText: "#17351f",
  pageBg: "#f7f8ff",
  dark: "#2C1E2C",
  heroGradient: "linear-gradient(135deg,#5865F2 0%,#4450d4 48%,#2C1E2C 100%)",
  heroRadial: "radial-gradient(circle_at_16%_18%,rgba(87,242,135,0.30),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.22),transparent_26%)",
};

const kenckaTheme: SiteTheme = {
  primary: "#A43931",
  primaryHover: "#8f3029",
  primaryDark: "#2b1718",
  accent: "#0b7b6a",
  accentHover: "#09685a",
  accentText: "#ffffff",
  pageBg: "#fbf7f5",
  dark: "#231416",
  heroGradient: "linear-gradient(150deg, rgb(29, 67, 80) 0%, rgb(164, 57, 49) 100%)",
  heroRadial: "",
};

export const sites: Record<SiteKey, RuntimeSite> = {
  partex: {
    key: "partex",
    contentKey: "main",
    name: "Partex real s. r. o.",
    shortName: "Partex real",
    url: "https://partexreal.cz",
    locale: "cs_CZ",
    logo: {
      src: "/partex-logo.png",
      alt: "Partex real s. r. o. - účetnictví, mzdy, personalistika",
      width: 1116,
      height: 302,
    },
    heroImage: {
      src: "/partex-real-illustration.svg",
      alt: "Partex real účetní služby",
      width: 336,
      height: 235,
      position: "right",
    },
    seo: {
      homepageTitle: "Účetnictví, mzdy a daně Karviná | Partex real s. r. o.",
      homepageDescription: "Partex real s. r. o. poskytuje účetnictví, daňovou evidenci, mzdy, personalistiku a poradenství v Karviné. Osobní přístup, praxe od roku 2004.",
      pricingTitle: "Ceník účetních, daňových a mzdových služeb | Partex real",
      pricingDescription: "Orientační ceník služeb Partex real: vedení účetnictví a daňové evidence, mzdy, daňová přiznání, poradenství, zastupování a další administrativa.",
      keywords: ["účetnictví Karviná", "daňová evidence Karviná", "vedení účetnictví", "mzdové účetnictví", "daňová přiznání", "personalistika", "náhradní plnění", "účetní služby pro firmy", "Partex real"],
    },
    contact: {
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
      geo: { latitude: 49.8537, longitude: 18.5421 },
      serviceArea: ["Karviná", "Moravskoslezský kraj", "Česká republika"],
    },
    theme: partexTheme,
  },
  kencka: {
    key: "kencka",
    contentKey: "kencka",
    name: "Ing. Eva Kencká Účetnictví a mzdy",
    shortName: "Ing. Eva Kencká",
    url: "https://kencka.cz",
    locale: "cs_CZ",
    textLogo: {
      title: "Ing. Eva Kencká",
      subtitle: "Účetnictví a mzdy",
    },
    heroImage: {
      src: "/eva-kencka.png",
      alt: "Ing. Eva Kencká - účetnictví a mzdy",
      width: 390,
      height: 612,
      position: "left",
    },
    seo: {
      homepageTitle: "Účetnictví a mzdy pro podnikatele | Ing. Eva Kencká",
      homepageDescription: "Ing. Eva Kencká poskytuje účetnictví, daňovou evidenci, mzdy a personalistiku pro soukromníky, podnikatele a malé firmy v Karviné i celé ČR.",
      pricingTitle: "Ceník účetnictví a mzdových služeb | Ing. Eva Kencká",
      pricingDescription: "Orientační ceník účetních, daňových a mzdových služeb Ing. Evy Kencké pro podnikatele, soukromníky a malé firmy.",
      keywords: ["Ing. Eva Kencká", "účetnictví Karviná", "účetnictví pro OSVČ", "mzdy a personalistika", "daňová evidence", "daňová přiznání", "účetní služby pro malé firmy", "náhradní plnění"],
    },
    contact: {
      email: "partex@seznam.cz",
      phone: "+420777119938",
      formattedPhone: "+420 777 119 938",
      foundingDate: "1996-01-01",
      address: {
        streetAddress: "Hrnčířská 42/1",
        addressLocality: "Karviná-Fryštát",
        postalCode: "733 01",
        addressCountry: "CZ",
      },
      geo: { latitude: 49.8537, longitude: 18.5421 },
      serviceArea: ["Karviná", "Moravskoslezský kraj", "Česká republika"],
    },
    theme: kenckaTheme,
  },
};

export function getSiteKey(): SiteKey {
  return process.env.NEXT_PUBLIC_SITE_KEY === "kencka" ? "kencka" : "partex";
}

export const activeSite = sites[getSiteKey()];
