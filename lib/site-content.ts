export type SiteService = {
  title: string;
  description: string;
  icon: "Calculator" | "Users" | "Clipboard";
  intro?: string;
  details: string[];
};

export type PricingItem = {
  service: string;
  price: string;
  note?: string;
  children?: PricingItem[];
};

export type PricingSection = {
  title: string;
  description: string;
  items: PricingItem[];
};

export type UsefulLink = {
  title: string;
  description: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type ContactItem = {
  label: string;
  value: string;
  icon: "MapPin" | "Mail" | "Phone" | "Clock";
  href?: string;
};

export type SiteContent = {
  hero: {
    title: string;
    subtitle: string;
    primaryCtaText: string;
    primaryCtaHref: string;
    yearsBannerPrefix: string;
    yearsBannerSuffix: string;
  };
  navigation: NavItem[];
  services: {
    heading: string;
    description: string;
    cards: SiteService[];
  };
  pricingCta: {
    eyebrow: string;
    title: string;
    description: string;
    buttonText: string;
  };
  pricingPage: {
    eyebrow: string;
    title: string;
    description: string;
    sections: PricingSection[];
  };
  supportBanner: {
    enabled: boolean;
    title: string;
    imageUrl: string;
    imageAlt: string;
  };
  replacementFulfillment: {
    title: string;
    paragraphs: string[];
    linksTitle: string;
    links: UsefulLink[];
    closingText: string;
  };
  about: {
    title: string;
    content: string;
  };
  hiring: {
    enabled: boolean;
    title: string;
    description: string;
    buttonText: string;
  };
  contact: {
    title: string;
    items: ContactItem[];
    mapEmbedUrl: string;
  };
  usefulLinks: UsefulLink[];
  footer: {
    tagline: string;
  };
};

export const defaultSiteContent: SiteContent = {
  hero: {
    title: "Vaše cesta k úspěchu je i naše práce",
    subtitle: "Pomůžeme vám dosáhnout vašich cílů",
    primaryCtaText: "Naše služby",
    primaryCtaHref: "#sluzby",
    yearsBannerPrefix: "Již",
    yearsBannerSuffix: "let jsme tu pro naše klienty",
  },
  navigation: [
    { label: "Služby", href: "#sluzby" },
    { label: "O nás", href: "#o-nas" },
    { label: "Ceník", href: "/cenik" },
    { label: "Kontakt", href: "#kontakt" },
  ],
  services: {
    heading: "Co nabízíme?",
    description: "Naše služby jsou navrženy tak, aby vyhovovaly vašim potřebám — přehledně, spolehlivě a bez zbytečného papírování.",
    cards: [
      {
        title: "Účetnictví",
        icon: "Calculator",
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
        icon: "Users",
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
        icon: "Clipboard",
        description: "Odborná praxe pro absolventy, účastníky rekvalifikací a studenty.",
        intro: "Odbornou praxi v našich prostorách nabízíme těmto osobám:",
        details: [
          "absolventům SŠ i VŠ, kteří mají zájem o účetní profesi",
          "účastníkům kurzů v rámci rekvalifikace pořádané úřadem práce",
          "studentům, kteří mají povinnou odbornou praxi v rámci výuky",
        ],
      },
    ],
  },
  pricingCta: {
    eyebrow: "Ceník služeb",
    title: "Jasné ceny pro účetnictví, daně i mzdy",
    description: "Podívejte se na přehled služeb a orientační ceny. Pro konkrétní rozsah vám připravíme nabídku na míru.",
    buttonText: "Zobrazit ceník",
  },
  pricingPage: {
    eyebrow: "Platný od 1. 1. 2024",
    title: "Ceník služeb",
    description: "Orientační ceny účetních, daňových a poradenských služeb. Finální rozsah rádi upřesníme podle vašich potřeb.",
    sections: [
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
    ],
  },
  supportBanner: {
    enabled: true,
    title: "Přispívejme na babybox",
    imageUrl: "/babybox.gif",
    imageAlt: "Podporujeme Babybox",
  },
  replacementFulfillment: {
    title: "Co je náhradní plnění?",
    paragraphs: [
      "Každé firmě, která zaměstnává nad 25 pracovníků, vzniká povinnost zaměstnávat osoby se zdravotním postižením (OZP), a to v povinném podílu 4 % k celkovému přepočtenému počtu zaměstnanců.",
      "V případě, že firma nezaměstnává požadovaný počet OZP, musí ze zákona odvést státu vypočtenou částku.",
      "Náhradní plnění představuje ideální alternativu, pokud vaše firma nemůže přímo zaměstnávat OZP a zároveň chcete ušetřit na zmíněném odvodu státu. Stačí si objednat naše služby a my vám poskytneme tzv. náhradní plnění.",
    ],
    linksTitle: "Důležité odkazy",
    links: [
      { title: "Souhrn legislativy k povinnému podílu zaměstnávání OZP", description: "MPSV", href: "http://portal.mpsv.cz/sz/obecne/prav_predpisy/vyklady/plneni_povinneho_podilu_ozp" },
      { title: "Aktuální zákon č. 435/2004 Sb., §81–83", description: "Zaměstnávání OZP", href: "http://www.mpsv.cz/ppropo.php?ID=z435_2004_2#par81" },
      { title: "Prováděcí vyhláška č. 518/2004 Sb., §17–20", description: "Výpočet plnění povinného podílu", href: "http://www.mpsv.cz/ppropo.php?ID=v518_2004#par16" },
    ],
    closingText: "Pokud máte zájem o tuto službu, neváhejte nás kontaktovat.",
  },
  about: {
    title: "O nás",
    content: "Společnost Partex real s. r. o. poskytuje profesionální účetní, daňové a mzdové služby. Stavíme na osobním přístupu, spolehlivosti a dlouhodobé spolupráci s klienty.",
  },
  hiring: {
    enabled: true,
    title: "Hledáme pozici do našich řad",
    description: "Máme otevřenou pozici pro účetního/mzdového specialistu",
    buttonText: "Kontaktujte nás",
  },
  contact: {
    title: "Kontakty",
    items: [
      { label: "Adresa", value: "Hrnčířská 42/1\n733 01 Karviná-Fryštát", icon: "MapPin", href: "https://www.google.com/maps/search/?api=1&query=Hrn%C4%8D%C3%AD%C5%99sk%C3%A1%2042%2F1%2C%20733%2001%20Karvin%C3%A1-Fry%C5%A1t%C3%A1t" },
      { label: "E-mail", value: "partex@seznam.cz", icon: "Mail", href: "mailto:partex@seznam.cz" },
      { label: "Telefon", value: "+420 775 554 377", icon: "Phone", href: "tel:+420775554377" },
      { label: "Otevírací doba", value: "pondělí – pátek\n8:00 – 16:30", icon: "Clock" },
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=Hrn%C4%8D%C3%AD%C5%99sk%C3%A1%2042%2F1%2C%20733%2001%20Karvin%C3%A1-Fry%C5%A1t%C3%A1t&output=embed",
  },
  usefulLinks: [
    { title: "ARES", description: "Vyhledávání ekonomických subjektů", href: "http://wwwinfo.mfcr.cz/ares/ares_es.html.cz" },
    { title: "Plátci DPH", description: "Čísla účtů pro ekonomickou činnost", href: "http://adisspr.mfcr.cz/adis/jepo/epo/dpr/apl_ramce.htm?R=/adistc/DphReg?ZPRAC=FDPHI1%26poc_dic=2%26OK=Zobraz" },
    { title: "Ověření DIČ v ČR", description: "Registr plátců DPH v ČR", href: "http://adisreg.mfcr.cz/cgi-bin/adis/idph/int_dp_prij.cgi?ZPRAC=FDPHI1&poc_dic=1" },
    { title: "Ověření DIČ v EU", description: "VIES Evropské komise", href: "http://ec.europa.eu/taxation_customs/vies/?locale=cs" },
    { title: "Finanční úřady", description: "Číselník finančních úřadů ČR", href: "http://www.statnisprava.cz/rstsp/ciselniky.nsf/i/d0027" },
    { title: "Justice", description: "Oficiální server českého soudnictví", href: "http://portal.justice.cz/justice2/uvod/uvod.aspx" },
    { title: "Kurzy ČNB", description: "Kurzy devizového trhu", href: "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/" },
  ],
  footer: {
    tagline: "Profesionální účetní a daňové služby pro vaši firmu",
  },
};

export function mergeSiteContent(content: Partial<SiteContent> | null | undefined): SiteContent {
  if (!content) return defaultSiteContent;
  return {
    ...defaultSiteContent,
    ...content,
    hero: { ...defaultSiteContent.hero, ...content.hero },
    services: { ...defaultSiteContent.services, ...content.services },
    pricingCta: { ...defaultSiteContent.pricingCta, ...content.pricingCta },
    pricingPage: { ...defaultSiteContent.pricingPage, ...content.pricingPage },
    supportBanner: { ...defaultSiteContent.supportBanner, ...content.supportBanner },
    replacementFulfillment: { ...defaultSiteContent.replacementFulfillment, ...content.replacementFulfillment },
    about: { ...defaultSiteContent.about, ...content.about },
    hiring: { ...defaultSiteContent.hiring, ...content.hiring },
    contact: { ...defaultSiteContent.contact, ...content.contact },
    footer: { ...defaultSiteContent.footer, ...content.footer },
    navigation: content.navigation ?? defaultSiteContent.navigation,
    usefulLinks: content.usefulLinks ?? defaultSiteContent.usefulLinks,
  };
}
