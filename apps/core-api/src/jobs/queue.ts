import { Queue, Worker } from "bullmq";

const connection = {
  url: process.env["REDIS_URL"] ?? "redis://localhost:6379",
};

/**
 * VCS event processing queue — receives normalised webhook events from providers.
 */
export const vcsEventQueue = new Queue("vcs-events", { connection });

/**
 * Notification queue — async email/in-app notifications.
 */
export const notificationQueue = new Queue("notifications", { connection });

/**
 * Search indexing queue — async Meilisearch document indexing.
 */
export const searchIndexQueue = new Queue("search-index", { connection });

// TODO: Register workers in apps/core-api startup
export type { Worker };
