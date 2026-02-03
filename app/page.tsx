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
  const pricing = useQuery(api.content.getPricing);
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
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-primary-600">Partex real s.r.o.</div>
            <div className="hidden md:flex space-x-6">
              <a href="#sluzby" className="text-gray-700 hover:text-primary-600 transition">Služby</a>
              <a href="#o-nas" className="text-gray-700 hover:text-primary-600 transition">O nás</a>
              <a href="#cenik" className="text-gray-700 hover:text-primary-600 transition">Ceník</a>
              <a href="#kontakt" className="text-gray-700 hover:text-primary-600 transition">Kontakt</a>
            </div>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition">
              Kontaktujte nás
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      {hero && (
        <section className="relative bg-gradient-to-br from-primary-500 via-purple-600 to-primary-700 text-white overflow-hidden">
          {/* Wave Background */}
          <div className="absolute inset-0">
            <svg className="absolute bottom-0 w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="white" fillOpacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  {hero.title}
                </h1>
                <p className="text-xl mb-8 text-purple-100">{hero.subtitle}</p>
                {hero.ctaText && (
                  <a 
                    href={hero.ctaLink || "#"}
                    className="inline-block bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                  >
                    {hero.ctaText}
                  </a>
                )}
              </div>
              <div className="relative">
                {/* Illustration placeholder */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 aspect-square flex items-center justify-center">
                  <div className="text-6xl">💼</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services && services.length > 0 && (
        <section id="sluzby" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Co nabízíme?</h2>
            <p className="text-center text-gray-600 mb-12">Naše služby jsou navrženy tak, aby vyhovovaly vašim potřebám</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon ? iconMap[service.icon] : null;
                return (
                  <div key={service._id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                    {Icon && (
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-primary-600" />
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    {service.ctaText && (
                      <a 
                        href={service.ctaLink || "#"}
                        className="inline-block bg-accent-500 text-white px-6 py-2 rounded-full hover:bg-accent-600 transition"
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
      )}

      {/* Newsletter Section */}
      {newsletter && (
        <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">{newsletter.title}</h2>
              {newsletter.description && (
                <p className="mb-8 text-purple-100">{newsletter.description}</p>
              )}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Váš email"
                  className="px-6 py-3 rounded-full text-gray-900 flex-1 max-w-md"
                  required
                  disabled={subscribeStatus === "loading"}
                />
                <button
                  type="submit"
                  className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition disabled:opacity-50"
                  disabled={subscribeStatus === "loading"}
                >
                  {newsletter.ctaText}
                </button>
              </form>
              {subscribeStatus === "success" && (
                <p className="mt-4 text-green-200">Děkujeme za odběr!</p>
              )}
              {subscribeStatus === "error" && (
                <p className="mt-4 text-red-200">Tento email již je zaregistrován</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Service Details Section */}
      {serviceDetails && serviceDetails.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Co je náhradní plnění?</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {serviceDetails.map((detail) => (
                <div key={detail._id} className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{detail.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{detail.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {pricing && pricing.length > 0 && (
        <section id="cenik" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Podívejte se na cenu našich služeb</h2>
            <p className="text-center text-gray-300 mb-12">Transparentní ceník bez skrytých poplatků</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricing.map((pkg) => (
                <div key={pkg._id} className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                    <span className="text-xl ml-2">{pkg.currency}</span>
                    {pkg.unit && <span className="text-gray-600"> / {pkg.unit}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-accent-500 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-primary-600 text-white py-3 rounded-full font-semibold hover:bg-primary-700 transition">
                    Vybrat balíček
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {about && (
        <section id="o-nas" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">{about.title}</h2>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {about.content}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contact && contact.length > 0 && (
        <section id="kontakt" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Kontakty</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {contact.map((item) => {
                const Icon = item.icon ? iconMap[item.icon] : null;
                return (
                  <div key={item._id} className="bg-white rounded-xl p-6 text-center shadow-lg">
                    {Icon && (
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                    )}
                    <h3 className="font-bold mb-2">{item.label}</h3>
                    <p className="text-gray-600 whitespace-pre-line text-sm">{item.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <p className="text-gray-600">Mapa zde</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-primary-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Partex Real s.r.o.</h3>
              <p className="text-gray-300">Profesionální účetní a daňové služby</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Rychlé odkazy</h3>
              <ul className="space-y-2">
                <li><a href="#sluzby" className="text-gray-300 hover:text-white transition">Služby</a></li>
                <li><a href="#o-nas" className="text-gray-300 hover:text-white transition">O nás</a></li>
                <li><a href="#cenik" className="text-gray-300 hover:text-white transition">Ceník</a></li>
                <li><a href="#kontakt" className="text-gray-300 hover:text-white transition">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Kontakt</h3>
              <p className="text-gray-300">info@partex.cz</p>
              <p className="text-gray-300">+420 123 456 789</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Partex Real s.r.o. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
