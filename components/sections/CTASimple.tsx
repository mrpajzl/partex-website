"use client";

import Link from "next/link";

interface CTASimpleProps {
  content: {
    heading?: string;
    subheading?: string;
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

export default function CTASimple({ content, style }: CTASimpleProps) {
  const bgColor = style.backgroundColor || "#5865F2";
  const textColor = style.textColor || "#FFFFFF";

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        paddingTop: style.paddingTop || "60px",
        paddingBottom: style.paddingBottom || "60px",
      }}
    >
      <div className="container mx-auto px-4 max-w-4xl text-center">
        {content.heading && (
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {content.heading}
          </h2>
        )}

        {content.subheading && (
          <p className="text-xl opacity-90 mb-8">
            {content.subheading}
          </p>
        )}

        {content.ctaText && content.ctaLink && (
          <Link
            href={content.ctaLink}
            className={`inline-block px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 ${
              content.ctaStyle === "primary"
                ? "bg-[#57F287] text-white hover:bg-[#4ADB7A]"
                : content.ctaStyle === "secondary"
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "border-2 border-current hover:bg-white hover:text-gray-900"
            }`}
          >
            {content.ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
