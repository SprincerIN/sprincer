// packages/ui-cdk/src/lib/table/table.component.ts
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

@Component({
  selector: "sp-table",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="wrapperClasses()">
      <table class="w-full caption-bottom text-sm">
        <thead class="border-b border-[var(--color-border)]">
          <tr>
            @for (col of columns(); track col.key) {
              <th
                [style.width]="col.width ?? 'auto'"
                class="h-10 px-4 text-left align-middle font-medium text-[var(--color-text-secondary)]"
              >
                {{ col.header }}
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track $index) {
            <tr class="border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface-overlay)]">
              @for (col of columns(); track col.key) {
                <td class="px-4 py-3 align-middle text-[var(--color-text-primary)]">
                  {{ row[col.key] }}
                </td>
              }
            </tr>
          } @empty {
            <tr>
              <td
                [attr.colspan]="columns().length"
                class="px-4 py-8 text-center text-[var(--color-text-muted)]"
              >
                No data available.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class SpTableComponent {
  readonly columns = input<TableColumn[]>([]);
  readonly rows = input<Record<string, unknown>[]>([]);
  readonly class = input<string>("");

  wrapperClasses() {
    const base = "w-full overflow-auto rounded-md border border-[var(--color-border)]";
    return twMerge(base, this.class());
  }
}
