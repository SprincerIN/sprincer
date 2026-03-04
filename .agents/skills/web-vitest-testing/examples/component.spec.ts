import { ComponentFixture, TestBed } from "@angular/core/testing";
import { signal } from "@angular/core";
import { MockComponent, MockProvider } from "@lib/ng-vitest-mocks";
import { ExampleComponent } from "./example.component";
import { ChildComponent } from "./child.component";
import { ExampleService } from "./example.service";

describe("ExampleComponent", () => {
    let component: ExampleComponent;
    let fixture: ComponentFixture<ExampleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ExampleComponent,
                MockComponent(ChildComponent), // Mock external components
            ],
            providers: [
                MockProvider(ExampleService), // Mock services
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ExampleComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should handle Signal inputs", () => {
        // Correct way to set Signal inputs in tests
        const labelSig = signal("Test Label");
        Object.defineProperty(component, "label", { value: labelSig });
        
        fixture.detectChanges();
        
        const compiled = fixture.nativeElement;
        expect(compiled.textContent).toContain("Test Label");
    });
    
    it("should emit output when clicked", () => {
        const spy = vi.spyOn(component.clicked, "emit");
        
        const element = fixture.nativeElement.querySelector(".clickable");
        element.click();
        
        expect(spy).toHaveBeenCalled();
    });
});
