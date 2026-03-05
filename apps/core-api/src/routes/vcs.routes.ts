import { Elysia } from "elysia";

export const vcsRoutes = new Elysia({ prefix: "/internal/v1/vcs" })
  .get("/repos", () => {
    // TODO: List connected repositories
    return { repos: [] };
  })
  .get("/repos/:repoId/prs", ({ params }) => {
    // TODO: List PRs for repository
    return { prs: [], repoId: params.repoId };
  });
