"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  getDefaultSiteContent,
  mergeSiteContent,
  type ContactItem,
  type NavItem,
  type PricingItem,
  type PricingSection,
  type SiteContent,
  type SiteService,
  type UsefulLink,
} from "@/lib/site-content";
import { activeSite } from "@/lib/sites";
import { Eye, GripVertical, LogOut, MoreHorizontal, Plus, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TabKey = "hero" | "services" | "pricing" | "about" | "contact" | "links" | "other";

type DragState =
  | { type: "pricing-section"; sectionIndex: number }
  | { type: "pricing-item"; sectionIndex: number; itemIndex: number }
  | { type: "pricing-child"; sectionIndex: number; itemIndex: number; childIndex: number }
  | { type: "service"; index: number }
  | { type: "simple"; list: "navigation" | "links" | "contact"; index: number };

const tabs: { key: TabKey; label: string; hint: string }[] = [
  { key: "hero", label: "Hero + menu", hint: "Nadpis, CTA, navigace" },
  { key: "services", label: "Služby", hint: "Karty a detailní body" },
  { key: "pricing", label: "Ceník", hint: "Kategorie, položky, varianty" },
  { key: "about", label: "O nás", hint: "Texty a patička" },
  { key: "contact", label: "Kontakt", hint: "Karty, mapa, odkazy" },
  { key: "links", label: "Odkazy", hint: "Užitečné odkazy" },
  { key: "other", label: "Bannery", hint: "Babybox, nábor, plnění" },
];

export default function AdminDashboard() {
  return <ContentAdmin />;
}

function ContentAdmin() {
  const { signOut } = useAuthActions();
  const defaultContent = getDefaultSiteContent(activeSite.key);
  const stored = useQuery(api.content.getSiteContent, { key: activeSite.contentKey });
  const saveContent = useMutation(api.content.upsertSiteContent);
  const [activeTab, setActiveTab] = useState<TabKey>("hero");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [status, setStatus] = useState<string | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);

  const loadedContent = useMemo(() => mergeSiteContent(stored?.value as Partial<SiteContent> | undefined, defaultContent), [stored, defaultContent]);

  useEffect(() => {
    setContent(loadedContent);
  }, [loadedContent]);

  async function handleSave() {
    setStatus("Ukládám…");
    await saveContent({ key: activeSite.contentKey, value: content });
    setStatus("Uloženo.");
    setTimeout(() => setStatus(null), 2500);
  }

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="min-h-screen bg-[#f7f8ff] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-black">{activeSite.shortName} CMS</h1>
            <p className="text-sm text-slate-500">Pohodlná správa webu bez ručního JSONu</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {status && <span className="rounded-full bg-[#5865F2]/10 px-3 py-2 text-sm font-semibold text-[#5865F2]">{status}</span>}
            <Link href="/" className="btn-secondary-sm flex items-center gap-2 px-3"><Eye className="h-4 w-4" /> Web</Link>
            <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save className="h-4 w-4" /> Uložit změny</button>
            <button onClick={() => void signOut()} className="btn-secondary-sm flex items-center gap-2 px-3"><LogOut className="h-4 w-4" /> Odhlásit</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-2 lg:sticky lg:top-24 lg:self-start">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`w-full rounded-2xl px-4 py-3 text-left transition ${activeTab === tab.key ? "bg-[#5865F2] text-white shadow-lg" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"}`}>
              <span className="block font-black">{tab.label}</span>
              <span className={`mt-1 block text-xs ${activeTab === tab.key ? "text-white/75" : "text-slate-400"}`}>{tab.hint}</span>
            </button>
          ))}
        </aside>

        <section className="rounded-[2rem] bg-white p-4 shadow-[0_18px_60px_rgba(29,38,90,0.08)] ring-1 ring-slate-200 md:p-6">
          {activeTab === "hero" && <HeroEditor content={content} update={update} drag={drag} setDrag={setDrag} />}
          {activeTab === "services" && <ServicesEditor content={content} update={update} drag={drag} setDrag={setDrag} />}
          {activeTab === "pricing" && <PricingEditor content={content} update={update} drag={drag} setDrag={setDrag} />}
          {activeTab === "about" && <AboutEditor content={content} update={update} />}
          {activeTab === "contact" && <ContactEditor content={content} update={update} drag={drag} setDrag={setDrag} />}
          {activeTab === "links" && <LinksEditor content={content} update={update} drag={drag} setDrag={setDrag} />}
          {activeTab === "other" && <OtherEditor content={content} update={update} />}
        </section>
      </div>
    </main>
  );
}

function HeroEditor({ content, update, drag, setDrag }: EditorProps) {
  const nav = content.navigation;
  const setNav = (navigation: NavItem[]) => update("navigation", navigation);

  return (
    <div className="space-y-6">
      <SectionTitle title="Hero + navigace" description="Hlavní sdělení, tlačítko a položky menu v hlavičce." />
      <Panel title="Hlavní hero" description="Texty v první obrazovce webu.">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Nadpis" value={content.hero.title} onChange={(title) => update("hero", { ...content.hero, title })} />
          <TextField label="Podnadpis" value={content.hero.subtitle} onChange={(subtitle) => update("hero", { ...content.hero, subtitle })} />
          <TextField label="Text tlačítka" value={content.hero.primaryCtaText} onChange={(primaryCtaText) => update("hero", { ...content.hero, primaryCtaText })} />
          <TextField label="Odkaz tlačítka" value={content.hero.primaryCtaHref} onChange={(primaryCtaHref) => update("hero", { ...content.hero, primaryCtaHref })} />
          <TextField label="Prefix pruhu s roky" value={content.hero.yearsBannerPrefix} onChange={(yearsBannerPrefix) => update("hero", { ...content.hero, yearsBannerPrefix })} />
          <TextField label="Suffix pruhu s roky" value={content.hero.yearsBannerSuffix} onChange={(yearsBannerSuffix) => update("hero", { ...content.hero, yearsBannerSuffix })} />
        </div>
      </Panel>

      <Panel title="Navigace" description="Přetáhněte položky za ikonku nebo je posuňte tlačítky.">
        <RepeatableHeader onAdd={() => setNav([...nav, { label: "Nová položka", href: "#" }])} addLabel="Přidat položku" />
        <div className="space-y-3">
          {nav.map((item, index) => (
            <DraggableRow key={`${item.label}-${index}`} drag={drag} setDrag={setDrag} dragState={{ type: "simple", list: "navigation", index }} onDrop={() => drag?.type === "simple" && drag.list === "navigation" && setNav(moveItem(nav, drag.index, index))}>
              <Grip />
              <div className="grid flex-1 gap-3 md:grid-cols-2">
                <TextField label="Text" value={item.label} onChange={(label) => setNav(replaceAt(nav, index, { ...item, label }))} compact />
                <TextField label="Odkaz" value={item.href} onChange={(href) => setNav(replaceAt(nav, index, { ...item, href }))} compact />
              </div>
              <RowActions onUp={() => setNav(moveItem(nav, index, index - 1))} onDown={() => setNav(moveItem(nav, index, index + 1))} onDelete={() => setNav(removeAt(nav, index))} />
            </DraggableRow>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ServicesEditor({ content, update, drag, setDrag }: EditorProps) {
  const services = content.services.cards;
  const setServices = (cards: SiteService[]) => update("services", { ...content.services, cards });

  return (
    <div className="space-y-6">
      <SectionTitle title="Služby" description="Karty služeb na homepage včetně detailních bodů." />
      <Panel title="Úvod sekce" description="Nadpis a popisek nad kartami služeb.">
        <TextField label="Nadpis" value={content.services.heading} onChange={(heading) => update("services", { ...content.services, heading })} />
        <TextArea label="Popis" value={content.services.description} onChange={(description) => update("services", { ...content.services, description })} />
      </Panel>

      <Panel title="Karty služeb" description="Každá karta má krátký popis a detailní odrážky.">
        <RepeatableHeader onAdd={() => setServices([...services, newService()])} addLabel="Přidat službu" />
        <div className="space-y-4">
          {services.map((service, index) => (
            <DraggableRow key={`${service.title}-${index}`} vertical drag={drag} setDrag={setDrag} dragState={{ type: "service", index }} onDrop={() => drag?.type === "service" && setServices(moveItem(services, drag.index, index))}>
              <div className="flex items-start gap-3">
                <Grip />
                <div className="flex-1 space-y-4">
                  <div className="grid gap-3 md:grid-cols-[1fr_180px]">
                    <TextField label="Název" value={service.title} onChange={(title) => setServices(replaceAt(services, index, { ...service, title }))} compact />
                    <SelectField label="Ikona" value={service.icon} options={["Calculator", "Users", "Clipboard"]} onChange={(icon) => setServices(replaceAt(services, index, { ...service, icon: icon as SiteService["icon"] }))} />
                  </div>
                  <TextArea label="Krátký popis" value={service.description} onChange={(description) => setServices(replaceAt(services, index, { ...service, description }))} rows={2} />
                  <TextArea label="Úvod detailu (volitelné)" value={service.intro ?? ""} onChange={(intro) => setServices(replaceAt(services, index, { ...service, intro }))} rows={2} />
                  <ListEditor title="Detailní body" items={service.details} onChange={(details) => setServices(replaceAt(services, index, { ...service, details }))} placeholder="Nový bod služby" />
                </div>
                <RowActions onUp={() => setServices(moveItem(services, index, index - 1))} onDown={() => setServices(moveItem(services, index, index + 1))} onDelete={() => setServices(removeAt(services, index))} />
              </div>
            </DraggableRow>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function PricingEditor({ content, update, drag, setDrag }: EditorProps) {
  const page = content.pricingPage;
  const sections = page.sections;
  const setPage = (pricingPage: SiteContent["pricingPage"]) => update("pricingPage", pricingPage);
  const setSections = (next: PricingSection[]) => setPage({ ...page, sections: next });
  const patchSection = (sectionIndex: number, section: PricingSection) => setSections(replaceAt(sections, sectionIndex, section));

  function patchItem(sectionIndex: number, itemIndex: number, item: PricingItem) {
    const section = sections[sectionIndex];
    patchSection(sectionIndex, { ...section, items: replaceAt(section.items, itemIndex, item) });
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Ceník" description="Kategorie, položky, ceny, poznámky a pod-položky. Položky lze přetahovat za madlo." />

      <Panel title="CTA na homepage" description="Malý blok na hlavní stránce, který vede do ceníku.">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Štítek" value={content.pricingCta.eyebrow} onChange={(eyebrow) => update("pricingCta", { ...content.pricingCta, eyebrow })} />
          <TextField label="Text tlačítka" value={content.pricingCta.buttonText} onChange={(buttonText) => update("pricingCta", { ...content.pricingCta, buttonText })} />
          <TextField label="Nadpis" value={content.pricingCta.title} onChange={(title) => update("pricingCta", { ...content.pricingCta, title })} />
          <TextArea label="Popis" value={content.pricingCta.description} onChange={(description) => update("pricingCta", { ...content.pricingCta, description })} rows={2} />
        </div>
      </Panel>

      <Panel title="Hlavička stránky /cenik" description="Úvodní text nad ceníkem.">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Štítek / platnost" value={page.eyebrow} onChange={(eyebrow) => setPage({ ...page, eyebrow })} />
          <TextField label="Nadpis" value={page.title} onChange={(title) => setPage({ ...page, title })} />
        </div>
        <TextArea label="Popis" value={page.description} onChange={(description) => setPage({ ...page, description })} rows={2} />
      </Panel>

      <Panel title="Kategorie ceníku" description="Vytvářejte kategorie, položky a jejich varianty/podpoložky.">
        <RepeatableHeader onAdd={() => setSections([...sections, { title: "Nová kategorie", description: "", items: [] }])} addLabel="Přidat kategorii" />
        <div className="space-y-5">
          {sections.map((section, sectionIndex) => (
            <DraggableRow key={`${section.title}-${sectionIndex}`} vertical drag={drag} setDrag={setDrag} dragState={{ type: "pricing-section", sectionIndex }} onDrop={() => drag?.type === "pricing-section" && setSections(moveItem(sections, drag.sectionIndex, sectionIndex))} className="bg-slate-50">
              <div className="flex items-start gap-3">
                <Grip />
                <div className="flex-1 space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <TextField label="Název kategorie" value={section.title} onChange={(title) => patchSection(sectionIndex, { ...section, title })} compact />
                    <TextField label="Popis kategorie" value={section.description} onChange={(description) => patchSection(sectionIndex, { ...section, description })} compact />
                  </div>
                  <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                    <RepeatableHeader small title="Položky" onAdd={() => patchSection(sectionIndex, { ...section, items: [...section.items, newPricingItem()] })} addLabel="Přidat položku" />
                    <div className="mt-3 space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <PricingItemEditor
                          key={`${item.service}-${itemIndex}`}
                          item={item}
                          drag={drag}
                          setDrag={setDrag}
                          sectionIndex={sectionIndex}
                          itemIndex={itemIndex}
                          sectionItems={section.items}
                          onDropItem={() => drag?.type === "pricing-item" && drag.sectionIndex === sectionIndex && patchSection(sectionIndex, { ...section, items: moveItem(section.items, drag.itemIndex, itemIndex) })}
                          onChange={(next) => patchItem(sectionIndex, itemIndex, next)}
                          onMoveUp={() => patchSection(sectionIndex, { ...section, items: moveItem(section.items, itemIndex, itemIndex - 1) })}
                          onMoveDown={() => patchSection(sectionIndex, { ...section, items: moveItem(section.items, itemIndex, itemIndex + 1) })}
                          onDelete={() => patchSection(sectionIndex, { ...section, items: removeAt(section.items, itemIndex) })}
                        />
                      ))}
                      {section.items.length === 0 && <EmptyState text="Kategorie zatím nemá žádné položky." />}
                    </div>
                  </div>
                </div>
                <RowActions onUp={() => setSections(moveItem(sections, sectionIndex, sectionIndex - 1))} onDown={() => setSections(moveItem(sections, sectionIndex, sectionIndex + 1))} onDelete={() => setSections(removeAt(sections, sectionIndex))} />
              </div>
            </DraggableRow>
          ))}
          {sections.length === 0 && <EmptyState text="Ceník zatím nemá žádné kategorie." />}
        </div>
      </Panel>
    </div>
  );
}

function PricingItemEditor({ item, drag, setDrag, sectionIndex, itemIndex, onDropItem, onChange, onMoveUp, onMoveDown, onDelete }: {
  item: PricingItem;
  sectionItems: PricingItem[];
  drag: DragState | null;
  setDrag: (drag: DragState | null) => void;
  sectionIndex: number;
  itemIndex: number;
  onDropItem: () => void;
  onChange: (item: PricingItem) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) {
  const children = item.children ?? [];
  const [showNote, setShowNote] = useState(Boolean(item.note));
  const setChildren = (next: PricingItem[]) => onChange({ ...item, children: next });
  const hasNote = Boolean(item.note?.trim());

  return (
    <DraggableRow drag={drag} setDrag={setDrag} dragState={{ type: "pricing-item", sectionIndex, itemIndex }} onDrop={onDropItem} vertical className="bg-white p-2">
      <div className="flex items-start gap-2">
        <Grip tight />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="grid gap-2 md:grid-cols-[1fr_160px]">
            <CompactInput label="Položka" value={item.service} onChange={(service) => onChange({ ...item, service })} />
            <CompactInput label="Cena" value={item.price} onChange={(price) => onChange({ ...item, price })} />
          </div>
          {(showNote || hasNote) && (
            <CompactInput
              label="Volitelný popis / poznámka"
              value={item.note ?? ""}
              onChange={(note) => {
                onChange({ ...item, note });
                if (!note.trim()) setShowNote(false);
              }}
            />
          )}
          {children.length > 0 && (
            <div className="space-y-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-2">
              {children.map((child, childIndex) => (
                <PricingChildEditor
                  key={`${child.service}-${childIndex}`}
                  child={child}
                  drag={drag}
                  setDrag={setDrag}
                  sectionIndex={sectionIndex}
                  itemIndex={itemIndex}
                  childIndex={childIndex}
                  childrenItems={children}
                  setChildren={setChildren}
                />
              ))}
            </div>
          )}
        </div>
        <PricingItemMenu
          onAddNote={() => setShowNote(true)}
          onAddChild={() => setChildren([...children, newPricingItem("Nová varianta")])}
        />
        <RowActions onUp={onMoveUp} onDown={onMoveDown} onDelete={onDelete} compact />
      </div>
    </DraggableRow>
  );
}

function PricingChildEditor({ child, drag, setDrag, sectionIndex, itemIndex, childIndex, childrenItems, setChildren }: {
  child: PricingItem;
  drag: DragState | null;
  setDrag: (drag: DragState | null) => void;
  sectionIndex: number;
  itemIndex: number;
  childIndex: number;
  childrenItems: PricingItem[];
  setChildren: (children: PricingItem[]) => void;
}) {
  const [showNote, setShowNote] = useState(Boolean(child.note));
  const hasNote = Boolean(child.note?.trim());

  return (
    <DraggableRow drag={drag} setDrag={setDrag} dragState={{ type: "pricing-child", sectionIndex, itemIndex, childIndex }} onDrop={() => drag?.type === "pricing-child" && drag.sectionIndex === sectionIndex && drag.itemIndex === itemIndex && setChildren(moveItem(childrenItems, drag.childIndex, childIndex))} className="bg-white p-2">
      <Grip small tight />
      <div className="grid min-w-0 flex-1 gap-2 md:grid-cols-[1fr_140px]">
        <CompactInput label="Pod-položka" value={child.service} onChange={(service) => setChildren(replaceAt(childrenItems, childIndex, { ...child, service }))} />
        <CompactInput label="Cena" value={child.price} onChange={(price) => setChildren(replaceAt(childrenItems, childIndex, { ...child, price }))} />
        {(showNote || hasNote) && (
          <div className="md:col-span-2">
            <CompactInput
              label="Volitelný popis / poznámka"
              value={child.note ?? ""}
              onChange={(note) => {
                setChildren(replaceAt(childrenItems, childIndex, { ...child, note }));
                if (!note.trim()) setShowNote(false);
              }}
            />
          </div>
        )}
      </div>
      <PricingItemMenu onAddNote={() => setShowNote(true)} onAddChild={null} />
      <RowActions onUp={() => setChildren(moveItem(childrenItems, childIndex, childIndex - 1))} onDown={() => setChildren(moveItem(childrenItems, childIndex, childIndex + 1))} onDelete={() => setChildren(removeAt(childrenItems, childIndex))} compact />
    </DraggableRow>
  );
}

function AboutEditor({ content, update }: Pick<EditorProps, "content" | "update">) {
  return (
    <div className="space-y-6">
      <SectionTitle title="O nás" description="Textová sekce a patička webu." />
      <Panel title="O nás" description="Text na homepage.">
        <TextField label="Nadpis" value={content.about.title} onChange={(title) => update("about", { ...content.about, title })} />
        <TextArea label="Obsah" rows={10} value={content.about.content} onChange={(body) => update("about", { ...content.about, content: body })} />
      </Panel>
      <Panel title="Patička" description="Krátký slogan ve spodní části webu.">
        <TextField label="Slogan" value={content.footer.tagline} onChange={(tagline) => update("footer", { ...content.footer, tagline })} />
      </Panel>
    </div>
  );
}

function ContactEditor({ content, update, drag, setDrag }: EditorProps) {
  const contacts = content.contact.items;
  const setContact = (contact: SiteContent["contact"]) => update("contact", contact);
  const setItems = (items: ContactItem[]) => setContact({ ...content.contact, items });

  return (
    <div className="space-y-6">
      <SectionTitle title="Kontakt" description="Kontaktní sekce, karty a mapa." />
      <Panel title="Hlavička a mapa" description="Nadpis sekce a embed URL Google mapy.">
        <TextField label="Nadpis" value={content.contact.title} onChange={(title) => setContact({ ...content.contact, title })} />
        <TextField label="URL mapy" value={content.contact.mapEmbedUrl} onChange={(mapEmbedUrl) => setContact({ ...content.contact, mapEmbedUrl })} />
      </Panel>
      <Panel title="Kontaktní karty" description="Adresa, telefon, e-mail a otevírací doba.">
        <RepeatableHeader onAdd={() => setItems([...contacts, { label: "Nový kontakt", value: "", icon: "Mail", href: "" }])} addLabel="Přidat kontakt" />
        <div className="space-y-3">
          {contacts.map((item, index) => (
            <DraggableRow key={`${item.label}-${index}`} drag={drag} setDrag={setDrag} dragState={{ type: "simple", list: "contact", index }} onDrop={() => drag?.type === "simple" && drag.list === "contact" && setItems(moveItem(contacts, drag.index, index))}>
              <Grip />
              <div className="grid flex-1 gap-3 md:grid-cols-2">
                <TextField label="Popisek" value={item.label} onChange={(label) => setItems(replaceAt(contacts, index, { ...item, label }))} compact />
                <SelectField label="Ikona" value={item.icon} options={["MapPin", "Mail", "Phone", "Clock"]} onChange={(icon) => setItems(replaceAt(contacts, index, { ...item, icon: icon as ContactItem["icon"] }))} />
                <TextField label="Hodnota" value={item.value} onChange={(value) => setItems(replaceAt(contacts, index, { ...item, value }))} compact />
                <TextField label="Odkaz (volitelné)" value={item.href ?? ""} onChange={(href) => setItems(replaceAt(contacts, index, { ...item, href }))} compact />
              </div>
              <RowActions onUp={() => setItems(moveItem(contacts, index, index - 1))} onDown={() => setItems(moveItem(contacts, index, index + 1))} onDelete={() => setItems(removeAt(contacts, index))} />
            </DraggableRow>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function LinksEditor({ content, update, drag, setDrag }: EditorProps) {
  const links = content.usefulLinks;
  const setLinks = (next: UsefulLink[]) => update("usefulLinks", next);

  return (
    <div className="space-y-6">
      <SectionTitle title="Užitečné odkazy" description="Odkazy pro klienty ve webu." />
      <Panel title="Seznam odkazů" description="Přidejte, upravte a přeuspořádejte odkazy.">
        <RepeatableHeader onAdd={() => setLinks([...links, { title: "Nový odkaz", description: "", href: "https://" }])} addLabel="Přidat odkaz" />
        <div className="space-y-3">
          {links.map((link, index) => (
            <DraggableRow key={`${link.title}-${index}`} drag={drag} setDrag={setDrag} dragState={{ type: "simple", list: "links", index }} onDrop={() => drag?.type === "simple" && drag.list === "links" && setLinks(moveItem(links, drag.index, index))}>
              <Grip />
              <div className="grid flex-1 gap-3 md:grid-cols-2">
                <TextField label="Název" value={link.title} onChange={(title) => setLinks(replaceAt(links, index, { ...link, title }))} compact />
                <TextField label="URL" value={link.href} onChange={(href) => setLinks(replaceAt(links, index, { ...link, href }))} compact />
                <div className="md:col-span-2">
                  <TextField label="Popis" value={link.description} onChange={(description) => setLinks(replaceAt(links, index, { ...link, description }))} compact />
                </div>
              </div>
              <RowActions onUp={() => setLinks(moveItem(links, index, index - 1))} onDown={() => setLinks(moveItem(links, index, index + 1))} onDelete={() => setLinks(removeAt(links, index))} />
            </DraggableRow>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function OtherEditor({ content, update }: Pick<EditorProps, "content" | "update">) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Bannery a další obsah" description="Babybox, náhradní plnění a náborový banner." />
      <Panel title="Babybox banner" description="Zapnutí banneru a obrázek.">
        <Toggle label="Zobrazit banner" checked={content.supportBanner.enabled} onChange={(enabled) => update("supportBanner", { ...content.supportBanner, enabled })} />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Nadpis" value={content.supportBanner.title} onChange={(title) => update("supportBanner", { ...content.supportBanner, title })} />
          <TextField label="Alt text" value={content.supportBanner.imageAlt} onChange={(imageAlt) => update("supportBanner", { ...content.supportBanner, imageAlt })} />
        </div>
        <TextField label="URL obrázku" value={content.supportBanner.imageUrl} onChange={(imageUrl) => update("supportBanner", { ...content.supportBanner, imageUrl })} />
      </Panel>

      <Panel title="Náhradní plnění" description="Texty a odkazy v samostatném bloku.">
        <TextField label="Nadpis" value={content.replacementFulfillment.title} onChange={(title) => update("replacementFulfillment", { ...content.replacementFulfillment, title })} />
        <ListEditor title="Odstavce" items={content.replacementFulfillment.paragraphs} onChange={(paragraphs) => update("replacementFulfillment", { ...content.replacementFulfillment, paragraphs })} placeholder="Nový odstavec" multiline />
        <TextField label="Nadpis odkazů" value={content.replacementFulfillment.linksTitle} onChange={(linksTitle) => update("replacementFulfillment", { ...content.replacementFulfillment, linksTitle })} />
        <UsefulLinksInline links={content.replacementFulfillment.links} onChange={(links) => update("replacementFulfillment", { ...content.replacementFulfillment, links })} />
        <TextArea label="Závěrečný text" value={content.replacementFulfillment.closingText} onChange={(closingText) => update("replacementFulfillment", { ...content.replacementFulfillment, closingText })} rows={3} />
      </Panel>

      <Panel title="Náborový banner" description="Krátká výzva pro zájemce o práci/praxi.">
        <Toggle label="Zobrazit náborový banner" checked={content.hiring.enabled} onChange={(enabled) => update("hiring", { ...content.hiring, enabled })} />
        <TextField label="Nadpis" value={content.hiring.title} onChange={(title) => update("hiring", { ...content.hiring, title })} />
        <TextArea label="Popis" value={content.hiring.description} onChange={(description) => update("hiring", { ...content.hiring, description })} rows={3} />
        <TextField label="Text tlačítka" value={content.hiring.buttonText} onChange={(buttonText) => update("hiring", { ...content.hiring, buttonText })} />
      </Panel>
    </div>
  );
}

function UsefulLinksInline({ links, onChange }: { links: UsefulLink[]; onChange: (links: UsefulLink[]) => void }) {
  return (
    <div className="space-y-3">
      <RepeatableHeader small title="Odkazy" onAdd={() => onChange([...links, { title: "Nový odkaz", description: "", href: "https://" }])} addLabel="Přidat odkaz" />
      {links.map((link, index) => (
        <div key={`${link.title}-${index}`} className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
          <div className="grid gap-3 md:grid-cols-2">
            <TextField label="Název" value={link.title} onChange={(title) => onChange(replaceAt(links, index, { ...link, title }))} compact />
            <TextField label="URL" value={link.href} onChange={(href) => onChange(replaceAt(links, index, { ...link, href }))} compact />
            <div className="md:col-span-2"><TextField label="Popis" value={link.description} onChange={(description) => onChange(replaceAt(links, index, { ...link, description }))} compact /></div>
          </div>
          <div className="mt-3 flex justify-end"><button className="btn-danger-sm" onClick={() => onChange(removeAt(links, index))}><Trash2 className="h-4 w-4" /></button></div>
        </div>
      ))}
    </div>
  );
}

type EditorProps = {
  content: SiteContent;
  update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  drag: DragState | null;
  setDrag: (drag: DragState | null) => void;
};

function Panel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4">
        <h3 className="text-xl font-black text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-3xl font-black text-slate-950">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function RepeatableHeader({ title, addLabel, onAdd, small = false }: { title?: string; addLabel: string; onAdd: () => void; small?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      {title && <h4 className={`${small ? "text-sm" : "text-base"} font-black text-slate-700`}>{title}</h4>}
      <button type="button" onClick={onAdd} className="btn-secondary-sm flex items-center gap-2 px-3 text-sm font-bold text-[#5865F2]"><Plus className="h-4 w-4" /> {addLabel}</button>
    </div>
  );
}

function DraggableRow({ children, dragState, drag, setDrag, onDrop, vertical = false, className = "" }: { children: React.ReactNode; dragState: DragState; drag: DragState | null; setDrag: (drag: DragState | null) => void; onDrop: () => void; vertical?: boolean; className?: string }) {
  return (
    <div
      draggable
      onDragStart={() => setDrag(dragState)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
        setDrag(null);
      }}
      onDragEnd={() => setDrag(null)}
      className={`rounded-2xl p-3 ring-1 ring-slate-200 transition ${vertical ? "block" : "flex items-start gap-3"} ${drag ? "ring-[#5865F2]/30" : ""} ${className || "bg-white"}`}
    >
      {children}
    </div>
  );
}

function Grip({ small = false, tight = false }: { small?: boolean; tight?: boolean }) {
  return <GripVertical className={`${small ? "h-4 w-4" : "h-5 w-5"} ${tight ? "mt-2" : "mt-8"} shrink-0 cursor-grab text-slate-300 active:cursor-grabbing`} />;
}

function PricingItemMenu({ onAddNote, onAddChild }: { onAddNote: () => void; onAddChild: (() => void) | null }) {
  return (
    <details className="group relative shrink-0">
      <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200 [&::-webkit-details-marker]:hidden">
        <MoreHorizontal className="h-4 w-4" />
      </summary>
      <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl bg-white p-1 shadow-xl ring-1 ring-slate-200">
        <button type="button" onClick={onAddNote} className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">Přidat popis</button>
        {onAddChild && <button type="button" onClick={onAddChild} className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">Přidat pod-položku</button>}
      </div>
    </details>
  );
}

function RowActions({ onUp, onDown, onDelete, compact = false }: { onUp: () => void; onDown: () => void; onDelete: () => void; compact?: boolean }) {
  return (
    <div className="flex shrink-0 flex-col gap-1">
      <button type="button" onClick={onUp} className={`btn-secondary-sm text-xs font-black ${compact ? "px-2 py-1" : "px-3"}`}>↑</button>
      <button type="button" onClick={onDown} className={`btn-secondary-sm text-xs font-black ${compact ? "px-2 py-1" : "px-3"}`}>↓</button>
      <button type="button" onClick={onDelete} className={`btn-danger-sm ${compact ? "p-1.5" : ""}`}><Trash2 className="h-4 w-4" /></button>
    </div>
  );
}

function CompactInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <input aria-label={label} placeholder={label} className="input h-10 px-3 py-2 text-sm" value={value} onChange={(event) => onChange(event.target.value)} />;
}

function TextField({ label, value, onChange, compact = false }: { label: string; value: string; onChange: (value: string) => void; compact?: boolean }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input className={`input ${compact ? "py-2" : ""}`} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <textarea className="input" rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <select className="input py-2" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <span className="font-bold text-slate-700">{label}</span>
      <input type="checkbox" className="h-5 w-5 accent-[#5865F2]" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}

function ListEditor({ title, items, onChange, placeholder, multiline = false }: { title: string; items: string[]; onChange: (items: string[]) => void; placeholder: string; multiline?: boolean }) {
  return (
    <div className="space-y-3">
      <RepeatableHeader small title={title} onAdd={() => onChange([...items, placeholder])} addLabel="Přidat" />
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex gap-2">
          {multiline ? (
            <textarea className="input min-h-[90px] flex-1" value={item} onChange={(event) => onChange(replaceAt(items, index, event.target.value))} />
          ) : (
            <input className="input flex-1" value={item} onChange={(event) => onChange(replaceAt(items, index, event.target.value))} />
          )}
          <RowActions onUp={() => onChange(moveItem(items, index, index - 1))} onDown={() => onChange(moveItem(items, index, index + 1))} onDelete={() => onChange(removeAt(items, index))} />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm font-semibold text-slate-400">{text}</div>;
}

function replaceAt<T>(items: T[], index: number, value: T) {
  return items.map((item, currentIndex) => (currentIndex === index ? value : item));
}

function removeAt<T>(items: T[], index: number) {
  return items.filter((_, currentIndex) => currentIndex !== index);
}

function moveItem<T>(items: T[], from: number, to: number) {
  if (to < 0 || to >= items.length || from === to) return items;
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function newService(): SiteService {
  return { title: "Nová služba", description: "Krátký popis služby", icon: "Calculator", details: ["Nový detail"] };
}

function newPricingItem(service = "Nová položka"): PricingItem {
  return { service, price: "", note: "" };
}
