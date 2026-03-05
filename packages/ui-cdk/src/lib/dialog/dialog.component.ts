// packages/ui-cdk/src/lib/dialog/dialog.component.ts
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "sp-dialog",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50"
          (click)="openChange.emit(false)"
        ></div>
        <!-- Panel -->
        <div [class]="panelClasses()">
          @if (title()) {
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[var(--color-text-primary)]">{{ title() }}</h2>
              <button
                class="rounded p-1 hover:bg-[var(--color-surface-overlay)]"
                (click)="openChange.emit(false)"
                aria-label="Close"
              >&#x2715;</button>
            </div>
          }
          <ng-content />
        </div>
      </div>
    }
  `,
})
export class SpDialogComponent {
  readonly open = input<boolean>(false);
  readonly title = input<string>("");
  readonly class = input<string>("");

  readonly openChange = output<boolean>();

  panelClasses() {
    const base = "relative z-10 w-full max-w-lg rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl";
    return twMerge(base, this.class());
  }
}
