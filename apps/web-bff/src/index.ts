import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authRoutes } from "./routes/auth.routes";
import { workspacesRoutes } from "./routes/workspaces.routes";
import { teamsRoutes } from "./routes/teams.routes";
import { issuesRoutes } from "./routes/issues.routes";
import { wsGateway } from "./ws/gateway";

const PORT = Number(process.env["WEB_BFF_PORT"] ?? 3001);

const app = new Elysia()
  // Internet-facing — allow web app origin
  .use(
    cors({
      origin: process.env["CORS_ORIGIN"] ?? "http://localhost:3200",
      credentials: true,
    }),
  )

  // Health check
  .get("/health", () => ({ status: "ok", service: "web-bff" }))

  // API routes — all prefixed /api/v1
  .use(authRoutes)
  .use(workspacesRoutes)
  .use(teamsRoutes)
  .use(issuesRoutes)

  // WebSocket gateway — real-time event fan-out
  .use(wsGateway)

  .listen(PORT);

console.log(`web-bff running on http://localhost:${PORT}`);

export type WebBffApp = typeof app;
