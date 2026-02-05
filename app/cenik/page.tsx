"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function CenikPage() {
  const pricing = useQuery(api.content.getPricing);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#5865F2] text-white">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-lg font-semibold hover:opacity-80 transition">
              Partex real s.r.o.
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/#sluzby" className="hover:opacity-80 transition">Služby</Link>
              <Link href="/#o-nas" className="hover:opacity-80 transition">O nás</Link>
              <Link href="/cenik" className="hover:opacity-80 transition font-semibold">Ceník</Link>
              <Link href="/#kontakt" className="hover:opacity-80 transition">Kontakt</Link>
            </div>
            <Link 
              href="/#kontakt" 
              className="bg-[#57F287] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#4ADB7A] transition-all hover:scale-105"
            >
              Kontaktujte nás
            </Link>
          </div>
        </nav>
      </header>

      {/* Page Header */}
      <section className="bg-[#5865F2] text-white py-16 md:py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ceník služeb</h1>
          <p className="text-xl opacity-90">Transparentní ceník bez skrytých poplatků</p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {pricing && pricing.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#5865F2] text-white">
                      <th className="px-6 py-4 text-left font-bold text-lg">Služba</th>
                      <th className="px-6 py-4 text-left font-bold text-lg">Cena</th>
                      <th className="px-6 py-4 text-left font-bold text-lg">Platnost</th>
                      <th className="px-6 py-4 text-left font-bold text-lg">Co je zahrnuto</th>
                      <th className="px-6 py-4 text-center font-bold text-lg">Akce</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricing.map((pkg, index) => (
                      <tr 
                        key={pkg._id} 
                        className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-6 py-6">
                          <div className="font-bold text-lg text-gray-900">{pkg.name}</div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="text-2xl font-bold text-[#5865F2]">
                            {pkg.price} {pkg.currency}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="text-gray-700">
                            {pkg.unit ? `za ${pkg.unit}` : 'Jednorázově'}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <ul className="space-y-2">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#57F287] mt-1 flex-shrink-0">✓</span>
                                <span className="text-gray-700 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-6 py-6 text-center">
                          <Link
                            href="/#kontakt"
                            className="inline-block bg-[#5865F2] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#4752C4] transition-all hover:scale-105"
                          >
                            Objednat
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-6">
                {pricing.map((pkg) => (
                  <div key={pkg._id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-[#5865F2] mb-1">
                        {pkg.price} {pkg.currency}
                      </div>
                      <div className="text-gray-600">
                        {pkg.unit ? `za ${pkg.unit}` : 'Jednorázově'}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Co je zahrnuto:</h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#57F287] mt-1 flex-shrink-0">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/#kontakt"
                      className="block w-full text-center bg-[#5865F2] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4752C4] transition-all"
                    >
                      Objednat
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Načítám ceník...</p>
            </div>
          )}
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Často kladené otázky</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Jak probíhá objednávka?</h3>
                <p className="text-gray-700">Kontaktujte nás přes formulář nebo telefon a domluvíme si schůzku, kde probereme vaše potřeby a navrhnem optimální řešení.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Je možné kombinovat služby?</h3>
                <p className="text-gray-700">Ano, nabízíme individuální balíčky služeb přizpůsobené vašim potřebám. Cena se určí na základě rozsahu služeb.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Poskytujete slevy pro dlouhodobou spolupráci?</h3>
                <p className="text-gray-700">Ano, při roční předplatném nabízíme speciální ceny. Kontaktujte nás pro cenovou nabídku.</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/#kontakt"
                className="inline-block bg-[#5865F2] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#4752C4] transition-all hover:scale-105"
              >
                Kontaktujte nás pro cenovou nabídku
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C1E2C] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Partex Real s.r.o.</h3>
              <p className="text-gray-300 leading-relaxed">Profesionální účetní a daňové služby pro vaši firmu</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Rychlé odkazy</h3>
              <ul className="space-y-3">
                <li><Link href="/#sluzby" className="text-gray-300 hover:text-white transition">Služby</Link></li>
                <li><Link href="/#o-nas" className="text-gray-300 hover:text-white transition">O nás</Link></li>
                <li><Link href="/cenik" className="text-gray-300 hover:text-white transition">Ceník</Link></li>
                <li><Link href="/#kontakt" className="text-gray-300 hover:text-white transition">Kontakt</Link></li>
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
