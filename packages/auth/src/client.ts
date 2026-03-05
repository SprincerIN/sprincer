/**
 * BetterAuth client — for server-side session access in apps/web-bff.
 *
 * This is NOT the browser client. It is used in SSR / server routes
 * to validate sessions forwarded from web-bff.
 */
import { createAuthClient } from "better-auth/client";
import {
  organizationClient,
  twoFactorClient,
  adminClient,
  apiKeyClient,
  usernameClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env["BETTER_AUTH_URL"] ?? "http://localhost:3000",
  plugins: [
    organizationClient(),
    twoFactorClient(),
    adminClient(),
    apiKeyClient(),
    usernameClient(),
  ],
});

export type AuthClient = typeof authClient;
