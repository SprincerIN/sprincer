import { Elysia } from "elysia";

export const analyticsRoutes = new Elysia({ prefix: "/internal/v1/analytics" })
  .get("/burndown", () => {
    // TODO: Burndown chart data
    return { data: [] };
  })
  .get("/velocity", () => {
    // TODO: Team velocity data
    return { data: [] };
  });
