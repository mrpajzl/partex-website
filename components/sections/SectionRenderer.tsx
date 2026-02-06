"use client";

import { lazy, Suspense } from "react";

// Lazy load section components
const HeroImageRight = lazy(() => import("./HeroImageRight"));
const HeroImageLeft = lazy(() => import("./HeroImageLeft"));
const HeroCentered = lazy(() => import("./HeroCentered"));
const TextBlock = lazy(() => import("./TextBlock"));
const TextImage = lazy(() => import("./TextImage"));
const FeatureGrid3 = lazy(() => import("./FeatureGrid3"));
const FeatureGrid2 = lazy(() => import("./FeatureGrid2"));
const CTASimple = lazy(() => import("./CTASimple"));
const Newsletter = lazy(() => import("./Newsletter"));

// Map section types to components
const sectionComponents: Record<string, React.ComponentType<any>> = {
  "hero-image-right": HeroImageRight,
  "hero-image-left": HeroImageLeft,
  "hero-centered": HeroCentered,
  "text-block": TextBlock,
  "text-image": TextImage,
  "feature-grid-3": FeatureGrid3,
  "feature-grid-2": FeatureGrid2,
  "cta-simple": CTASimple,
  "newsletter": Newsletter,
};

interface SectionRendererProps {
  section: {
    _id: string;
    type: string;
    name: string;
    content: any;
    style: any;
    isActive: boolean;
  };
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  if (!section.isActive) return null;

  const Component = sectionComponents[section.type];

  if (!Component) {
    console.warn(`Unknown section type: ${section.type}`);
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded">
        <p className="text-red-600">Unknown section type: {section.type}</p>
      </div>
    );
  }

  return (
    <Suspense 
      fallback={
        <div className="h-64 bg-gray-100 animate-pulse flex items-center justify-center">
          <p className="text-gray-400">Loading section...</p>
        </div>
      }
    >
      <Component content={section.content} style={section.style} />
    </Suspense>
  );
}
