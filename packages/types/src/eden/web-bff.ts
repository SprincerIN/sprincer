import { edenTreaty } from "@elysiajs/eden";
import type { WebBffApp } from "@sprincer/web-bff";

/**
 * Type-safe Eden Treaty client for apps/web-bff.
 *
 * Used by apps/web to call web-bff with full type inference.
 * This is the only API client apps/web ever uses.
 *
 * Usage in Angular services:
 *   import { WebBffClient } from '@sprincer/types/eden';
 *   const api = WebBffClient('http://localhost:3001');
 *   const { data } = await api.api.v1.issues.get();
 */
export const WebBffClient = (baseUrl: string = "http://localhost:3001") =>
  edenTreaty<WebBffApp>(baseUrl);

export type WebBffClientType = ReturnType<typeof WebBffClient>;
