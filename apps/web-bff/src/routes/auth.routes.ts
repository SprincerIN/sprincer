import { Elysia } from "elysia";
import { CoreApiClient } from "@sprincer/types/eden";

const coreApi = CoreApiClient(process.env["CORE_API_URL"] ?? "http://localhost:3000");

export const authRoutes = new Elysia({ prefix: "/api/v1/auth" })
  .get("/session", async ({ cookie, set }) => {
    // Proxy session check to core-api
    // TODO: Forward session cookie, return user + session info
    return { session: null };
  })
  .post("/sign-out", async ({ cookie, set }) => {
    // TODO: Clear BetterAuth session cookie via core-api
    return { success: true };
  });
