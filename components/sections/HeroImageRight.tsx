"use client";

import Image from "next/image";
import Link from "next/link";

interface HeroImageRightProps {
  content?: {
    heading?: string;
    subheading?: string;
    body?: string;
    imageUrl?: string;
    imageAlt?: string;
    ctaText?: string;
    ctaLink?: string;
    ctaStyle?: string;
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: string;
    paddingBottom?: string;
  };
}

function isLocalImage(src: string) {
  return src.startsWith("/") && !src.startsWith("//");
}

function getButtonClasses(style?: string) {
  if (style === "primary") {
    return "bg-[#57F287] text-[#17351f] hover:bg-[#4ADB7A]";
  }

  if (style === "secondary") {
    return "bg-white text-gray-900 hover:bg-gray-100";
  }

  return "border-2 border-current hover:bg-white hover:text-gray-900";
}

export default function HeroImageRight({ content = {}, style = {} }: HeroImageRightProps) {
  const bgColor = style.backgroundColor || "#5865F2";
  const textColor = style.textColor || "#FFFFFF";
  const imageAlt = content.imageAlt || content.heading || "Hero obrázek";

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
                  className={`inline-block px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 ${getButtonClasses(content.ctaStyle)}`}
                >
                  {content.ctaText}
                </Link>
              </div>
            )}
          </div>

          {/* Image */}
          {content.imageUrl && (
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white/10">
              {isLocalImage(content.imageUrl) ? (
                <Image
                  src={content.imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.imageUrl}
                  alt={imageAlt}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              )}
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
          aria-hidden="true"
          focusable="false"
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
