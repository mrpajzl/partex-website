"use client";

interface TextBlockProps {
  content: {
    heading?: string;
    body?: string;
  };
  style: {
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: string;
    paddingBottom?: string;
  };
}

export default function TextBlock({ content, style }: TextBlockProps) {
  const bgColor = style.backgroundColor || "#F8F9FA";
  const textColor = style.textColor || "#2C3E50";

  return (
    <section
      style={{
        backgroundColor: bgColor,
        color: textColor,
        paddingTop: style.paddingTop || "60px",
        paddingBottom: style.paddingBottom || "60px",
      }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {content.heading && (
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {content.heading}
          </h2>
        )}

        {content.body && (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content.body }}
            style={{
              color: textColor,
            }}
          />
        )}
      </div>
    </section>
  );
}
