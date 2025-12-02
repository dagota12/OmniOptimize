import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get Settings for the Dashboard
export const getSettings = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) return null;
    return {
        name: project.name,
        settings: project.settings, // { sessionReplay, scanMode... }
        apiKeys: {
            pk: project.publishableKey,
            // Only return Secret Key if user has 'admin' role (check logic omitted for brevity)
            sk: project.secretKey, 
        }
    };
  },
});

// Update Feature Toggles
export const updateFeatures = mutation({
  args: { 
    projectId: v.id("projects"),
    sessionReplay: v.boolean(),
    scanMode: v.union(v.literal("diff"), v.literal("full")),
  },
  handler: async (ctx, args) => {
    // In real app: Check if user is Admin of the team owning this project
    await ctx.db.patch(args.projectId, {
        settings: {
            sessionReplay: args.sessionReplay,
            scanMode: args.scanMode,
            maskPrivacy: true, // Default
        }
    });
  },
});