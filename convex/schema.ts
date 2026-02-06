import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * New CMS Schema for Partex Website
 * Supports flexible page building, section management, and content editing
 */

export default defineSchema({
  // ===== PAGES SYSTEM =====
  
  /**
   * Pages - Core page management
   * Each page can contain multiple ordered sections
   */
  pages: defineTable({
    slug: v.string(),               // URL path (e.g., "about", "services")
    title: v.string(),              // Page title (SEO)
    description: v.string(),        // Meta description
    keywords: v.optional(v.string()), // SEO keywords
    ogImage: v.optional(v.string()), // Open Graph image URL
    isActive: v.boolean(),          // Published status
    isHomepage: v.boolean(),        // Mark as homepage
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_homepage", ["isHomepage"])
    .index("by_active", ["isActive"]),

  /**
   * Sections - Individual content blocks on pages
   * Reusable, ordered, and flexible
   */
  sections: defineTable({
    pageId: v.id("pages"),          // Parent page
    type: v.string(),               // Section type (hero-image-right, text-block, etc.)
    name: v.string(),               // Admin-friendly name
    order: v.number(),              // Display order (0-indexed)
    isActive: v.boolean(),          // Visibility toggle
    
    // Content - JSON object with section-specific fields
    // Structure varies by section type
    content: v.object({
      // Common fields
      heading: v.optional(v.string()),
      subheading: v.optional(v.string()),
      body: v.optional(v.string()), // HTML from WYSIWYG
      
      // Media
      imageUrl: v.optional(v.string()),
      imageAlt: v.optional(v.string()),
      imagePosition: v.optional(v.string()), // "left" | "right" | "center"
      videoUrl: v.optional(v.string()),
      
      // CTA
      ctaText: v.optional(v.string()),
      ctaLink: v.optional(v.string()),
      ctaStyle: v.optional(v.string()), // "primary" | "secondary" | "outline"
      
      // Layout
      columns: v.optional(v.number()),   // For grid sections
      items: v.optional(v.any()),        // Array for repeating content
    }),
    
    // Style overrides
    style: v.object({
      backgroundColor: v.optional(v.string()),
      textColor: v.optional(v.string()),
      paddingTop: v.optional(v.string()),
      paddingBottom: v.optional(v.string()),
      backgroundImage: v.optional(v.string()),
      backgroundOverlay: v.optional(v.number()), // 0-1 opacity
    }),
    
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_page_and_order", ["pageId", "order"])
    .index("by_type", ["type"])
    .index("by_page", ["pageId"]),

  /**
   * Section Templates - Pre-built section types in the library
   * Defines available section types and their schemas
   */
  sectionTemplates: defineTable({
    type: v.string(),               // Unique identifier (hero-image-right)
    name: v.string(),               // Display name (Hero with Image Right)
    description: v.string(),        // What it's for
    category: v.string(),           // Hero, Content, CTA, Features, etc.
    thumbnail: v.string(),          // Preview image URL
    icon: v.optional(v.string()),   // Icon name from Lucide
    
    // Default content structure for new instances
    defaultContent: v.any(),
    
    // Field schema for admin form generation
    schema: v.array(v.object({
      name: v.string(),             // Field name
      type: v.string(),             // text, textarea, wysiwyg, image, select, etc.
      label: v.string(),            // Display label
      required: v.boolean(),
      placeholder: v.optional(v.string()),
      options: v.optional(v.array(v.string())), // For select fields
    })),
    
    order: v.number(),              // Library display order
    isActive: v.boolean(),          // Show in library
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_order", ["order"])
    .index("by_type", ["type"]),

  // ===== NAVIGATION SYSTEM =====
  
  /**
   * Navigation - Site menu structure
   * Supports nested menus and various link types
   */
  navigation: defineTable({
    label: v.string(),              // Display text
    order: v.number(),              // Menu order
    parentId: v.optional(v.id("navigation")), // Parent item for dropdowns
    
    // Link configuration
    type: v.union(
      v.literal("page"),            // Link to a page
      v.literal("section"),         // Smooth scroll to section
      v.literal("external")         // External URL
    ),
    
    // Target based on type
    targetPageId: v.optional(v.id("pages")),
    targetSectionId: v.optional(v.id("sections")),
    targetUrl: v.optional(v.string()),
    
    openInNewTab: v.boolean(),
    isActive: v.boolean(),          // Show in menu
    
    // Mobile menu
    mobileOnly: v.optional(v.boolean()),
    desktopOnly: v.optional(v.boolean()),
  })
    .index("by_order", ["order"])
    .index("by_parent", ["parentId"]),

  // ===== MEDIA LIBRARY =====
  
  /**
   * Media - Centralized file/image management
   * Tracks uploads and usage across pages/sections
   */
  media: defineTable({
    filename: v.string(),           // Original filename
    storageId: v.id("_storage"),    // Convex storage reference
    url: v.string(),                // Public URL
    
    type: v.union(
      v.literal("image"),
      v.literal("video"),
      v.literal("document")
    ),
    
    // Metadata
    alt: v.string(),                // Alt text for images
    caption: v.optional(v.string()),
    size: v.number(),               // Bytes
    width: v.optional(v.number()),  // For images
    height: v.optional(v.number()), // For images
    mimeType: v.string(),
    
    // Usage tracking
    usedIn: v.array(v.object({
      pageId: v.optional(v.id("pages")),
      sectionId: v.optional(v.id("sections")),
    })),
    
    uploadedAt: v.number(),
    uploadedBy: v.optional(v.id("admins")),
  })
    .index("by_type", ["type"])
    .index("by_uploaded_at", ["uploadedAt"]),

  // ===== LEGACY TABLES (keep for backward compatibility) =====
  
  hero: defineTable({
    title: v.string(),
    subtitle: v.string(),
    imageUrl: v.optional(v.string()),
    ctaText: v.optional(v.string()),
    ctaLink: v.optional(v.string()),
    isActive: v.boolean(),
  }),

  services: defineTable({
    title: v.string(),
    description: v.string(),
    icon: v.optional(v.string()),
    ctaText: v.optional(v.string()),
    ctaLink: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  newsletter: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    ctaText: v.string(),
    isActive: v.boolean(),
  }),

  subscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
    isActive: v.boolean(),
  }).index("by_email", ["email"]),

  serviceDetails: defineTable({
    title: v.string(),
    content: v.string(),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  pricingPackages: defineTable({
    name: v.string(),
    price: v.number(),
    currency: v.string(),
    unit: v.optional(v.string()),
    features: v.array(v.string()),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  about: defineTable({
    title: v.string(),
    content: v.string(),
    isActive: v.boolean(),
  }),

  contact: defineTable({
    type: v.string(),
    label: v.string(),
    value: v.string(),
    icon: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  admins: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    role: v.string(),
    createdAt: v.number(),
    lastLogin: v.optional(v.number()),
  }).index("by_email", ["email"]),

  settings: defineTable({
    key: v.string(),
    value: v.string(),
    description: v.optional(v.string()),
  }).index("by_key", ["key"]),
});
