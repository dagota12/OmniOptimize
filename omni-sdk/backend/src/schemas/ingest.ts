import { z } from "@hono/zod-openapi";

/**
 * Request schemas for ingestion
 */

const DimensionsSchema = z.object({
  w: z.number().int().positive().openapi({ example: 1920 }),
  h: z.number().int().positive().openapi({ example: 1080 }),
});

const RrwebPayloadSchema = z.object({
  type: z.number().openapi({ example: 0 }),
  data: z.record(z.any()).openapi({ example: {} }),
  timestamp: z.number().optional().openapi({ example: 1704067200000 }),
});

const BaseEventSchema = z.object({
  eventId: z
    .string()
    .uuid()
    .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  projectId: z.string().min(1).openapi({ example: "proj_123" }),
  clientId: z.string().min(1).openapi({ example: "client_456" }),
  sessionId: z.string().min(1).openapi({ example: "session_789" }),
  userId: z.string().nullable().openapi({ example: "user_001" }),
  type: z
    .enum([
      "pageview",
      "click",
      "input",
      "route",
      "custom",
      "session_snapshot",
      "rrweb",
    ])
    .openapi({ example: "pageview" }),
  timestamp: z.number().openapi({ example: 1704067200000 }),
  url: z.string().url().openapi({ example: "https://example.com/page" }),
  referrer: z.string().openapi({ example: "https://google.com" }),
  pageDimensions: DimensionsSchema,
  viewport: DimensionsSchema,
  properties: z.record(z.any()).optional(),
});

const RrwebEventSchema = BaseEventSchema.extend({
  type: z.literal("rrweb"),
  replayId: z.string().min(1).openapi({ example: "replay_123" }),
  rrwebPayload: RrwebPayloadSchema,
  schemaVersion: z.string().openapi({ example: "1.0.0" }),
});

const ClickEventSchema = BaseEventSchema.extend({
  type: z.literal("click"),
  pageX: z.number().openapi({ example: 500 }),
  pageY: z.number().openapi({ example: 300 }),
  xNorm: z.number().min(0).max(1).openapi({ example: 0.26 }),
  yNorm: z.number().min(0).max(1).openapi({ example: 0.28 }),
  selector: z.string().min(1).openapi({ example: "button.primary" }),
  tagName: z.string().min(1).openapi({ example: "button" }),
  elementTextHash: z.string().optional(),
  xpath: z.string().optional(),
  screenClass: z
    .enum(["mobile", "tablet", "desktop"])
    .optional()
    .openapi({ example: "desktop" }),
  layoutHash: z.string().optional(),
});

const EventSchema = z.union([
  RrwebEventSchema,
  ClickEventSchema,
  BaseEventSchema,
]);

export const BatchSchema = z.object({
  batchId: z.string().min(1).openapi({ example: "batch_001" }),
  timestamp: z.number().openapi({ example: 1704067200000 }),
  events: z.array(EventSchema).min(1),
});

export const IngestRequestSchema = z.object({
  batchId: z.string().min(1),
  timestamp: z.number(),
  events: z.array(EventSchema).min(1),
});

/**
 * Response schemas for ingestion
 */

export const IngestSuccessResponseSchema = z.object({
  success: z.literal(true).openapi({ example: true }),
  message: z.string().openapi({ example: "Batch accepted for processing" }),
  batchId: z.string().openapi({ example: "batch_001" }),
  jobId: z.string().openapi({ example: "job_123" }),
});

export const IngestErrorResponseSchema = z.object({
  error: z
    .string()
    .openapi({ example: "Validation error: events must have at least 1 item" }),
});

export type IngestSuccessResponse = z.infer<typeof IngestSuccessResponseSchema>;
export type IngestErrorResponse = z.infer<typeof IngestErrorResponseSchema>;
