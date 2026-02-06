import { mutation } from "./_generated/server";

/**
 * Seed initial data for testing the CMS
 * Creates a homepage with 3 test sections
 */
export const seedTestData = mutation({
  handler: async (ctx) => {
    const now = Date.now();

    // Check if homepage already exists
    const existingPage = await ctx.db
      .query("pages")
      .withIndex("by_homepage", (q) => q.eq("isHomepage", true))
      .first();

    if (existingPage) {
      return { message: "Homepage already exists", pageId: existingPage._id };
    }

    // Create homepage
    const pageId = await ctx.db.insert("pages", {
      slug: "home",
      title: "Partex - Professional Business Solutions",
      description: "Leading provider of business solutions",
      isActive: true,
      isHomepage: true,
      createdAt: now,
      updatedAt: now,
    });

    // Section 1: Hero
    await ctx.db.insert("sections", {
      pageId,
      type: "hero-image-right",
      name: "Homepage Hero",
      order: 0,
      isActive: true,
      content: {
        heading: "Welcome to Partex",
        subheading: "Professional Business Solutions",
        body: "<p>We help businesses grow with innovative solutions and expert guidance.</p>",
        imageUrl: "/hero-placeholder.jpg",
        imageAlt: "Partex team at work",
        imagePosition: "right",
        ctaText: "Get Started",
        ctaLink: "#contact",
        ctaStyle: "primary",
      },
      style: {
        backgroundColor: "#5865F2",
        textColor: "#FFFFFF",
      },
      createdAt: now,
      updatedAt: now,
    });

    // Section 2: Feature Grid
    await ctx.db.insert("sections", {
      pageId,
      type: "feature-grid-3",
      name: "Our Services",
      order: 1,
      isActive: true,
      content: {
        heading: "What We Offer",
        subheading: "Comprehensive business solutions",
        columns: 3,
        items: [
          {
            icon: "Zap",
            title: "Fast Implementation",
            description: "Get up and running quickly with our streamlined process",
          },
          {
            icon: "Shield",
            title: "Secure & Reliable",
            description: "Enterprise-grade security for your peace of mind",
          },
          {
            icon: "Users",
            title: "Expert Support",
            description: "Dedicated team ready to help you succeed",
          },
        ],
      },
      style: {
        backgroundColor: "#FFFFFF",
        paddingTop: "80px",
        paddingBottom: "80px",
      },
      createdAt: now,
      updatedAt: now,
    });

    // Section 3: Text Block
    await ctx.db.insert("sections", {
      pageId,
      type: "text-block",
      name: "About Section",
      order: 2,
      isActive: true,
      content: {
        heading: "About Partex",
        body: `
          <p>For over a decade, Partex has been at the forefront of business innovation, 
          helping companies of all sizes achieve their goals.</p>
          
          <p>Our team of experts brings together deep industry knowledge and cutting-edge 
          technology to deliver solutions that drive real results.</p>
          
          <h3>Our Mission</h3>
          <p>To empower businesses with the tools and support they need to thrive in an 
          ever-changing market.</p>
        `,
      },
      style: {
        backgroundColor: "#F8F9FA",
        paddingTop: "60px",
        paddingBottom: "60px",
      },
      createdAt: now,
      updatedAt: now,
    });

    // Section 4: CTA
    await ctx.db.insert("sections", {
      pageId,
      type: "cta-simple",
      name: "Get Started CTA",
      order: 3,
      isActive: true,
      content: {
        heading: "Ready to Transform Your Business?",
        subheading: "Join hundreds of satisfied clients",
        ctaText: "Contact Us Today",
        ctaLink: "#contact",
        ctaStyle: "primary",
      },
      style: {
        backgroundColor: "#5865F2",
        textColor: "#FFFFFF",
        paddingTop: "60px",
        paddingBottom: "60px",
      },
      createdAt: now,
      updatedAt: now,
    });

    return { 
      message: "Test data seeded successfully",
      pageId,
      sectionsCreated: 4,
    };
  },
});
