import { Elysia } from "elysia";

/**
 * Agent tool endpoints — Phase 4 architectural primitives.
 * Structured input/output contracts for the Phase 5 agent layer.
 */
export const agentRoutes = new Elysia({ prefix: "/internal/v1/agent" })
  .get("/context", () => {
    // TODO: Assemble workspace context bundle for LLM prompts
    return { context: null };
  })
  .post("/tools/create-issue", () => {
    // TODO: CreateIssue tool
    return { result: null };
  })
  .post("/tools/list-issues", () => {
    // TODO: ListIssues tool
    return { result: null };
  });
