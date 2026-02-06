import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ===== QUERIES =====

/**
 * Get all pages
 */
export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("pages")
      .order("desc")
      .collect();
  },
});

/**
 * Get a page by slug
 */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (!page) return null;

    // Get all sections for this page
    const sections = await ctx.db
      .query("sections")
      .withIndex("by_page_and_order", (q) => q.eq("pageId", page._id))
      .collect();

    // Sort by order
    const sortedSections = sections.sort((a, b) => a.order - b.order);

    return {
      ...page,
      sections: sortedSections,
    };
  },
});

/**
 * Get homepage
 */
export const getHomepage = query({
  handler: async (ctx) => {
    const page = await ctx.db
      .query("pages")
      .withIndex("by_homepage", (q) => q.eq("isHomepage", true))
      .first();

    if (!page) return null;

    // Get all sections for this page
    const sections = await ctx.db
      .query("sections")
      .withIndex("by_page_and_order", (q) => q.eq("pageId", page._id))
      .collect();

    // Sort by order and filter active
    const sortedSections = sections
      .filter(s => s.isActive)
      .sort((a, b) => a.order - b.order);

    return {
      ...page,
      sections: sortedSections,
    };
  },
});

/**
 * Get a single page by ID (for admin)
 */
export const getById = query({
  args: { id: v.id("pages") },
  handler: async (ctx, args) => {
    const page = await ctx.db.get(args.id);
    if (!page) return null;

    // Get all sections for this page
    const sections = await ctx.db
      .query("sections")
      .withIndex("by_page_and_order", (q) => q.eq("pageId", page._id))
      .collect();

    return {
      ...page,
      sections: sections.sort((a, b) => a.order - b.order),
    };
  },
});

// ===== MUTATIONS =====

/**
 * Create a new page
 */
export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    isHomepage: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // If this is set as homepage, unset any existing homepage
    if (args.isHomepage) {
      const existingHomepage = await ctx.db
        .query("pages")
        .withIndex("by_homepage", (q) => q.eq("isHomepage", true))
        .first();
      
      if (existingHomepage) {
        await ctx.db.patch(existingHomepage._id, { isHomepage: false });
      }
    }

    const pageId = await ctx.db.insert("pages", {
      slug: args.slug,
      title: args.title,
      description: args.description,
      isActive: true,
      isHomepage: args.isHomepage ?? false,
      createdAt: now,
      updatedAt: now,
    });

    return pageId;
  },
});

/**
 * Update a page
 */
export const update = mutation({
  args: {
    id: v.id("pages"),
    slug: v.optional(v.string()),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    keywords: v.optional(v.string()),
    ogImage: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    isHomepage: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // If setting as homepage, unset any existing homepage
    if (updates.isHomepage) {
      const existingHomepage = await ctx.db
        .query("pages")
        .withIndex("by_homepage", (q) => q.eq("isHomepage", true))
        .first();
      
      if (existingHomepage && existingHomepage._id !== id) {
        await ctx.db.patch(existingHomepage._id, { isHomepage: false });
      }
    }

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return id;
  },
});

/**
 * Delete a page and all its sections
 */
export const remove = mutation({
  args: { id: v.id("pages") },
  handler: async (ctx, args) => {
    // Delete all sections first
    const sections = await ctx.db
      .query("sections")
      .withIndex("by_page", (q) => q.eq("pageId", args.id))
      .collect();

    for (const section of sections) {
      await ctx.db.delete(section._id);
    }

    // Delete the page
    await ctx.db.delete(args.id);
  },
});
