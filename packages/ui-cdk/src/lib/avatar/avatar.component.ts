// packages/ui-cdk/src/lib/avatar/avatar.component.ts
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

export type AvatarSize = "sm" | "default" | "lg";

@Component({
  selector: "sp-avatar",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <span [class]="wrapperClasses()">
      @if (src()) {
        <img
          [src]="src()"
          [alt]="fallback()"
          class="h-full w-full rounded-full object-cover"
          (error)="imgError = true"
        />
      } @else {
        <span class="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)] font-medium select-none">
          {{ fallback() }}
        </span>
      }
    </span>
  `,
})
export class SpAvatarComponent {
  readonly src = input<string>("");
  readonly fallback = input<string>("");
  readonly size = input<AvatarSize>("default");
  readonly class = input<string>("");

  imgError = false;

  wrapperClasses() {
    const base = "relative inline-flex shrink-0 overflow-hidden rounded-full";
    const sizes: Record<AvatarSize, string> = {
      sm: "h-6 w-6 text-xs",
      default: "h-9 w-9 text-sm",
      lg: "h-12 w-12 text-base",
    };
    return twMerge(base, sizes[this.size()], this.class());
  }
}
