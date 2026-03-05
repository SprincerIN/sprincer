import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "sp-workspace-layout",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `
    <div class="flex h-screen bg-[var(--color-surface)]">
      <!-- Sidebar — implemented in Phase 1 -->
      <aside class="w-60 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        <div class="p-4 text-sm text-[var(--color-text-secondary)]">Sidebar — Phase 1</div>
      </aside>
      <!-- Main content -->
      <main class="flex-1 overflow-auto">
        <router-outlet />
      </main>
    </div>
  `,
})
export class WorkspaceLayoutComponent {}
