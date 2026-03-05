import type { Context } from "elysia";

/**
 * Session middleware — validates BetterAuth session cookie.
 *
 * Verifies the session via core-api /auth/session before forwarding requests.
 * Attaches the internal service token for core-api authorization.
 *
 * Phase 0: stub — full validation wired in Phase 1 when auth endpoints are live.
 */
export async function validateSession(ctx: Context) {
  const sessionCookie = ctx.cookie["better-auth.session_token"]?.value;

  if (!sessionCookie) {
    ctx.set.status = 401;
    return { error: "Unauthorized" };
  }

  // TODO: Call core-api /auth/session to validate the session
  // Forward INTERNAL_SERVICE_TOKEN header to core-api
}

export function internalServiceToken(): Record<string, string> {
  return {
    "x-internal-token": process.env["INTERNAL_SERVICE_TOKEN"] ?? "",
  };
}
