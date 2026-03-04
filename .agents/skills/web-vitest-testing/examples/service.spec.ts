import { TestBed } from "@angular/core/testing";
import { ExampleService } from "./example.service";

describe("ExampleService", () => {
    let service: ExampleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExampleService],
        });
        service = TestBed.inject(ExampleService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should update items signal", () => {
        service.addItem("New Item");
        expect(service.items()).toContain("New Item");
    });

    it("should have a derived count signal", () => {
        service.addItem("Item 1");
        service.addItem("Item 2");
        expect(service.count()).toBe(2);
    });
});
