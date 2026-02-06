/**
 * Section Templates Library
 * Pre-built section types with schemas and defaults
 */

export const sectionTemplatesData = [
  // ===== HERO SECTIONS =====
  {
    type: "hero-image-right",
    name: "Hero with Image (Right)",
    description: "Large hero section with text on left, image on right",
    category: "Hero",
    thumbnail: "/section-previews/hero-image-right.png",
    icon: "LayoutGrid",
    defaultContent: {
      heading: "Welcome to Our Company",
      subheading: "Building amazing experiences",
      body: "<p>We help businesses grow with innovative solutions.</p>",
      imageUrl: "/placeholder-hero.jpg",
      imageAlt: "Hero image",
      imagePosition: "right",
      ctaText: "Get Started",
      ctaLink: "/contact",
      ctaStyle: "primary",
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: true, placeholder: "Main heading" },
      { name: "subheading", type: "text", label: "Subheading", required: false, placeholder: "Secondary text" },
      { name: "body", type: "wysiwyg", label: "Body Text", required: false },
      { name: "imageUrl", type: "image", label: "Hero Image", required: false },
      { name: "imageAlt", type: "text", label: "Image Alt Text", required: false },
      { name: "ctaText", type: "text", label: "Button Text", required: false },
      { name: "ctaLink", type: "text", label: "Button Link", required: false },
      { name: "ctaStyle", type: "select", label: "Button Style", required: false, options: ["primary", "secondary", "outline"] },
    ],
    order: 1,
    isActive: true,
  },
  
  {
    type: "hero-image-left",
    name: "Hero with Image (Left)",
    description: "Large hero section with image on left, text on right",
    category: "Hero",
    thumbnail: "/section-previews/hero-image-left.png",
    icon: "LayoutGrid",
    defaultContent: {
      heading: "Welcome to Our Company",
      subheading: "Building amazing experiences",
      body: "<p>We help businesses grow with innovative solutions.</p>",
      imageUrl: "/placeholder-hero.jpg",
      imageAlt: "Hero image",
      imagePosition: "left",
      ctaText: "Get Started",
      ctaLink: "/contact",
      ctaStyle: "primary",
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: true },
      { name: "subheading", type: "text", label: "Subheading", required: false },
      { name: "body", type: "wysiwyg", label: "Body Text", required: false },
      { name: "imageUrl", type: "image", label: "Hero Image", required: false },
      { name: "imageAlt", type: "text", label: "Image Alt Text", required: false },
      { name: "ctaText", type: "text", label: "Button Text", required: false },
      { name: "ctaLink", type: "text", label: "Button Link", required: false },
      { name: "ctaStyle", type: "select", label: "Button Style", required: false, options: ["primary", "secondary", "outline"] },
    ],
    order: 2,
    isActive: true,
  },

  {
    type: "hero-centered",
    name: "Hero Centered",
    description: "Centered hero with text and image below",
    category: "Hero",
    thumbnail: "/section-previews/hero-centered.png",
    icon: "AlignCenter",
    defaultContent: {
      heading: "Welcome to Our Platform",
      subheading: "Powerful solutions for modern businesses",
      ctaText: "Learn More",
      ctaLink: "/about",
      ctaStyle: "primary",
      imageUrl: "/placeholder-hero.jpg",
      imageAlt: "Hero image",
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: true },
      { name: "subheading", type: "text", label: "Subheading", required: false },
      { name: "ctaText", type: "text", label: "Button Text", required: false },
      { name: "ctaLink", type: "text", label: "Button Link", required: false },
      { name: "ctaStyle", type: "select", label: "Button Style", required: false, options: ["primary", "secondary", "outline"] },
      { name: "imageUrl", type: "image", label: "Hero Image", required: false },
      { name: "imageAlt", type: "text", label: "Image Alt Text", required: false },
    ],
    order: 3,
    isActive: true,
  },

  // ===== CONTENT SECTIONS =====

  {
    type: "text-block",
    name: "Text Block",
    description: "Simple text content block with WYSIWYG editor",
    category: "Content",
    thumbnail: "/section-previews/text-block.png",
    icon: "FileText",
    defaultContent: {
      heading: "Our Story",
      body: "<p>Write your content here...</p>",
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "body", type: "wysiwyg", label: "Content", required: true },
    ],
    order: 10,
    isActive: true,
  },

  {
    type: "text-image",
    name: "Text + Image",
    description: "Text content with image side-by-side",
    category: "Content",
    thumbnail: "/section-previews/text-image.png",
    icon: "Columns",
    defaultContent: {
      heading: "About Us",
      body: "<p>Learn more about our company...</p>",
      imageUrl: "/placeholder.jpg",
      imageAlt: "About image",
      imagePosition: "right",
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "body", type: "wysiwyg", label: "Content", required: true },
      { name: "imageUrl", type: "image", label: "Image", required: false },
      { name: "imageAlt", type: "text", label: "Image Alt Text", required: false },
      { name: "imagePosition", type: "select", label: "Image Position", required: false, options: ["left", "right"] },
    ],
    order: 11,
    isActive: true,
  },

  {
    type: "two-column-text",
    name: "Two Column Text",
    description: "Text content split into two columns",
    category: "Content",
    thumbnail: "/section-previews/two-column.png",
    icon: "Columns",
    defaultContent: {
      heading: "Why Choose Us",
      items: [
        {
          title: "Column 1",
          content: "<p>First column content...</p>",
        },
        {
          title: "Column 2",
          content: "<p>Second column content...</p>",
        },
      ],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "items", type: "repeater", label: "Columns", required: true },
    ],
    order: 12,
    isActive: true,
  },

  // ===== FEATURE/SERVICE SECTIONS =====

  {
    type: "feature-grid-3",
    name: "Feature Grid (3 Columns)",
    description: "Grid of features/services with icons (3 columns)",
    category: "Features",
    thumbnail: "/section-previews/feature-grid-3.png",
    icon: "Grid3x3",
    defaultContent: {
      heading: "Our Services",
      subheading: "What we offer",
      columns: 3,
      items: [
        {
          icon: "Zap",
          title: "Fast Performance",
          description: "Lightning fast load times",
        },
        {
          icon: "Shield",
          title: "Secure",
          description: "Bank-level security",
        },
        {
          icon: "Users",
          title: "Team Collaboration",
          description: "Work together seamlessly",
        },
      ],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "subheading", type: "text", label: "Subheading", required: false },
      { name: "items", type: "repeater", label: "Features", required: true },
    ],
    order: 20,
    isActive: true,
  },

  {
    type: "feature-grid-2",
    name: "Feature Grid (2 Columns)",
    description: "Grid of features/services with icons (2 columns)",
    category: "Features",
    thumbnail: "/section-previews/feature-grid-2.png",
    icon: "Grid2x2",
    defaultContent: {
      heading: "Our Services",
      subheading: "What we offer",
      columns: 2,
      items: [
        {
          icon: "Zap",
          title: "Fast Performance",
          description: "Lightning fast load times",
        },
        {
          icon: "Shield",
          title: "Secure",
          description: "Bank-level security",
        },
      ],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "subheading", type: "text", label: "Subheading", required: false },
      { name: "items", type: "repeater", label: "Features", required: true },
    ],
    order: 21,
    isActive: true,
  },

  {
    type: "feature-list",
    name: "Feature List",
    description: "Vertical list of features with checkmarks",
    category: "Features",
    thumbnail: "/section-previews/feature-list.png",
    icon: "List",
    defaultContent: {
      heading: "Everything You Need",
      items: [
        { text: "Unlimited projects" },
        { text: "24/7 support" },
        { text: "Advanced analytics" },
        { text: "Custom integrations" },
      ],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "items", type: "repeater", label: "Features", required: true },
    ],
    order: 22,
    isActive: true,
  },

  // ===== CTA SECTIONS =====

  {
    type: "cta-simple",
    name: "Simple CTA",
    description: "Call-to-action with heading and button",
    category: "CTA",
    thumbnail: "/section-previews/cta-simple.png",
    icon: "ArrowRight",
    defaultContent: {
      heading: "Ready to Get Started?",
      subheading: "Join thousands of satisfied customers",
      ctaText: "Start Free Trial",
      ctaLink: "/signup",
      ctaStyle: "primary",
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: true },
      { name: "subheading", type: "text", label: "Subheading", required: false },
      { name: "ctaText", type: "text", label: "Button Text", required: true },
      { name: "ctaLink", type: "text", label: "Button Link", required: true },
      { name: "ctaStyle", type: "select", label: "Button Style", required: false, options: ["primary", "secondary", "outline"] },
    ],
    order: 30,
    isActive: true,
  },

  {
    type: "newsletter",
    name: "Newsletter Signup",
    description: "Email capture form for newsletter",
    category: "CTA",
    thumbnail: "/section-previews/newsletter.png",
    icon: "Mail",
    defaultContent: {
      heading: "Stay Updated",
      subheading: "Get the latest news and updates",
      ctaText: "Subscribe",
      placeholder: "Enter your email",
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: true },
      { name: "subheading", type: "text", label: "Subheading", required: false },
      { name: "ctaText", type: "text", label: "Button Text", required: true },
      { name: "placeholder", type: "text", label: "Input Placeholder", required: false },
    ],
    order: 31,
    isActive: true,
  },

  // ===== SOCIAL PROOF =====

  {
    type: "testimonials",
    name: "Testimonials",
    description: "Customer testimonials grid",
    category: "Social Proof",
    thumbnail: "/section-previews/testimonials.png",
    icon: "MessageSquare",
    defaultContent: {
      heading: "What Our Clients Say",
      items: [
        {
          quote: "Amazing service! Highly recommended.",
          author: "John Doe",
          role: "CEO, Company Inc",
          avatar: "/placeholder-avatar.jpg",
        },
      ],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "items", type: "repeater", label: "Testimonials", required: true },
    ],
    order: 40,
    isActive: true,
  },

  {
    type: "logo-cloud",
    name: "Logo Cloud",
    description: "Grid of partner/client logos",
    category: "Social Proof",
    thumbnail: "/section-previews/logo-cloud.png",
    icon: "Image",
    defaultContent: {
      heading: "Trusted By Leading Companies",
      items: [
        { imageUrl: "/logo-1.png", alt: "Company 1" },
        { imageUrl: "/logo-2.png", alt: "Company 2" },
        { imageUrl: "/logo-3.png", alt: "Company 3" },
      ],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "items", type: "repeater", label: "Logos", required: true },
    ],
    order: 41,
    isActive: true,
  },

  {
    type: "stats",
    name: "Stats/Numbers",
    description: "Key statistics display",
    category: "Social Proof",
    thumbnail: "/section-previews/stats.png",
    icon: "BarChart",
    defaultContent: {
      heading: "Our Impact",
      items: [
        { number: "10K+", label: "Happy Clients" },
        { number: "50+", label: "Projects Completed" },
        { number: "99%", label: "Satisfaction Rate" },
        { number: "24/7", label: "Support Available" },
      ],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "items", type: "repeater", label: "Stats", required: true },
    ],
    order: 42,
    isActive: true,
  },

  // ===== PRICING =====

  {
    type: "pricing-table",
    name: "Pricing Table",
    description: "Pricing packages comparison",
    category: "Pricing",
    thumbnail: "/section-previews/pricing.png",
    icon: "DollarSign",
    defaultContent: {
      heading: "Simple, Transparent Pricing",
      subheading: "Choose the plan that's right for you",
      items: [
        {
          name: "Basic",
          price: "29",
          currency: "CZK",
          unit: "/month",
          features: ["Feature 1", "Feature 2", "Feature 3"],
          ctaText: "Get Started",
          ctaLink: "/signup",
          highlighted: false,
        },
        {
          name: "Pro",
          price: "79",
          currency: "CZK",
          unit: "/month",
          features: ["Everything in Basic", "Feature 4", "Feature 5", "Priority Support"],
          ctaText: "Get Started",
          ctaLink: "/signup",
          highlighted: true,
        },
      ],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "subheading", type: "text", label: "Subheading", required: false },
      { name: "items", type: "repeater", label: "Pricing Plans", required: true },
    ],
    order: 50,
    isActive: true,
  },

  // ===== INTERACTIVE =====

  {
    type: "faq",
    name: "FAQ Accordion",
    description: "Frequently asked questions with accordion",
    category: "Interactive",
    thumbnail: "/section-previews/faq.png",
    icon: "HelpCircle",
    defaultContent: {
      heading: "Frequently Asked Questions",
      items: [
        {
          question: "How does it work?",
          answer: "<p>It's simple! Just sign up and get started.</p>",
        },
        {
          question: "What's included?",
          answer: "<p>Everything you need to succeed.</p>",
        },
      ],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "items", type: "repeater", label: "Questions", required: true },
    ],
    order: 60,
    isActive: true,
  },

  {
    type: "contact-form",
    name: "Contact Form",
    description: "Simple contact form",
    category: "Interactive",
    thumbnail: "/section-previews/contact-form.png",
    icon: "Send",
    defaultContent: {
      heading: "Get In Touch",
      subheading: "We'd love to hear from you",
      ctaText: "Send Message",
      fields: ["name", "email", "message"],
    },
    schema: [
      { name: "heading", type: "text", label: "Heading", required: false },
      { name: "subheading", type: "text", label: "Subheading", required: false },
      { name: "ctaText", type: "text", label: "Button Text", required: true },
    ],
    order: 61,
    isActive: true,
  },
];
