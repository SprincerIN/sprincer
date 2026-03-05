// packages/ui-cdk/src/lib/card/card.component.ts
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "sp-card",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
})
export class SpCardComponent {
  readonly class = input<string>("");

  classes() {
    const base = "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm";
    return twMerge(base, this.class());
  }
}
