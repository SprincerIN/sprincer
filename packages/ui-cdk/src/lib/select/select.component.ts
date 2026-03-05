// packages/ui-cdk/src/lib/select/select.component.ts
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: "sp-select",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <select
      [class]="classes()"
      [disabled]="disabled()"
      (change)="valueChange.emit($any($event.target).value)"
    >
      @if (placeholder()) {
        <option value="" disabled selected>{{ placeholder() }}</option>
      }
      @for (option of options(); track option.value) {
        <option [value]="option.value" [disabled]="option.disabled ?? false">
          {{ option.label }}
        </option>
      }
    </select>
  `,
})
export class SpSelectComponent {
  readonly placeholder = input<string>("");
  readonly options = input<SelectOption[]>([]);
  readonly value = input<string>("");
  readonly disabled = input<boolean>(false);
  readonly class = input<string>("");

  readonly valueChange = output<string>();

  classes() {
    const base = "flex h-9 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50";
    return twMerge(base, this.class());
  }
}
