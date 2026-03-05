// packages/ui-cdk/src/lib/input/input.component.ts
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

export type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search";

@Component({
  selector: "sp-input",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <input
      [type]="type()"
      [placeholder]="placeholder()"
      [value]="value()"
      [disabled]="disabled()"
      [class]="classes()"
      (input)="valueChange.emit($any($event.target).value)"
    />
  `,
})
export class SpInputComponent {
  readonly type = input<InputType>("text");
  readonly placeholder = input<string>("");
  readonly value = input<string>("");
  readonly disabled = input<boolean>(false);
  readonly class = input<string>("");

  readonly valueChange = output<string>();

  classes() {
    const base = "flex h-9 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50";
    return twMerge(base, this.class());
  }
}
