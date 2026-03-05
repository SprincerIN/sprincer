// packages/ui-cdk/src/lib/checkbox/checkbox.component.ts
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "sp-checkbox",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <label [class]="wrapperClasses()">
      <input
        type="checkbox"
        [checked]="checked()"
        [disabled]="disabled()"
        [class]="checkboxClasses()"
        (change)="checkedChange.emit($any($event.target).checked)"
      />
      @if (label()) {
        <span class="text-sm font-medium leading-none text-[var(--color-text-primary)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {{ label() }}
        </span>
      }
    </label>
  `,
})
export class SpCheckboxComponent {
  readonly checked = input<boolean>(false);
  readonly label = input<string>("");
  readonly disabled = input<boolean>(false);
  readonly class = input<string>("");

  readonly checkedChange = output<boolean>();

  wrapperClasses() {
    return twMerge("flex items-center gap-2 cursor-pointer", this.disabled() ? "opacity-50 cursor-not-allowed" : "", this.class());
  }

  checkboxClasses() {
    return "h-4 w-4 rounded border border-[var(--color-border)] accent-[var(--color-brand-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]";
  }
}
