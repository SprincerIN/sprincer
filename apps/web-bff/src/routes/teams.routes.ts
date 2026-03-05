import { Elysia } from "elysia";

export const teamsRoutes = new Elysia({ prefix: "/api/v1/teams" })
  .get("/", async () => {
    // TODO: Proxy to core-api /internal/v1/teams
    return { teams: [] };
  });
