import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "sp-inbox-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6">
      <h1 class="text-xl font-semibold text-[var(--color-text-primary)]">Inbox</h1>
      <p class="mt-2 text-sm text-[var(--color-text-secondary)]">Workspace inbox — Phase 1</p>
    </div>
  `,
})
export class InboxPage {}
