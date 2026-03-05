import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { SessionService } from "@services/session.service";

type SignupStep = "credentials" | "workspace";

function slugValidator(control: AbstractControl): ValidationErrors | null {
  const val = control.value as string;
  if (!val) return null;
  return /^[a-z0-9-]+$/.test(val) ? null : { invalidSlug: true };
}

@Component({
  selector: "sp-signup-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-[var(--color-surface)] px-4">
      <div class="w-full max-w-sm space-y-6">

        @if (step() === 'credentials') {
          <!-- Title -->
          <div class="space-y-1 text-center">
            <h1 class="text-2xl font-semibold text-[var(--color-text-primary)]">
              Create your account
            </h1>
            <p class="text-sm text-[var(--color-text-secondary)]">
              Already have an account?
              <a routerLink="/login" class="text-[var(--color-brand-600)] hover:underline">
                Sign in
              </a>
            </p>
          </div>

          <!-- OAuth buttons -->
          <div class="space-y-2">
            <button (click)="signUpWithOAuth('google')" type="button" class="btn-oauth">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button (click)="signUpWithOAuth('github')" type="button" class="btn-oauth">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              Continue with GitHub
            </button>
            <button (click)="signUpWithOAuth('gitlab')" type="button" class="btn-oauth">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z" fill="#E24329"/>
              </svg>
              Continue with GitLab
            </button>
          </div>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[var(--color-border)]"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="bg-[var(--color-surface)] px-2 text-[var(--color-text-muted)]">or sign up with email</span>
            </div>
          </div>

          <!-- Credentials form -->
          <form [formGroup]="credentialsForm" (ngSubmit)="signUp()" class="space-y-4">
            @if (error()) {
              <p class="rounded-md bg-[var(--color-error-subtle)] px-3 py-2 text-sm text-[var(--color-error)]">
                {{ error() }}
              </p>
            }
            <div class="space-y-1">
              <label class="label">Username</label>
              <input
                formControlName="username"
                type="text"
                placeholder="jane-doe"
                autocomplete="username"
                class="sp-input"
              />
              @if (credentialsForm.get('username')?.touched && credentialsForm.get('username')?.invalid) {
                <p class="text-xs text-[var(--color-error)]">
                  Lowercase letters, numbers, and hyphens only
                </p>
              }
            </div>
            <div class="space-y-1">
              <label class="label">Email</label>
              <input
                formControlName="email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
                class="sp-input"
              />
              @if (credentialsForm.get('email')?.touched && credentialsForm.get('email')?.invalid) {
                <p class="text-xs text-[var(--color-error)]">Valid email required</p>
              }
            </div>
            <div class="space-y-1">
              <label class="label">Password</label>
              <input
                formControlName="password"
                type="password"
                placeholder="Min 8 characters"
                autocomplete="new-password"
                class="sp-input"
              />
              @if (credentialsForm.get('password')?.touched && credentialsForm.get('password')?.invalid) {
                <p class="text-xs text-[var(--color-error)]">At least 8 characters required</p>
              }
            </div>
            <button type="submit" [disabled]="loading()" class="btn-primary w-full">
              @if (loading()) { Creating account… } @else { Create account }
            </button>
          </form>
        }

        @if (step() === 'workspace') {
          <!-- Workspace creation -->
          <div class="space-y-1 text-center">
            <h1 class="text-2xl font-semibold text-[var(--color-text-primary)]">
              Create your workspace
            </h1>
            <p class="text-sm text-[var(--color-text-secondary)]">
              Your workspace is where your team gets work done.
            </p>
          </div>

          <form [formGroup]="workspaceForm" (ngSubmit)="createWorkspace()" class="space-y-4">
            @if (error()) {
              <p class="rounded-md bg-[var(--color-error-subtle)] px-3 py-2 text-sm text-[var(--color-error)]">
                {{ error() }}
              </p>
            }
            <div class="space-y-1">
              <label class="label">Workspace name</label>
              <input
                formControlName="name"
                type="text"
                placeholder="Acme Corp"
                class="sp-input"
                (input)="onWorkspaceNameInput($event)"
              />
              @if (workspaceForm.get('name')?.touched && workspaceForm.get('name')?.invalid) {
                <p class="text-xs text-[var(--color-error)]">Name is required</p>
              }
            </div>
            <div class="space-y-1">
              <label class="label">URL slug</label>
              <div class="flex items-center gap-1">
                <span class="text-sm text-[var(--color-text-muted)]">sprincer.app/</span>
                <input
                  formControlName="slug"
                  type="text"
                  placeholder="acme-corp"
                  class="sp-input flex-1"
                />
              </div>
              @if (workspaceForm.get('slug')?.touched && workspaceForm.get('slug')?.invalid) {
                <p class="text-xs text-[var(--color-error)]">
                  Lowercase letters, numbers, and hyphens only
                </p>
              }
            </div>
            <button type="submit" [disabled]="loading()" class="btn-primary w-full">
              @if (loading()) { Creating workspace… } @else { Create workspace }
            </button>
          </form>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .sp-input {
      @apply flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors;
      border-color: var(--color-border);
      background-color: var(--color-surface);
      color: var(--color-text-primary);
      &::placeholder { color: var(--color-text-muted); }
      &:focus-visible { outline: none; }
      &:disabled { cursor: not-allowed; opacity: 0.5; }
    }
    .label {
      @apply block text-sm font-medium;
      color: var(--color-text-primary);
    }
    .btn-primary {
      @apply inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors;
      @apply disabled:pointer-events-none disabled:opacity-50;
      background-color: var(--color-brand-600);
      color: white;
      &:hover:not(:disabled) { background-color: var(--color-brand-700); }
    }
    .btn-oauth {
      @apply inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors;
      border-color: var(--color-border);
      background-color: var(--color-surface);
      color: var(--color-text-primary);
      &:hover { background-color: var(--color-surface-overlay); }
    }
  `],
})
export class SignupPage {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);

  readonly step = signal<SignupStep>("credentials");
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly credentialsForm = this.fb.nonNullable.group({
    username: [
      "",
      [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)],
    ],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  readonly workspaceForm = this.fb.nonNullable.group({
    name: ["", [Validators.required]],
    slug: ["", [Validators.required, slugValidator]],
  });

  onWorkspaceNameInput(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    this.workspaceForm.patchValue({ slug });
  }

  async signUp(): Promise<void> {
    if (this.credentialsForm.invalid) {
      this.credentialsForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const { email, password, username } = this.credentialsForm.getRawValue();
      await firstValueFrom(
        this.http.post(
          "/api/v1/auth/sign-up/email",
          { email, password, name: username },
          { withCredentials: true },
        ),
      );
      await this.sessionService.loadSession();
      this.step.set("workspace");
    } catch (err: unknown) {
      this.error.set(getErrorMessage(err) ?? "Sign up failed. Email may already be in use.");
    } finally {
      this.loading.set(false);
    }
  }

  async createWorkspace(): Promise<void> {
    if (this.workspaceForm.invalid) {
      this.workspaceForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const { name, slug } = this.workspaceForm.getRawValue();
      await firstValueFrom(
        this.http.post("/api/v1/workspaces", { name, slug }, { withCredentials: true }),
      );
      await this.router.navigate(["/" + slug]);
    } catch (err: unknown) {
      this.error.set(getErrorMessage(err) ?? "Failed to create workspace. Slug may be taken.");
    } finally {
      this.loading.set(false);
    }
  }

  signUpWithOAuth(provider: "google" | "github" | "gitlab"): void {
    const callbackUrl = encodeURIComponent(window.location.origin + "/auth/callback");
    window.location.href = `/api/v1/auth/oauth/${provider}?callbackURL=${callbackUrl}`;
  }
}

function getErrorMessage(err: unknown): string | null {
  if (err && typeof err === "object" && "error" in err) {
    const e = (err as { error: unknown }).error;
    if (e && typeof e === "object" && "message" in e) {
      return String((e as { message: unknown }).message);
    }
  }
  return null;
}
