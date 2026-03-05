import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { auth } from "@sprincer/auth";
import { authRoutes } from "./routes/auth.routes";
import { workspacesRoutes } from "./routes/workspaces.routes";
import { teamsRoutes } from "./routes/teams.routes";
import { issuesRoutes } from "./routes/issues.routes";
import { wikiRoutes } from "./routes/wiki.routes";
import { vcsRoutes } from "./routes/vcs.routes";
import { searchRoutes } from "./routes/search.routes";
import { analyticsRoutes } from "./routes/analytics.routes";
import { agentRoutes } from "./routes/agent.routes";

const PORT = Number(process.env["CORE_API_PORT"] ?? 3000);

const app = new Elysia()
  // Internal service — CORS restricted to web-bff only
  .use(
    cors({
      origin: process.env["WEB_BFF_URL"] ?? "http://localhost:3001",
      credentials: true,
    }),
  )

  // OpenAPI docs — internal only
  .use(
    swagger({
      path: "/internal/swagger",
      documentation: {
        info: { title: "Sprincer Core API", version: "0.1.0" },
      },
    }),
  )

  // Health check
  .get("/health", () => ({ status: "ok", service: "core-api" }))

  // BetterAuth handler — mounts /auth routes
  .all("/auth/*", ({ request }) => auth.handler(request))

  // Domain routes — all prefixed /internal/v1
  .use(authRoutes)
  .use(workspacesRoutes)
  .use(teamsRoutes)
  .use(issuesRoutes)
  .use(wikiRoutes)
  .use(vcsRoutes)
  .use(searchRoutes)
  .use(analyticsRoutes)
  .use(agentRoutes)

  .listen(PORT);

console.log(`core-api running on http://localhost:${PORT}`);
console.log(`Swagger UI: http://localhost:${PORT}/internal/swagger`);

export type CoreApp = typeof app;
