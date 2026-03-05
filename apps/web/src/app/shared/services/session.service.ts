import { Injectable, signal, computed, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
}

export interface Session {
  user: SessionUser;
  expiresAt: string;
}

@Injectable({ providedIn: "root" })
export class SessionService {
  private readonly http = inject(HttpClient);

  private readonly _session = signal<Session | null>(null);
  private readonly _loading = signal(false);

  readonly session = this._session.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._session() !== null);
  readonly user = computed(() => this._session()?.user ?? null);

  async loadSession(): Promise<void> {
    this._loading.set(true);
    try {
      const result = await firstValueFrom(
        this.http.get<{ session: Session | null }>("/api/v1/auth/session", {
          withCredentials: true,
        }),
      );
      this._session.set(result.session);
    } catch {
      this._session.set(null);
    } finally {
      this._loading.set(false);
    }
  }

  clearSession(): void {
    this._session.set(null);
  }
}
