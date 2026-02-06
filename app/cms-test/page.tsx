"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SectionRenderer from "@/components/sections/SectionRenderer";
import Link from "next/link";

export default function CMSTestPage() {
  const homepage = useQuery(api.pages.getHomepage);

  if (!homepage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8">
          <h1 className="text-3xl font-bold mb-4">No Homepage Found</h1>
          <p className="text-gray-600 mb-6">
            Run the seed function to create test data:
          </p>
          <code className="bg-gray-100 p-3 rounded block text-sm mb-4">
            npx convex run seed:seedTestData
          </code>
          <Link 
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← Back to original homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-lg font-semibold text-[#5865F2] hover:opacity-80 transition">
              Partex CMS Test
            </Link>
            <div className="flex gap-4">
              <Link 
                href="/"
                className="text-gray-600 hover:text-gray-900"
              >
                Original Site
              </Link>
              <Link 
                href="/admin"
                className="bg-[#5865F2] text-white px-4 py-2 rounded-full hover:bg-[#4752C4] transition"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Render Sections */}
      <div className="sections-container">
        {homepage.sections?.map((section) => (
          <SectionRenderer key={section._id} section={section} />
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-[#2C1E2C] text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">CMS Test Page - {homepage.sections?.length || 0} sections rendered</p>
        </div>
      </footer>
    </main>
  );
}
