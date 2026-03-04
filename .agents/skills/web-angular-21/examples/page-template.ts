import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
    selector: "bd-example-page",
    standalone: true,
    imports: [],
    template: `
        <div class="p-4">
            <h1 class="text-2xl font-bold">{{ title() }}</h1>
            <p>Page content goes here.</p>
        </div>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExamplePage {
    protected readonly title = signal("Example Page");
}
