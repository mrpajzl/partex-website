"use client";

import Image from "next/image";
import Link from "next/link";

interface HeroImageRightProps {
  content: {
    heading?: string;
    subheading?: string;
    body?: string;
    imageUrl?: string;
    imageAlt?: string;
    ctaText?: string;
    ctaLink?: string;
    ctaStyle?: string;
  };
  style: {
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: string;
    paddingBottom?: string;
  };
}

export default function HeroImageRight({ content, style }: HeroImageRightProps) {
  const bgColor = style.backgroundColor || "#5865F2";
  const textColor = style.textColor || "#FFFFFF";

  return (
    <section 
      className="relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        paddingTop: style.paddingTop || "80px",
        paddingBottom: style.paddingBottom || "80px",
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            {content.subheading && (
              <p className="text-lg opacity-90">{content.subheading}</p>
            )}
            
            {content.heading && (
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {content.heading}
              </h1>
            )}
            
            {content.body && (
              <div 
                className="text-lg opacity-90"
                dangerouslySetInnerHTML={{ __html: content.body }}
              />
            )}
            
            {content.ctaText && content.ctaLink && (
              <div className="pt-4">
                <Link
                  href={content.ctaLink}
                  className={`inline-block px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 ${
                    content.ctaStyle === "primary"
                      ? "bg-[#57F287] text-white hover:bg-[#4ADB7A]"
                      : content.ctaStyle === "secondary"
                      ? "bg-white text-gray-900 hover:bg-gray-100"
                      : "border-2 border-current hover:bg-white hover:text-gray-900"
                  }`}
                >
                  {content.ctaText}
                </Link>
              </div>
            )}
          </div>

          {/* Image */}
          {content.imageUrl && (
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={content.imageUrl}
                alt={content.imageAlt || "Hero image"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C360,32 720,96 1440,64 L1440,120 L0,120 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
