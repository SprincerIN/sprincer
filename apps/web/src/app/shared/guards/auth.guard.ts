import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SessionService } from "../services/session.service";

export const authGuard: CanActivateFn = async () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  // Load session if not yet loaded
  if (!sessionService.isAuthenticated() && !sessionService.loading()) {
    await sessionService.loadSession();
  }

  if (sessionService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(["/login"]);
};
