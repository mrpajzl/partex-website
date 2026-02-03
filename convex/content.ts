import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Hero
export const getHero = query({
  handler: async (ctx) => {
    const hero = await ctx.db
      .query("hero")
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();
    return hero;
  },
});

export const updateHero = mutation({
  args: {
    id: v.id("hero"),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    ctaText: v.optional(v.string()),
    ctaLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Services
export const getServices = query({
  handler: async (ctx) => {
    const services = await ctx.db
      .query("services")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return services.sort((a, b) => a.order - b.order);
  },
});

export const getAllServices = query({
  handler: async (ctx) => {
    const services = await ctx.db.query("services").collect();
    return services.sort((a, b) => a.order - b.order);
  },
});

export const createService = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    icon: v.optional(v.string()),
    ctaText: v.optional(v.string()),
    ctaLink: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("services", {
      ...args,
      isActive: true,
    });
    return id;
  },
});

export const updateService = mutation({
  args: {
    id: v.id("services"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    ctaText: v.optional(v.string()),
    ctaLink: v.optional(v.string()),
    order: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteService = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Newsletter
export const getNewsletter = query({
  handler: async (ctx) => {
    const newsletter = await ctx.db
      .query("newsletter")
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();
    return newsletter;
  },
});

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (existing) {
      throw new Error("Email already subscribed");
    }
    
    const id = await ctx.db.insert("subscribers", {
      email: args.email,
      subscribedAt: Date.now(),
      isActive: true,
    });
    return id;
  },
});

// Service Details
export const getServiceDetails = query({
  handler: async (ctx) => {
    const details = await ctx.db
      .query("serviceDetails")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return details.sort((a, b) => a.order - b.order);
  },
});

// Pricing
export const getPricing = query({
  handler: async (ctx) => {
    const packages = await ctx.db
      .query("pricingPackages")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return packages.sort((a, b) => a.order - b.order);
  },
});

export const getAllPricing = query({
  handler: async (ctx) => {
    const packages = await ctx.db.query("pricingPackages").collect();
    return packages.sort((a, b) => a.order - b.order);
  },
});

export const createPricingPackage = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    currency: v.string(),
    unit: v.optional(v.string()),
    features: v.array(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("pricingPackages", {
      ...args,
      isActive: true,
    });
    return id;
  },
});

export const updatePricingPackage = mutation({
  args: {
    id: v.id("pricingPackages"),
    name: v.optional(v.string()),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    unit: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deletePricingPackage = mutation({
  args: { id: v.id("pricingPackages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// About
export const getAbout = query({
  handler: async (ctx) => {
    const about = await ctx.db
      .query("about")
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();
    return about;
  },
});

export const updateAbout = mutation({
  args: {
    id: v.id("about"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Contact
export const getContact = query({
  handler: async (ctx) => {
    const contact = await ctx.db
      .query("contact")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return contact.sort((a, b) => a.order - b.order);
  },
});

export const getAllContact = query({
  handler: async (ctx) => {
    const contact = await ctx.db.query("contact").collect();
    return contact.sort((a, b) => a.order - b.order);
  },
});

export const createContact = mutation({
  args: {
    type: v.string(),
    label: v.string(),
    value: v.string(),
    icon: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contact", {
      ...args,
      isActive: true,
    });
    return id;
  },
});

export const updateContact = mutation({
  args: {
    id: v.id("contact"),
    type: v.optional(v.string()),
    label: v.optional(v.string()),
    value: v.optional(v.string()),
    icon: v.optional(v.string()),
    order: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteContact = mutation({
  args: { id: v.id("contact") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Settings
export const getSetting = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    return setting;
  },
});

export const updateSetting = mutation({
  args: {
    key: v.string(),
    value: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.value,
        description: args.description,
      });
      return existing._id;
    } else {
      const id = await ctx.db.insert("settings", args);
      return id;
    }
  },
});
