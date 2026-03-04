import { signalStore, withState, withComputed, withMethods, patchState } from "@ngrx/signals";
import { computed } from "@angular/core";

export interface ExampleState {
    items: string[];
    loading: boolean;
}

const initialState: ExampleState = {
    items: [],
    loading: false,
};

export const ExampleStore = signalStore(
    { providedIn: "root" },
    withState(initialState),
    withComputed(({ items }) => ({
        count: computed(() => items().length),
    })),
    withMethods((store) => ({
        addItem(item: string) {
            patchState(store, (state) => ({ items: [...state.items, item] }));
        },
        clear() {
            patchState(store, { items: [] });
        },
    }))
);
