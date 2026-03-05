import { Elysia } from "elysia";

export const workspacesRoutes = new Elysia({ prefix: "/api/v1/workspaces" })
  .get("/", async () => {
    // TODO: Proxy to core-api /internal/v1/workspaces
    return { workspaces: [] };
  })
  .get("/:slug", async ({ params }) => {
    // TODO: Proxy to core-api /internal/v1/workspaces/:slug
    return { workspace: null, slug: params.slug };
  });
