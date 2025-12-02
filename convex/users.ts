import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Stores the current user in the `users` table.
 * Should be called immediately after login in the frontend.
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (user !== null) {
      // If they exist, update their avatar/email in case it changed
      if (user.avatar !== identity.pictureUrl || user.email !== identity.email) {
          await ctx.db.patch(user._id, {
              avatar: identity.pictureUrl,
              email: identity.email!,
          });
      }
      return user._id;
    }

    // If new user, create them
    const newUserId = await ctx.db.insert("users", {
      clerkId: identity.subject,
      name: identity.name || identity.givenName || "Anonymous",
      email: identity.email!,
      avatar: identity.pictureUrl,
      createdAt: Date.now(),
    });

    return newUserId;
  },
});

/**
 * Get the current user's profile
 */
export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});