import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { sectionTemplatesData } from "./sectionTemplates";

// ===== QUERIES =====

/**
 * Get all section templates
 */
export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("sectionTemplates")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

/**
 * Get templates by category
 */
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sectionTemplates")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

/**
 * Get a template by type
 */
export const getByType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sectionTemplates")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .first();
  },
});

// ===== MUTATIONS =====

/**
 * Seed section templates
 * Run this once to populate the templates library
 */
export const seed = mutation({
  handler: async (ctx) => {
    const now = Date.now();

    // Check if templates already exist
    const existing = await ctx.db.query("sectionTemplates").first();
    if (existing) {
      console.log("Templates already seeded");
      return { message: "Templates already exist" };
    }

    // Insert all templates
    let count = 0;
    for (const template of sectionTemplatesData) {
      await ctx.db.insert("sectionTemplates", {
        ...template,
        createdAt: now,
      });
      count++;
    }

    return { message: `Seeded ${count} templates` };
  },
});

/**
 * Reset templates (delete and re-seed)
 */
export const reset = mutation({
  handler: async (ctx) => {
    // Delete all existing templates
    const existing = await ctx.db.query("sectionTemplates").collect();
    for (const template of existing) {
      await ctx.db.delete(template._id);
    }

    // Re-seed
    const now = Date.now();
    let count = 0;
    for (const template of sectionTemplatesData) {
      await ctx.db.insert("sectionTemplates", {
        ...template,
        createdAt: now,
      });
      count++;
    }

    return { message: `Reset and seeded ${count} templates` };
  },
});
