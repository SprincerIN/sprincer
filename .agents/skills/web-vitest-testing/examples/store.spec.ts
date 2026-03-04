import { TestBed } from "@angular/core/testing";
import { ExampleStore } from "./example.store";

describe("ExampleStore", () => {
    let store: InstanceType<typeof ExampleStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExampleStore],
        });
        store = TestBed.inject(ExampleStore);
    });

    it("should have initial state", () => {
        expect(store.items()).toEqual([]);
        expect(store.loading()).toBe(false);
    });

    it("should add item and update count", () => {
        store.addItem("Test");
        expect(store.items()).toContain("Test");
        expect(store.count()).toBe(1);
    });

    it("should clear items", () => {
        store.addItem("Test");
        store.clear();
        expect(store.items()).toEqual([]);
    });
});
