import { randomBytes } from "crypto";

/**
 * Generates a URL-safe base62 ID suitable for primary keys.
 * Uses crypto.randomBytes for cryptographic randomness.
 */
export function createId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(16);
  let result = "";
  for (const byte of bytes) {
    result += chars[byte % chars.length];
  }
  return result;
}
