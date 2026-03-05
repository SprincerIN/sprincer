import { Elysia } from "elysia";

export const workspacesRoutes = new Elysia({ prefix: "/internal/v1/workspaces" })
  .get("/", () => {
    // TODO: List workspaces for current user
    return { workspaces: [] };
  })
  .get("/:slug", ({ params }) => {
    // TODO: Get workspace by slug
    return { workspace: null, slug: params.slug };
  });
