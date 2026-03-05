import { Routes } from "@angular/router";
import { authGuard } from "./shared/guards/auth.guard";
import { workspaceGuard } from "./shared/guards/workspace.guard";

export const routes: Routes = [
  // Auth routes — unauthenticated access
  {
    path: "login",
    loadComponent: () =>
      import("./pages/auth/login/login.page").then((m) => m.LoginPage),
  },
  {
    path: "signup",
    loadComponent: () =>
      import("./pages/auth/signup/signup.page").then((m) => m.SignupPage),
  },
  {
    // OAuth callback — loads session then redirects to workspace
    path: "auth/callback",
    loadComponent: () =>
      import("./pages/auth/callback/callback.page").then((m) => m.CallbackPage),
  },

  // Workspace routes — require auth + workspace membership
  {
    path: ":workspaceSlug",
    canActivate: [authGuard, workspaceGuard],
    loadComponent: () =>
      import("./pages/workspace/layout/workspace-layout.component").then(
        (m) => m.WorkspaceLayoutComponent,
      ),
    children: [
      {
        path: "",
        redirectTo: "inbox",
        pathMatch: "full",
      },
      {
        path: "inbox",
        loadComponent: () =>
          import("./pages/workspace/inbox/inbox.page").then((m) => m.InboxPage),
      },
    ],
  },

  // Default redirect
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },

  // 404
  {
    path: "**",
    redirectTo: "login",
  },
];
