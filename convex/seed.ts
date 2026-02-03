import { internalMutation } from "./_generated/server";

export const seedData = internalMutation({
  handler: async (ctx) => {
    // Clear existing data
    const tables = ["hero", "services", "newsletter", "serviceDetails", "pricingPackages", "about", "contact", "settings"];
    for (const table of tables) {
      const existing = await ctx.db.query(table as any).collect();
      for (const item of existing) {
        await ctx.db.delete(item._id);
      }
    }

    // Hero section
    await ctx.db.insert("hero", {
      title: "Vaše cesta k úspěchu je i naše práce",
      subtitle: "Pomůžeme vám dosáhnout vašich cílů",
      imageUrl: "/hero-illustration.svg",
      ctaText: "Zjistit více",
      ctaLink: "#sluzby",
      isActive: true,
    });

    // Services
    const services = [
      {
        title: "Mzdinář",
        description: "Spolehlivé služby na jednom místě, jsme tu pro vás 24/7",
        icon: "users",
        ctaText: "Zjistit více",
        ctaLink: "/sluzby/mzdinar",
        order: 1,
        isActive: true,
      },
      {
        title: "Vedení účetnictví",
        description: "Rychlé a efektivní řešení pro vaše účetní záležitosti",
        icon: "calculator",
        ctaText: "Zjistit více",
        ctaLink: "/sluzby/ucetnictvi",
        order: 2,
        isActive: true,
      },
      {
        title: "Daňové poradenství",
        description: "Nabízíme kompletní daňové poradenství pro fyzické i právnické osoby",
        icon: "clipboard",
        ctaText: "Zjistit více",
        ctaLink: "/sluzby/dane",
        order: 3,
        isActive: true,
      },
    ];

    for (const service of services) {
      await ctx.db.insert("services", service);
    }

    // Newsletter
    await ctx.db.insert("newsletter", {
      title: "Přispívejme na babybox",
      description: "Staňte se součástí naší komunity",
      ctaText: "Sofia",
      isActive: true,
    });

    // Service Details
    await ctx.db.insert("serviceDetails", {
      title: "Náhradní plnění",
      content: "U uložení nadlimitní částky od 12.000 Kč do automatického prostoru máte možnost získat od 1 % výnosnosti prostředku podle zákona přistoupíme.",
      order: 1,
      isActive: true,
    });

    await ctx.db.insert("serviceDetails", {
      title: "Pokročilé poradenství",
      content: "Nabízíme pokročilé daňové poradenství, audití vedení firmy/stavby přímo u klienta, ať se jedná o účetnictví nebo daňovou evidence. Data zpracováváme v souladu s platnými zákony.",
      order: 2,
      isActive: true,
    });

    // Pricing Packages
    await ctx.db.insert("pricingPackages", {
      name: "Basic mzdové služby",
      price: 60,
      currency: "Kč",
      unit: "měsíc",
      features: [
        "Základní zpracování mezd",
        "Odvody pojištění až 3 zaměstnance",
        "Přehled mzdových služeb (DDR mzdy za 0 Kč)",
      ],
      order: 1,
      isActive: true,
    });

    await ctx.db.insert("pricingPackages", {
      name: "Vedení účetnictví",
      price: 150,
      currency: "Kč",
      unit: "měsíc",
      features: [
        "Kompletní vedení účetnictví",
        "Daňové přiznání",
        "Poradenství zdarma",
      ],
      order: 2,
      isActive: true,
    });

    // About
    await ctx.db.insert("about", {
      title: "O nás",
      content: `Naše účetní firma působí ve velmi krásné části našeho města již mnoho let a v současné době ji určují rozsáhlé služby v oborech: daňové přiznání, ekonomická poradenství, správa majetku.

Pomáháme našim zákazníkům založit společnost v ČR v různých formách, jedná se zejména o s.r.o., a.s., živnost na základě ustanovení, jako jsou daňová registrace, jednání s bankami & pojišťovny ve prospěchu zákazníka, úrazovosti, pojistné v oblasti silničního provozu a jiné, specializované služby na základě potřeb zákazníka.

Naše firma spolupracuje velmi úzce s bankovními a pojišťovacími specialisty a advokátní kanceláří a díky tomuto dokáže poskytnout nejlepší nezávislý servis.

Specializujeme se na řadu funkcí podnikového účetnictví, mzdové a platové poradenství včetně vedení personalistiky, daňové přiznání a daňové optimalizace, externího daňového poradenství a veškerého servisu ekonomicko-finančního charakteru vůči státním institucím a příslušným úřadům.

Charakteristicky klademe důraz na řešení konkrétních problémů klientů z reálných situací, které mají mnoho aspektů - od samotné realizace jednotlivých úkonů po poskytnutí koncových řešení pomocí naší firmy využívajíc nejlepší dostupné technologie a informace.`,
      isActive: true,
    });

    // Contact
    await ctx.db.insert("contact", {
      type: "address",
      label: "Adresa",
      value: "Partex real s.r.o.\nHK Králové\nČeská Republika",
      icon: "map-pin",
      order: 1,
      isActive: true,
    });

    await ctx.db.insert("contact", {
      type: "email",
      label: "E-Mail",
      value: "info@partex.cz",
      icon: "mail",
      order: 2,
      isActive: true,
    });

    await ctx.db.insert("contact", {
      type: "phone",
      label: "Telefon",
      value: "+420 123 456 789",
      icon: "phone",
      order: 3,
      isActive: true,
    });

    await ctx.db.insert("contact", {
      type: "hours",
      label: "Otevírací doba",
      value: "Po-Pá: 9:00 - 17:00\nSo-Ne: Zavřeno",
      icon: "clock",
      order: 4,
      isActive: true,
    });

    // Settings
    await ctx.db.insert("settings", {
      key: "site_title",
      value: "Partex Real - Účetní a daňové služby",
      description: "Main site title for SEO",
    });

    await ctx.db.insert("settings", {
      key: "site_description",
      value: "Profesionální účetní a daňové služby pro fyzické i právnické osoby. Mzdové služby, vedení účetnictví, daňové poradenství.",
      description: "Site meta description",
    });

    return { success: true };
  },
});
