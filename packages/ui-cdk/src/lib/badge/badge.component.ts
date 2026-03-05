// packages/ui-cdk/src/lib/badge/badge.component.ts
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

@Component({
  selector: "sp-badge",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <span [class]="classes()">
      <ng-content />
    </span>
  `,
})
export class SpBadgeComponent {
  readonly variant = input<BadgeVariant>("default");
  readonly class = input<string>("");

  classes() {
    const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
    const variants: Record<BadgeVariant, string> = {
      default: "border-transparent bg-[var(--color-brand-600)] text-white",
      secondary: "border-transparent bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)]",
      destructive: "border-transparent bg-[var(--color-error)] text-white",
      outline: "border-[var(--color-border)] text-[var(--color-text-primary)]",
    };
    return twMerge(base, variants[this.variant()], this.class());
  }
}
