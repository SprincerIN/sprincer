import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  oAuthProvider,
  jwt,
  bearer,
  oneTimeToken,
  twoFactor,
  organization,
  admin,
  apiKey,
  emailOtp,
  username,
} from "better-auth/plugins";
import { db } from "@sprincer/db";

const env = process.env;

/**
 * BetterAuth instance — 10-plugin stack.
 *
 * All routes are mounted under /auth in apps/core-api.
 * This package is server-only — never imported by apps/web.
 */
export const auth = betterAuth({
  /**
   * Drizzle adapter — BetterAuth manages its own auth tables
   * (user, session, account, verification) separate from the app schema.
   */
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  baseURL: env["BETTER_AUTH_URL"] ?? "http://localhost:3000",
  secret: env["BETTER_AUTH_SECRET"] ?? "change-me",

  /**
   * Social OAuth providers — auth scope only.
   * VCS operations (repo access) use separate OAuth apps.
   */
  socialProviders: {
    ...(env["GOOGLE_CLIENT_ID"] && env["GOOGLE_CLIENT_SECRET"]
      ? {
          google: {
            clientId: env["GOOGLE_CLIENT_ID"],
            clientSecret: env["GOOGLE_CLIENT_SECRET"],
            scope: ["openid", "email", "profile"],
          },
        }
      : {}),
    ...(env["GITHUB_CLIENT_ID"] && env["GITHUB_CLIENT_SECRET"]
      ? {
          github: {
            clientId: env["GITHUB_CLIENT_ID"],
            clientSecret: env["GITHUB_CLIENT_SECRET"],
            scope: ["read:user", "user:email"],
          },
        }
      : {}),
    ...(env["GITLAB_CLIENT_ID"] && env["GITLAB_CLIENT_SECRET"]
      ? {
          gitlab: {
            clientId: env["GITLAB_CLIENT_ID"],
            clientSecret: env["GITLAB_CLIENT_SECRET"],
            scope: ["read_user", "email"],
          },
        }
      : {}),
  },

  plugins: [
    /**
     * 1. OAuth 2.1 / OIDC server — MCP-compatible.
     * Allows Sprincer to act as an OAuth provider for MCP clients.
     * Uses oAuthProvider (not deprecated mcp()).
     */
    oAuthProvider({
      loginPage: "/login",
    }),

    /**
     * 2. JWT — ES256 signing + JWKS endpoint.
     * Smaller tokens than RS256, faster verification.
     */
    jwt({
      jwks: {
        keyPairConfig: {
          alg: "ES256",
        },
      },
    }),

    /**
     * 3. Bearer — token auth for API/CLI clients.
     */
    bearer(),

    /**
     * 4. One-time tokens — short-lived tokens for invites + agent flows.
     */
    oneTimeToken(),

    /**
     * 5. Two-factor — TOTP 2FA with backup codes.
     */
    twoFactor(),

    /**
     * 6. Organization — single-org (OSS) / multi-org (cloud) tenancy.
     * In OSS mode: one fixed organization (the workspace).
     * In cloud mode: one organization per customer tenant.
     * The application layer has no conditional logic — cardinality is runtime.
     */
    organization({
      allowUserToCreateOrganization: false,
    }),

    /**
     * 7. Admin — instance-level user management + impersonation.
     */
    admin(),

    /**
     * 8. API keys — workspace-scoped keys with sprincer_live_ prefix.
     */
    apiKey({
      prefix: "sprincer_live_",
    }),

    /**
     * 9. Email OTP — 6-digit passwordless sign-in.
     */
    emailOtp({
      async sendVerificationOTP({ email, otp }) {
        // TODO: Implement via Resend in apps/core-api email service
        console.log(`[auth] Email OTP for ${email}: ${otp}`);
      },
    }),

    /**
     * 10. Username — adds username field to user model for @mentions.
     */
    username(),
  ],
});

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session;
