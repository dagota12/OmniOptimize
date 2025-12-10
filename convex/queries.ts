import { query } from "./_generated/server";
import { v } from "convex/values";

// Used by CommitLog.jsx to fetch history
export const getCommits = query({
  args: { projectId: v.string() }, // Accept ID as string from URL params
  handler: async (ctx, args) => {
    // 1. Check if valid ID format (optional safety)
    const projectId = ctx.db.normalizeId("projects", args.projectId);
    if (!projectId) return [];

    // 2. Fetch audits
    const audits = await ctx.db
      .query("code_audits")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .order("desc") // Newest first
      .take(20);

    return audits;
  },
});