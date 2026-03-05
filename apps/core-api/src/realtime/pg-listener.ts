/**
 * PostgreSQL LISTEN/NOTIFY listener.
 *
 * Listens to the `sprincer_events` channel.
 * Parsed events are forwarded to connected WebSocket clients via web-bff.
 *
 * Phase 0: stub — wire up pg LISTEN in Phase 1 when real-time events are needed.
 */

export interface SprincerEvent {
  type: string;
  payload: unknown;
  workspaceId: string;
  teamId?: string;
}

export class PgListener {
  private started = false;

  start() {
    if (this.started) return;
    this.started = true;
    // TODO: Connect to Postgres and LISTEN on 'sprincer_events'
    // const client = new postgres(process.env.DATABASE_URL);
    // await client.listen('sprincer_events', (payload) => this.onEvent(payload));
    console.log("[realtime] PgListener stub — not connected");
  }

  private onEvent(_payload: string) {
    // TODO: Parse payload and emit to WebSocket gateway in web-bff
  }

  stop() {
    this.started = false;
  }
}

export const pgListener = new PgListener();
