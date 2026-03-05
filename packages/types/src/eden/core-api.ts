import { edenTreaty } from "@elysiajs/eden";
import type { CoreApp } from "@sprincer/core-api";

/**
 * Type-safe Eden Treaty client for apps/core-api.
 *
 * Used by apps/web-bff to call core-api with full type inference.
 * Never exposed to apps/web — the BFF owns this client.
 *
 * Usage in web-bff:
 *   import { CoreApiClient } from '@sprincer/types/eden';
 *   const client = CoreApiClient('http://localhost:3000');
 *   const result = await client.internal.v1.issues.get();
 */
export const CoreApiClient = (baseUrl: string = "http://localhost:3000") =>
  edenTreaty<CoreApp>(baseUrl);

export type CoreApiClientType = ReturnType<typeof CoreApiClient>;
