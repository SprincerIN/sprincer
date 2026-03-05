import { inject } from "@angular/core";
import { CanActivateFn, Router, ActivatedRouteSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

export const workspaceGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  const slug = route.paramMap.get("workspaceSlug");
  if (!slug) return router.createUrlTree(["/"]);

  try {
    await firstValueFrom(
      http.get(`/api/v1/workspaces/${slug}`, { withCredentials: true }),
    );
    return true;
  } catch {
    // Not a member of this workspace or workspace doesn't exist
    return router.createUrlTree(["/"]);
  }
};
