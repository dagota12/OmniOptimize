import { Hono } from "hono";
import { retentionRepository } from "../repositories";
import {
  retentionQuerySchema,
  retentionResponseSchema,
} from "../schemas/retention";

/**
 * Retention Analytics Route
 * Provides cohort-based user retention analysis
 *
 * API contract:
 * - Input: projectId, date range, retention intervals
 * - Output: cohorts with size and day-N retention percentages
 */

export const retentionRouter = new Hono();

/**
 * GET /analytics/retention
 *
 * Query parameters:
 * - projectId (required): Project identifier
 * - startDate (required): ISO date (YYYY-MM-DD), first cohort date in UTC
 * - endDate (required): ISO date (YYYY-MM-DD), last cohort date in UTC
 * - intervals (optional): Comma-separated day offsets (default: 0,1,3,7,14,30)
 *
 * Response shape:
 * {
 *   "cohorts": [
 *     {
 *       "date": "2025-01-01",
 *       "size": 120,
 *       "retention": {
 *         "0": 1.0,
 *         "1": 0.42,
 *         "3": 0.31,
 *         "7": 0.18,
 *         "14": 0.12,
 *         "30": 0.06
 *       }
 *     }
 *   ]
 * }
 *
 * Notes:
 * - Retention values are percentages (0-1)
 * - Day 0 retention = 100% (all cohort members by definition)
 * - Empty cohorts (size = 0) included in results
 * - All date calculations in UTC
 */
retentionRouter.get("/retention", async (c) => {
  try {
    // Extract and validate query parameters
    const queryParams = {
      projectId: c.req.query("projectId"),
      startDate: c.req.query("startDate"),
      endDate: c.req.query("endDate"),
      intervals: c.req.query("intervals"),
    };

    // Parse and validate with Zod
    const parsedQuery = retentionQuerySchema.safeParse(queryParams);

    if (!parsedQuery.success) {
      return c.json(
        {
          error: "Validation failed",
          details: parsedQuery.error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        },
        400
      );
    }

    const { projectId, startDate, endDate, intervals } = parsedQuery.data;

    // Fetch retention data
    const cohortData = await retentionRepository.getRetentionCohorts(
      projectId,
      startDate,
      endDate,
      intervals
    );

    // Transform counts to percentages
    const cohorts = cohortData.map((cohort) => {
      const retentionPercentages: Record<number, number> = {};

      // Day 0 always 100% if cohort has members
      const day0Pct = cohort.size > 0 ? 1.0 : 0;
      retentionPercentages[0] = day0Pct;

      // Other days: count / cohort size
      for (const interval of intervals) {
        if (interval === 0) continue; // Skip day 0, already handled
        const retainedCount = cohort.retention[interval] || 0;
        const pct =
          cohort.size > 0
            ? parseFloat((retainedCount / cohort.size).toFixed(2))
            : 0;
        retentionPercentages[interval] = pct;
      }

      return {
        date: cohort.date,
        size: cohort.size,
        retention: retentionPercentages,
      };
    });

    // Validate response shape with Zod
    const response = { cohorts };
    const validatedResponse = retentionResponseSchema.safeParse(response);

    if (!validatedResponse.success) {
      console.error(
        "[RetentionRoute] Response validation failed:",
        validatedResponse.error
      );
      return c.json(
        {
          error: "Internal server error: invalid response shape",
        },
        500
      );
    }

    return c.json(validatedResponse.data, 200);
  } catch (error) {
    console.error("[RetentionRoute] Error fetching retention data:", error);
    return c.json(
      {
        error: "Failed to fetch retention data",
      },
      500
    );
  }
});

export default retentionRouter;
