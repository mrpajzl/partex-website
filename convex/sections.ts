import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ===== QUERIES =====

/**
 * Get all sections for a page
 */
export const getByPage = query({
  args: { pageId: v.id("pages") },
  handler: async (ctx, args) => {
    const sections = await ctx.db
      .query("sections")
      .withIndex("by_page_and_order", (q) => q.eq("pageId", args.pageId))
      .collect();

    return sections.sort((a, b) => a.order - b.order);
  },
});

/**
 * Get a single section by ID
 */
export const getById = query({
  args: { id: v.id("sections") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// ===== MUTATIONS =====

/**
 * Create a new section
 */
export const create = mutation({
  args: {
    pageId: v.id("pages"),
    type: v.string(),
    name: v.string(),
    content: v.any(),
    style: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Get the highest order number for this page
    const sections = await ctx.db
      .query("sections")
      .withIndex("by_page", (q) => q.eq("pageId", args.pageId))
      .collect();

    const maxOrder = sections.length > 0 
      ? Math.max(...sections.map(s => s.order))
      : -1;

    const sectionId = await ctx.db.insert("sections", {
      pageId: args.pageId,
      type: args.type,
      name: args.name,
      order: maxOrder + 1,
      isActive: true,
      content: args.content || {},
      style: args.style || {},
      createdAt: now,
      updatedAt: now,
    });

    return sectionId;
  },
});

/**
 * Update a section
 */
export const update = mutation({
  args: {
    id: v.id("sections"),
    name: v.optional(v.string()),
    content: v.optional(v.any()),
    style: v.optional(v.any()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return id;
  },
});

/**
 * Reorder sections
 */
export const reorder = mutation({
  args: {
    pageId: v.id("pages"),
    sectionIds: v.array(v.id("sections")),
  },
  handler: async (ctx, args) => {
    // Update each section's order based on its position in the array
    for (let i = 0; i < args.sectionIds.length; i++) {
      await ctx.db.patch(args.sectionIds[i], {
        order: i,
        updatedAt: Date.now(),
      });
    }
  },
});

/**
 * Delete a section
 */
export const remove = mutation({
  args: { id: v.id("sections") },
  handler: async (ctx, args) => {
    const section = await ctx.db.get(args.id);
    if (!section) return;

    // Delete the section
    await ctx.db.delete(args.id);

    // Reorder remaining sections
    const remainingSections = await ctx.db
      .query("sections")
      .withIndex("by_page", (q) => q.eq("pageId", section.pageId))
      .collect();

    const sorted = remainingSections.sort((a, b) => a.order - b.order);
    
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].order !== i) {
        await ctx.db.patch(sorted[i]._id, { order: i });
      }
    }
  },
});

/**
 * Duplicate a section
 */
export const duplicate = mutation({
  args: { id: v.id("sections") },
  handler: async (ctx, args) => {
    const section = await ctx.db.get(args.id);
    if (!section) return null;

    const now = Date.now();

    // Get the highest order number for this page
    const sections = await ctx.db
      .query("sections")
      .withIndex("by_page", (q) => q.eq("pageId", section.pageId))
      .collect();

    const maxOrder = Math.max(...sections.map(s => s.order));

    const newSectionId = await ctx.db.insert("sections", {
      pageId: section.pageId,
      type: section.type,
      name: `${section.name} (Copy)`,
      order: maxOrder + 1,
      isActive: section.isActive,
      content: section.content,
      style: section.style,
      createdAt: now,
      updatedAt: now,
    });

    return newSectionId;
  },
});
