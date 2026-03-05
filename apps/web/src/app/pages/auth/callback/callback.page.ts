import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { SessionService } from "@services/session.service";

@Component({
  selector: "sp-callback-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex h-screen items-center justify-center bg-[var(--color-surface)]">
      <p class="text-sm text-[var(--color-text-secondary)]">Signing in…</p>
    </div>
  `,
})
export class CallbackPage implements OnInit {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly sessionService = inject(SessionService);

  async ngOnInit(): Promise<void> {
    await this.sessionService.loadSession();
    if (!this.sessionService.isAuthenticated()) {
      await this.router.navigate(["/login"]);
      return;
    }
    try {
      const workspaces = await firstValueFrom(
        this.http.get<{ slug: string }[]>("/api/v1/workspaces", { withCredentials: true }),
      );
      const slug = workspaces[0]?.slug;
      await this.router.navigate(slug ? ["/" + slug] : ["/login"]);
    } catch {
      await this.router.navigate(["/login"]);
    }
  }
}
