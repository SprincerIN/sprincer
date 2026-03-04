import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { injectQuery, injectMutation, QueryClient } from "@tanstack/angular-query-experimental";
import { lastValueFrom } from "rxjs";

export interface Example {
    id: string;
    title: string;
}

export function useExampleQuery() {
    const http = inject(HttpClient);

    return injectQuery(() => ({
        queryKey: ["examples"],
        queryFn: () => lastValueFrom(http.get<Example[]>("/api/examples")),
        staleTime: 1000 * 60 * 5, // 5 minutes
    }));
}

export function useCreateExampleMutation() {
    const http = inject(HttpClient);
    const queryClient = inject(QueryClient);

    return injectMutation(() => ({
        mutationFn: (data: Partial<Example>) => 
            lastValueFrom(http.post<Example>("/api/examples", data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["examples"] });
        },
    }));
}
