import { Elysia } from "elysia";

/**
 * WebSocket gateway — real-time event fan-out.
 *
 * Receives events from core-api PgListener and fans out to subscribed
 * web clients filtered by workspace membership.
 *
 * Phase 0: stub — full implementation in Phase 2 when pg LISTEN is live.
 */
export const wsGateway = new Elysia()
  .ws("/ws", {
    open(ws) {
      // TODO: Authenticate connection via session cookie
      // TODO: Subscribe to workspace-scoped events from PgListener
      console.log(`[ws] Client connected: ${ws.id}`);
    },
    message(ws, message) {
      // TODO: Handle client messages (subscriptions, pings)
      console.log(`[ws] Message from ${ws.id}:`, message);
    },
    close(ws) {
      // TODO: Unsubscribe from events
      console.log(`[ws] Client disconnected: ${ws.id}`);
    },
  });
