import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Hero section
  hero: defineTable({
    title: v.string(),
    subtitle: v.string(),
    imageUrl: v.optional(v.string()),
    ctaText: v.optional(v.string()),
    ctaLink: v.optional(v.string()),
    isActive: v.boolean(),
  }),

  // Services/Offerings
  services: defineTable({
    title: v.string(),
    description: v.string(),
    icon: v.optional(v.string()),
    ctaText: v.optional(v.string()),
    ctaLink: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  // Newsletter section
  newsletter: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    ctaText: v.string(),
    isActive: v.boolean(),
  }),

  // Newsletter subscribers
  subscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
    isActive: v.boolean(),
  }).index("by_email", ["email"]),

  // Service details/Pricing
  serviceDetails: defineTable({
    title: v.string(),
    content: v.string(),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  // Pricing packages
  pricingPackages: defineTable({
    name: v.string(),
    price: v.number(),
    currency: v.string(),
    unit: v.optional(v.string()),
    features: v.array(v.string()),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  // About section
  about: defineTable({
    title: v.string(),
    content: v.string(),
    isActive: v.boolean(),
  }),

  // Contact information
  contact: defineTable({
    type: v.string(), // "address", "email", "phone", "hours"
    label: v.string(),
    value: v.string(),
    icon: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  // Admin users
  admins: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    role: v.string(),
    createdAt: v.number(),
    lastLogin: v.optional(v.number()),
  }).index("by_email", ["email"]),

  // Site settings
  settings: defineTable({
    key: v.string(),
    value: v.string(),
    description: v.optional(v.string()),
  }).index("by_key", ["key"]),
});
