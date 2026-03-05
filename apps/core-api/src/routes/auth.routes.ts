import { Elysia } from "elysia";

export const authRoutes = new Elysia({ prefix: "/internal/v1/auth" })
  .get("/session", () => {
    // TODO: Return current session info
    return { session: null };
  });
