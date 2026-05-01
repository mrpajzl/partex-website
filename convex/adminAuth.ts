import { query } from "./_generated/server";

export const hasUsers = query({
  handler: async (ctx) => {
    const user = await ctx.db.query("users").first();
    return user !== null;
  },
});
