import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 1. USERS
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  // 2. TEAMS
  teams: defineTable({
    name: v.string(),
    slug: v.string(),
    plan: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
    stripeCustomerId: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  // 3. TEAM MEMBERS
  team_members: defineTable({
    teamId: v.id("teams"),
    userId: v.id("users"),
    role: v.union(v.literal("owner"), v.literal("admin"), v.literal("viewer")),
    status: v.union(v.literal("active"), v.literal("invited")),
    invitedEmail: v.optional(v.string()),
    joinedAt: v.number(),
  })
  .index("by_team", ["teamId"])
  .index("by_user", ["userId"])
  .index("by_team_user", ["teamId", "userId"]),

  // 4. PROJECTS
  projects: defineTable({
    teamId: v.id("teams"),
    name: v.string(),
    url: v.string(),
    githubRepo: v.optional(v.string()),
    publishableKey: v.string(), 
    secretKey: v.string(),
    settings: v.object({
        sessionReplay: v.boolean(),
        scanMode: v.union(v.literal("diff"), v.literal("full")),
        maskPrivacy: v.boolean(),
    }),
    createdAt: v.number(),
  }).index("by_team", ["teamId"]),

  // 5. ANALYTICS
  analytics_sessions: defineTable({
    projectId: v.id("projects"),
    visitorId: v.string(),
    country: v.optional(v.string()),
    device: v.string(),
    browser: v.string(),
    startedAt: v.number(),
    lastActiveAt: v.number(),
    duration: v.number(),
    eventsCount: v.number(),
    replayData: v.optional(v.any()),
  }).index("by_project", ["projectId"]),

  analytics_events: defineTable({
    projectId: v.id("projects"),
    sessionId: v.id("analytics_sessions"),
    type: v.string(),
    path: v.string(),
    x: v.optional(v.number()),
    y: v.optional(v.number()), 
    createdAt: v.number(),
  }).index("by_project_type", ["projectId", "type"]),

  // 6. CODE HEALTH
  code_audits: defineTable({
    projectId: v.id("projects"),
    commitHash: v.string(),
    branch: v.string(),
    author: v.string(),
    message: v.string(),
    riskScore: v.number(),
    aiSummary: v.string(),
    issues: v.array(v.object({
        severity: v.string(),
        file: v.string(),
        line: v.number(),
        description: v.string(),
        suggestion: v.optional(v.string()),
        fixType: v.optional(v.string()), // Added from your scheduler logic
        fixContent: v.optional(v.string()), // Added from your scheduler logic
    })),
    createdAt: v.number(),
  }).index("by_project", ["projectId"]),

  // 7. SEO SCANS
  seo_scans: defineTable({
    projectId: v.id("projects"),
    url: v.string(),
    strategy: v.union(v.literal("mobile"), v.literal("desktop")),
    scores: v.object({
        performance: v.number(),
        accessibility: v.number(),
        seo: v.number(),
        bestPractices: v.number(),
    }),
    coreWebVitals: v.any(),
    createdAt: v.number(),
  }).index("by_project", ["projectId"]),
});