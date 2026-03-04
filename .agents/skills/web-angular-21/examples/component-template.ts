import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";

@Component({
    selector: "bd-example-component",
    standalone: true,
    imports: [],
    template: `
        <div class="rounded-lg border p-4 shadow-sm" (click)="clicked.emit()">
            <h3 class="font-medium">{{ label() }}</h3>
        </div>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
    readonly label = input.required<string>();
    readonly clicked = output<void>();
}
