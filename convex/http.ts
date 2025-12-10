import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/github-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payload = await request.json();
    const eventType = request.headers.get("x-github-event");

    const url = new URL(request.url);
    const projectIdString = url.searchParams.get("projectId");

    if (!projectIdString) {
        return new Response("Missing projectId param", { status: 400 });
    }

    const projectId = projectIdString as Id<"projects">;

    if (eventType === "push") {
      const commits = payload.commits;
      const repoFullName = payload.repository.full_name;
      const ref = payload.ref;
      const branch = ref.split("/").pop();

      if (commits && commits.length > 0) {
        const latestCommit = commits[commits.length - 1];

        // 👇 CHANGED: Use runMutation + triggerAnalysis
        // This is instant. It doesn't wait for Gemini.
        await ctx.runMutation(internal.scheduler.triggerAnalysis, {
            projectId: projectId,
            repoFullName: repoFullName,
            commitSha: latestCommit.id,
            commitMessage: latestCommit.message,
            authorName: latestCommit.author.name,
            branch: branch || "main",
        });
      }
    }

    // Returns 200 OK immediately to GitHub
    return new Response("Webhook Received", { status: 200 });
  }),
});

export default http;