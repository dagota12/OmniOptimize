import { internalAction, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Octokit } from "octokit";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Save Audit Mutation
export const saveAudit = internalMutation({
  args: {
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
      fixType: v.optional(v.string()),
      fixContent: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("code_audits", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// 2. The AI Analyzer Action
export const analyzeCommit = internalAction({
  args: {
    projectId: v.id("projects"),
    repoFullName: v.string(),
    commitSha: v.string(),
    commitMessage: v.string(),
    authorName: v.string(),
    branch: v.string(),
  },
  handler: async (ctx, args) => {
    console.log(`🔍 Analyzing ${args.commitSha}`);

    const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
    let diffData = "";
    
    try {
      const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
        owner: args.repoFullName.split('/')[0],
        repo: args.repoFullName.split('/')[1],
        ref: args.commitSha,
        headers: { accept: "application/vnd.github.v3.diff" },
      });
      // FIX: Cast data to string because we requested the diff format
      diffData = data as unknown as string;
    } catch (err) {
      console.error("GitHub Diff Fetch Error", err);
      return;
    }

    // Safety check: sometimes empty commits or merges return no diff
    if (!diffData || typeof diffData !== 'string' || diffData.length > 50000) {
        console.log("Diff skipped (empty, not string, or too large)");
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Analyze this Git Diff for security and performance issues.
      Return ONLY raw JSON. No markdown formatting.
      Format:
      {
        "riskScore": number (0-100),
        "summary": "string",
        "issues": [
          { "severity": "high"|"medium"|"low", "file": "string", "line": number, "title": "string", "desc": "string", "fixType": "code"|"text", "fixContent": "string" }
        ]
      }
      DIFF: ${diffData}
    `;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
      const analysis = JSON.parse(text);

      await ctx.runMutation(internal.scheduler.saveAudit, {
        projectId: args.projectId,
        commitHash: args.commitSha,
        branch: args.branch,
        author: args.authorName,
        message: args.commitMessage,
        riskScore: analysis.riskScore || 0,
        aiSummary: analysis.summary || "No issues found.",
        issues: analysis.issues?.map((issue: any) => ({
            severity: issue.severity || "low",
            file: issue.file || "unknown",
            line: issue.line || 0,
            description: issue.desc || "No description",
            suggestion: issue.title,
            fixType: issue.fixType,
            fixContent: issue.fixContent
        })) || []
      });
    } catch (err) {
      console.error("Gemini Error", err);
    }
  },
});

export const triggerAnalysis = internalMutation({
  args: {
    projectId: v.id("projects"),
    repoFullName: v.string(),
    commitSha: v.string(),
    commitMessage: v.string(),
    authorName: v.string(),
    branch: v.string(),
  },
  handler: async (ctx, args) => {
    // This schedules the action to run immediately in the background,
    // but DOES NOT wait for it to finish.
    await ctx.scheduler.runAfter(0, internal.scheduler.analyzeCommit, args);
  },
});
