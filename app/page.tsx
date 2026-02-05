"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Mail, Phone, MapPin, Clock, Users, Calculator, Clipboard } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const hero = useQuery(api.content.getHero);
  const services = useQuery(api.content.getServices);
  const newsletter = useQuery(api.content.getNewsletter);
  const serviceDetails = useQuery(api.content.getServiceDetails);
  // Pricing removed - now on separate /cenik page
  const about = useQuery(api.content.getAbout);
  const contact = useQuery(api.content.getContact);

  const subscribe = useMutation(api.content.subscribe);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("loading");
    try {
      await subscribe({ email });
      setSubscribeStatus("success");
      setEmail("");
    } catch (error) {
      setSubscribeStatus("error");
    }
  };

  const iconMap: Record<string, any> = {
    users: Users,
    calculator: Calculator,
    clipboard: Clipboard,
    "map-pin": MapPin,
    mail: Mail,
    phone: Phone,
    clock: Clock,
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-white">Partex real s.r.o.</div>
            <div className="hidden md:flex space-x-8 text-white">
              <a href="#sluzby" className="hover:opacity-80 transition">Služby</a>
              <a href="#o-nas" className="hover:opacity-80 transition">O nás</a>
              <a href="/cenik" className="hover:opacity-80 transition">Ceník</a>
              <a href="#kontakt" className="hover:opacity-80 transition">Kontakt</a>
            </div>
            <a 
              href="#kontakt" 
              className="bg-[#57F287] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#4ADB7A] transition-all hover:scale-105"
            >
              Kontaktujte nás
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section with Diagonal Bottom */}
      <section className="relative bg-[#5865F2] text-white pb-20">
        <div className="container mx-auto px-6 pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {hero?.title || "Vaše cesta k úspěchu je i naše práce"}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">{hero?.subtitle || "Pomůžeme vám dosáhnout vašich cílů"}</p>
              <a 
                href={hero?.ctaLink || "#"}
                className="inline-block bg-white text-[#5865F2] px-8 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                {hero?.ctaText || "Zjistit více"}
              </a>
            </div>
            <div className="relative hidden md:flex justify-center items-center">
              <div className="w-full max-w-md aspect-square bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="text-8xl">💼</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Diagonal separator - overlapping the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white transform origin-bottom-left -skew-y-2"></div>
      </section>

      {/* Services Section */}
      <section id="sluzby" className="relative py-20 md:py-28 bg-white -mt-1">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Co nabízíme?</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Naše služby jsou navrženy tak, aby vyhovovaly vaším potřebám</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services?.map((service, index) => {
              const Icon = service.icon ? iconMap[service.icon] : Users;
              return (
                <div 
                  key={service._id} 
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="w-16 h-16 bg-[#5865F2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#5865F2]/20 transition">
                    <Icon className="w-8 h-8 text-[#5865F2]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  {service.ctaText && (
                    <a 
                      href={service.ctaLink || "#"}
                      className="inline-block bg-[#57F287] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#4ADB7A] transition-all hover:scale-105"
                    >
                      {service.ctaText}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section with Diagonal Separators */}
      <section className="relative bg-[#5865F2] text-white py-20 md:py-28">
        {/* Top diagonal separator */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-[#5865F2] transform origin-top-right -skew-y-2 -mt-16"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{newsletter?.title || "Přispívejme na babybox"}</h2>
            {newsletter?.description && (
              <p className="mb-10 text-lg opacity-90">{newsletter.description}</p>
            )}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Váš email"
                className="px-6 py-3.5 rounded-full text-gray-900 flex-1 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
                disabled={subscribeStatus === "loading"}
              />
              <button
                type="submit"
                className="bg-white text-[#5865F2] px-8 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 disabled:opacity-50 whitespace-nowrap"
                disabled={subscribeStatus === "loading"}
              >
                {newsletter?.ctaText || "Sofia"}
              </button>
            </form>
            {subscribeStatus === "success" && (
              <p className="mt-6 text-green-200 font-medium">✓ Děkujeme za odběr!</p>
            )}
            {subscribeStatus === "error" && (
              <p className="mt-6 text-red-200 font-medium">✗ Tento email již je zaregistrován</p>
            )}
          </div>
        </div>

        {/* Bottom diagonal separator */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white transform origin-bottom-left -skew-y-2"></div>
      </section>

      {/* Service Details */}
      {serviceDetails && serviceDetails.length > 0 && (
        <section className="relative py-20 md:py-28 bg-white -mt-1">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Co je náhradní plnění?</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {serviceDetails.map((detail) => (
                <div key={detail._id} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{detail.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{detail.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {about && (
        <section id="o-nas" className="relative py-20 md:py-28 bg-gray-50 -mt-1">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">{about.title}</h2>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {about.content}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Job Posting Section */}
      <section className="relative bg-[#5865F2] text-white py-20 md:py-28">
        {/* Top diagonal */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-[#5865F2] transform origin-top-right -skew-y-2 -mt-16"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Hledáme pozici do našich řad</h2>
            <p className="text-lg opacity-90 mb-8">Máme otevřenou pozici pro účetního/mzdového specialistu</p>
            <a 
              href="#kontakt"
              className="inline-block bg-white text-[#5865F2] px-8 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105"
            >
              Kontaktujte nás
            </a>
          </div>
        </div>

        {/* Bottom diagonal to footer */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#2C1E2C] transform origin-bottom-left -skew-y-2"></div>
      </section>

      {/* Contact Section */}
      {contact && contact.length > 0 && (
        <section id="kontakt" className="relative py-20 md:py-28 bg-white -mt-1">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Kontakty</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto">
              {contact.map((item) => {
                const Icon = item.icon ? iconMap[item.icon] : Mail;
                return (
                  <div key={item._id} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-[#5865F2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#5865F2]" />
                    </div>
                    <h3 className="font-bold mb-3 text-gray-900">{item.label}</h3>
                    <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">{item.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gray-100 rounded-3xl h-96 flex items-center justify-center shadow-lg overflow-hidden">
              <p className="text-gray-500 text-lg">Google Map zde</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#2C1E2C] text-white py-16 -mt-1">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Partex Real s.r.o.</h3>
              <p className="text-gray-300 leading-relaxed">Profesionální účetní a daňové služby pro vaši firmu</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Rychlé odkazy</h3>
              <ul className="space-y-3">
                <li><a href="#sluzby" className="text-gray-300 hover:text-white transition">Služby</a></li>
                <li><a href="#o-nas" className="text-gray-300 hover:text-white transition">O nás</a></li>
                <li><a href="#cenik" className="text-gray-300 hover:text-white transition">Ceník</a></li>
                <li><a href="#kontakt" className="text-gray-300 hover:text-white transition">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Kontakt</h3>
              <p className="text-gray-300 mb-2">info@partex.cz</p>
              <p className="text-gray-300">+420 123 456 789</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Partex Real s.r.o. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
