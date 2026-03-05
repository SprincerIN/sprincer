import { Elysia } from "elysia";

export const searchRoutes = new Elysia({ prefix: "/internal/v1/search" })
  .get("/", ({ query }) => {
    // TODO: Unified search via Meilisearch — issues + wiki + PRs
    return { results: [], query: query["q"] ?? "" };
  });
