"use client";

import Image from "next/image";

interface TextImageProps {
  content?: {
    heading?: string;
    body?: string;
    imageUrl?: string;
    imageAlt?: string;
    imagePosition?: "left" | "right";
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

export default function TextImage({ content = {}, style = {} }: TextImageProps) {
  const bgColor = style.backgroundColor || "#FFFFFF";
  const textColor = style.textColor || "#2C3E50";
  const imageFirst = content.imagePosition === "left";
  const imageAlt = content.imageAlt || content.heading || "Doprovodný obrázek";

  return (
    <section
      style={{
        backgroundColor: bgColor,
        color: textColor,
        paddingTop: style.paddingTop || "60px",
        paddingBottom: style.paddingBottom || "60px",
      }}
    >
      <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14">
        <div className={imageFirst ? "md:order-2" : undefined}>
          {content.heading && (
            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              {content.heading}
            </h2>
          )}

          {content.body && (
            <div
              className="prose prose-lg max-w-none leading-8"
              dangerouslySetInnerHTML={{ __html: content.body }}
              style={{ color: textColor }}
            />
          )}
        </div>

        {content.imageUrl && (
          <div className={imageFirst ? "md:order-1" : undefined}>
            <div className="relative min-h-72 overflow-hidden rounded-3xl bg-slate-100 shadow-xl md:min-h-[420px]">
              {isLocalImage(content.imageUrl) ? (
                <Image
                  src={content.imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.imageUrl}
                  alt={imageAlt}
                  className="h-full min-h-72 w-full object-cover md:min-h-[420px]"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
