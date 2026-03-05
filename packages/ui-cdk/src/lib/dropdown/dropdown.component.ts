// packages/ui-cdk/src/lib/dropdown/dropdown.component.ts
import { ChangeDetectionStrategy, Component, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "sp-dropdown",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      <!-- Trigger -->
      <div (click)="open.set(!open())">
        <ng-content select="[slot=trigger]" />
      </div>

      <!-- Menu -->
      @if (open()) {
        <div
          [class]="menuClasses()"
          (clickOutside)="open.set(false)"
        >
          <ng-content select="[slot=items]" />
        </div>
      }
    </div>
  `,
})
export class SpDropdownComponent {
  readonly align = input<"start" | "end">("start");
  readonly class = input<string>("");

  readonly open = signal(false);

  menuClasses() {
    const base = "absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-md";
    const alignment = this.align() === "end" ? "right-0" : "left-0";
    return twMerge(base, alignment, this.class());
  }
}
