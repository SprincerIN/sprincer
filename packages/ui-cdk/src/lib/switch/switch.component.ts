// packages/ui-cdk/src/lib/switch/switch.component.ts
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "sp-switch",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <button
      role="switch"
      type="button"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      [class]="trackClasses()"
      (click)="checkedChange.emit(!checked())"
    >
      <span [class]="thumbClasses()"></span>
    </button>
  `,
})
export class SpSwitchComponent {
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly class = input<string>("");

  readonly checkedChange = output<boolean>();

  trackClasses() {
    const base = "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50";
    const state = this.checked()
      ? "bg-[var(--color-brand-600)]"
      : "bg-[var(--color-surface-overlay)]";
    return twMerge(base, state, this.class());
  }

  thumbClasses() {
    const base = "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform";
    return twMerge(base, this.checked() ? "translate-x-4" : "translate-x-0");
  }
}
