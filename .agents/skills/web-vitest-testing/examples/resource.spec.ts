import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideQueryClient, QueryClient } from "@tanstack/angular-query-experimental";
import { useExampleQuery } from "./example.resource";

describe("Example Resource", () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideQueryClient(new QueryClient()),
            ],
        });
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should fetch examples", async () => {
        const query = TestBed.runInInjectionContext(() => useExampleQuery());
        
        // Wait for effect to trigger fetch or manually trigger
        // In TanStack Query testing, we check the HTTP request
        
        const req = httpMock.expectOne("/api/examples");
        expect(req.request.method).toBe("GET");
        req.flush([{ id: "1", title: "Test" }]);
        
        // Assertions on query.data() would follow
    });
});
