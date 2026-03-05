import {
  ApplicationConfig,
  isDevMode,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter, withComponentInputBinding, withViewTransitions } from "@angular/router";
import { provideHttpClient, withFetch } from "@angular/common/http";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideServiceWorker } from "@angular/service-worker";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    // Zoneless change detection — no Zone.js
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    // Hydration: replay DOM events that fire before the client bootstraps
    provideClientHydration(withEventReplay()),
    // Service worker — only active in production builds (ngsw-worker.js not emitted in dev)
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
};
