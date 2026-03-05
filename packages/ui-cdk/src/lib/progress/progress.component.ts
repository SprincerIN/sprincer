// packages/ui-cdk/src/lib/progress/progress.component.ts
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "sp-progress",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div
      role="progressbar"
      [attr.aria-valuenow]="value()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="100"
      [class]="trackClasses()"
    >
      <div
        class="h-full rounded-full bg-[var(--color-brand-600)] transition-all duration-300"
        [style.width.%]="clamped()"
      ></div>
    </div>
  `,
})
export class SpProgressComponent {
  readonly value = input<number>(0);
  readonly class = input<string>("");

  readonly clamped = computed(() => Math.min(100, Math.max(0, this.value())));

  trackClasses() {
    const base = "relative h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-overlay)]";
    return twMerge(base, this.class());
  }
}
