"use client";

import * as Icons from "lucide-react";

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface FeatureGrid3Props {
  content: {
    heading?: string;
    subheading?: string;
    columns?: number;
    items?: Feature[];
  };
  style: {
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: string;
    paddingBottom?: string;
  };
}

export default function FeatureGrid3({ content, style }: FeatureGrid3Props) {
  const bgColor = style.backgroundColor || "#FFFFFF";
  const textColor = style.textColor || "#2C3E50";

  return (
    <section
      style={{
        backgroundColor: bgColor,
        color: textColor,
        paddingTop: style.paddingTop || "80px",
        paddingBottom: style.paddingBottom || "80px",
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          {content.subheading && (
            <p className="text-[#5865F2] font-semibold mb-2">
              {content.subheading}
            </p>
          )}
          
          {content.heading && (
            <h2 className="text-4xl md:text-5xl font-bold">
              {content.heading}
            </h2>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items?.map((feature, index) => {
            // Get the icon component dynamically
            const IconComponent = feature.icon
              ? (Icons as any)[feature.icon]
              : Icons.Circle;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-[#5865F2]/10 rounded-xl flex items-center justify-center mb-6">
                  {IconComponent && (
                    <IconComponent className="w-8 h-8 text-[#5865F2]" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
