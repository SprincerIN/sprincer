import { Elysia } from "elysia";

export const issuesRoutes = new Elysia({ prefix: "/api/v1/issues" })
  .get("/", async () => {
    // TODO: Proxy to core-api /internal/v1/issues with filters
    return { issues: [], total: 0 };
  })
  .get("/:issueId", async ({ params }) => {
    // TODO: Proxy to core-api /internal/v1/issues/:issueId
    return { issue: null };
  })
  .post("/", async () => {
    // TODO: Proxy to core-api /internal/v1/issues
    return { issue: null };
  })
  .patch("/:issueId", async ({ params }) => {
    // TODO: Proxy to core-api /internal/v1/issues/:issueId
    return { issue: null };
  });
