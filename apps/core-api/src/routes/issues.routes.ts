import { Elysia } from "elysia";

export const issuesRoutes = new Elysia({ prefix: "/internal/v1/issues" })
  .get("/", () => {
    // TODO: List issues with filters
    return { issues: [], total: 0 };
  })
  .get("/:issueId", ({ params }) => {
    // TODO: Get issue by ID
    return { issue: null, issueId: params.issueId };
  })
  .post("/", () => {
    // TODO: Create issue
    return { issue: null };
  })
  .patch("/:issueId", ({ params }) => {
    // TODO: Update issue
    return { issue: null, issueId: params.issueId };
  })
  .delete("/:issueId", ({ params }) => {
    // TODO: Archive issue
    return { success: true, issueId: params.issueId };
  });
