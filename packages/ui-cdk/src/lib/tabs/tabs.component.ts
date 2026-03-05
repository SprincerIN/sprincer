// packages/ui-cdk/src/lib/tabs/tabs.component.ts
import { ChangeDetectionStrategy, Component, input, output, signal, OnInit, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

export interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: "sp-tabs",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="class()">
      <!-- Tab List -->
      <div class="flex border-b border-[var(--color-border)]" role="tablist">
        @for (tab of items(); track tab.value) {
          <button
            role="tab"
            type="button"
            [attr.aria-selected]="activeTab() === tab.value"
            [disabled]="tab.disabled ?? false"
            [class]="tabClasses(tab.value)"
            (click)="selectTab(tab.value)"
          >
            {{ tab.label }}
          </button>
        }
      </div>
      <!-- Panel -->
      <ng-content />
    </div>
  `,
})
export class SpTabsComponent {
  readonly items = input<TabItem[]>([]);
  readonly defaultTab = input<string>("");
  readonly class = input<string>("");

  readonly activeTab = signal<string>("");
  readonly activeTabChange = output<string>();

  constructor() {
    effect(() => {
      const tabs = this.items();
      const def = this.defaultTab();
      if (!this.activeTab() && tabs.length > 0) {
        this.activeTab.set(def || tabs[0].value);
      }
    });
  }

  selectTab(value: string) {
    this.activeTab.set(value);
    this.activeTabChange.emit(value);
  }

  tabClasses(value: string) {
    const base = "px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 -mb-px border-b-2";
    const active = this.activeTab() === value
      ? "border-[var(--color-brand-600)] text-[var(--color-brand-600)]"
      : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]";
    return twMerge(base, active);
  }
}
