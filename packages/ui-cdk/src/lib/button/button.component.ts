// packages/ui-cdk/src/lib/button/button.component.ts
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "default" | "destructive" | "outline" | "ghost" | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

@Component({
  selector: "sp-button",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <button [class]="classes()" [disabled]="disabled()">
      <ng-content />
    </button>
  `,
})
export class SpButtonComponent {
  readonly variant = input<ButtonVariant>("default");
  readonly size = input<ButtonSize>("default");
  readonly disabled = input<boolean>(false);
  readonly class = input<string>("");

  classes() {
    const base = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
    const variants: Record<ButtonVariant, string> = {
      default: "bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-700)]",
      destructive: "bg-[var(--color-error)] text-white hover:opacity-90",
      outline: "border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-surface-overlay)]",
      ghost: "hover:bg-[var(--color-surface-overlay)]",
      link: "text-[var(--color-brand-600)] underline-offset-4 hover:underline",
    };
    const sizes: Record<ButtonSize, string> = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded px-3 text-xs",
      lg: "h-10 px-8",
      icon: "h-9 w-9",
    };
    return twMerge(base, variants[this.variant()], sizes[this.size()], this.class());
  }
}
