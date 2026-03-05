// packages/ui-cdk/src/lib/textarea/textarea.component.ts
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "sp-textarea",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <textarea
      [placeholder]="placeholder()"
      [rows]="rows()"
      [disabled]="disabled()"
      [class]="classes()"
      (input)="valueChange.emit($any($event.target).value)"
    >{{ value() }}</textarea>
  `,
})
export class SpTextareaComponent {
  readonly placeholder = input<string>("");
  readonly rows = input<number>(3);
  readonly value = input<string>("");
  readonly disabled = input<boolean>(false);
  readonly class = input<string>("");

  readonly valueChange = output<string>();

  classes() {
    const base = "flex min-h-[60px] w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm shadow-sm placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50 resize-y";
    return twMerge(base, this.class());
  }
}
