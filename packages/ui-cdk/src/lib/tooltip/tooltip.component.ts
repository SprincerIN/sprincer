// packages/ui-cdk/src/lib/tooltip/tooltip.component.ts
import { ChangeDetectionStrategy, Component, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

@Component({
  selector: "sp-tooltip",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <span
      class="relative inline-flex"
      (mouseenter)="visible.set(true)"
      (mouseleave)="visible.set(false)"
    >
      <ng-content />
      @if (visible() && content()) {
        <span [class]="tooltipClasses()">
          {{ content() }}
        </span>
      }
    </span>
  `,
})
export class SpTooltipComponent {
  readonly content = input<string>("");
  readonly position = input<TooltipPosition>("top");
  readonly class = input<string>("");

  readonly visible = signal(false);

  tooltipClasses() {
    const base = "absolute z-50 whitespace-nowrap rounded-md bg-[var(--color-surface-inverse)] px-3 py-1.5 text-xs text-[var(--color-text-inverse)] shadow-md pointer-events-none";
    const positions: Record<TooltipPosition, string> = {
      top: "bottom-full left-1/2 mb-1 -translate-x-1/2",
      bottom: "top-full left-1/2 mt-1 -translate-x-1/2",
      left: "right-full top-1/2 mr-1 -translate-y-1/2",
      right: "left-full top-1/2 ml-1 -translate-y-1/2",
    };
    return twMerge(base, positions[this.position()], this.class());
  }
}
