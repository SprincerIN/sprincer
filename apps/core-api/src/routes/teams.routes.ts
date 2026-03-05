import { Elysia } from "elysia";

export const teamsRoutes = new Elysia({ prefix: "/internal/v1/teams" })
  .get("/", () => {
    // TODO: List teams for workspace
    return { teams: [] };
  })
  .get("/:teamId", ({ params }) => {
    // TODO: Get team by ID
    return { team: null, teamId: params.teamId };
  });
