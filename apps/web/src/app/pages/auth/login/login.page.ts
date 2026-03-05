import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { SessionService } from "@services/session.service";

type AuthTab = "password" | "otp";
type OtpStep = "send" | "verify";

@Component({
  selector: "sp-login-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-[var(--color-surface)] px-4">
      <div class="w-full max-w-sm space-y-6">
        <!-- Logo / Title -->
        <div class="space-y-1 text-center">
          <h1 class="text-2xl font-semibold text-[var(--color-text-primary)]">
            Sign in to Sprincer
          </h1>
          <p class="text-sm text-[var(--color-text-secondary)]">
            Don't have an account?
            <a routerLink="/signup" class="text-[var(--color-brand-600)] hover:underline">
              Sign up
            </a>
          </p>
        </div>

        <!-- OAuth buttons -->
        <div class="space-y-2">
          <button (click)="signInWithOAuth('google')" type="button" class="btn-oauth">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button (click)="signInWithOAuth('github')" type="button" class="btn-oauth">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Continue with GitHub
          </button>
          <button (click)="signInWithOAuth('gitlab')" type="button" class="btn-oauth">
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
            <span class="bg-[var(--color-surface)] px-2 text-[var(--color-text-muted)]">or continue with</span>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex rounded-md border border-[var(--color-border)] p-0.5">
          <button
            type="button"
            (click)="activeTab.set('password')"
            [class]="activeTab() === 'password' ? 'tab-active' : 'tab-inactive'"
          >
            Password
          </button>
          <button
            type="button"
            (click)="activeTab.set('otp')"
            [class]="activeTab() === 'otp' ? 'tab-active' : 'tab-inactive'"
          >
            Email OTP
          </button>
        </div>

        <!-- Password tab -->
        @if (activeTab() === 'password') {
          <form [formGroup]="passwordForm" (ngSubmit)="signInWithPassword()" class="space-y-4">
            @if (error()) {
              <p class="rounded-md bg-[var(--color-error-subtle)] px-3 py-2 text-sm text-[var(--color-error)]">
                {{ error() }}
              </p>
            }
            <div class="space-y-1">
              <label class="label">Email</label>
              <input
                formControlName="email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
                class="sp-input"
              />
              @if (passwordForm.get('email')?.touched && passwordForm.get('email')?.invalid) {
                <p class="text-xs text-[var(--color-error)]">Valid email required</p>
              }
            </div>
            <div class="space-y-1">
              <label class="label">Password</label>
              <input
                formControlName="password"
                type="password"
                placeholder="••••••••"
                autocomplete="current-password"
                class="sp-input"
              />
              @if (passwordForm.get('password')?.touched && passwordForm.get('password')?.invalid) {
                <p class="text-xs text-[var(--color-error)]">Password is required</p>
              }
            </div>
            <button type="submit" [disabled]="loading()" class="btn-primary w-full">
              @if (loading()) { Signing in… } @else { Sign in }
            </button>
          </form>
        }

        <!-- Email OTP tab -->
        @if (activeTab() === 'otp') {
          @if (otpStep() === 'send') {
            <form [formGroup]="otpEmailForm" (ngSubmit)="sendOtp()" class="space-y-4">
              @if (error()) {
                <p class="rounded-md bg-[var(--color-error-subtle)] px-3 py-2 text-sm text-[var(--color-error)]">
                  {{ error() }}
                </p>
              }
              <div class="space-y-1">
                <label class="label">Email</label>
                <input
                  formControlName="email"
                  type="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  class="sp-input"
                />
              </div>
              <button type="submit" [disabled]="loading()" class="btn-primary w-full">
                @if (loading()) { Sending… } @else { Send code }
              </button>
            </form>
          } @else {
            <form [formGroup]="otpVerifyForm" (ngSubmit)="verifyOtp()" class="space-y-4">
              @if (error()) {
                <p class="rounded-md bg-[var(--color-error-subtle)] px-3 py-2 text-sm text-[var(--color-error)]">
                  {{ error() }}
                </p>
              }
              <p class="text-sm text-[var(--color-text-secondary)]">
                Enter the 6-digit code sent to <strong>{{ otpEmailForm.value.email }}</strong>
              </p>
              <div class="space-y-1">
                <label class="label">One-time code</label>
                <input
                  formControlName="otp"
                  type="text"
                  inputmode="numeric"
                  placeholder="123456"
                  maxlength="6"
                  autocomplete="one-time-code"
                  class="sp-input text-center tracking-widest text-lg"
                />
              </div>
              <button type="submit" [disabled]="loading()" class="btn-primary w-full">
                @if (loading()) { Verifying… } @else { Verify code }
              </button>
              <button
                type="button"
                (click)="otpStep.set('send'); error.set(null)"
                class="w-full text-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              >
                ← Back
              </button>
            </form>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .sp-input {
      @apply flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors;
      border-color: var(--color-border);
      background-color: var(--color-surface);
      color: var(--color-text-primary);
      &::placeholder { color: var(--color-text-muted); }
      &:focus-visible { outline: none; ring: 2px; ring-color: var(--color-brand-600); }
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
    .tab-active {
      @apply flex-1 rounded py-1.5 text-sm font-medium transition-colors;
      background-color: var(--color-surface-raised);
      color: var(--color-text-primary);
    }
    .tab-inactive {
      @apply flex-1 rounded py-1.5 text-sm font-medium transition-colors;
      color: var(--color-text-secondary);
      &:hover { color: var(--color-text-primary); }
    }
  `],
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);

  readonly activeTab = signal<AuthTab>("password");
  readonly otpStep = signal<OtpStep>("send");
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly passwordForm = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  readonly otpEmailForm = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
  });

  readonly otpVerifyForm = this.fb.nonNullable.group({
    otp: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  async signInWithPassword(): Promise<void> {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const { email, password } = this.passwordForm.getRawValue();
      await firstValueFrom(
        this.http.post("/api/v1/auth/sign-in/email", { email, password }, { withCredentials: true }),
      );
      await this.redirectAfterLogin();
    } catch (err: unknown) {
      this.error.set(getErrorMessage(err) ?? "Invalid email or password.");
    } finally {
      this.loading.set(false);
    }
  }

  async sendOtp(): Promise<void> {
    if (this.otpEmailForm.invalid) {
      this.otpEmailForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const { email } = this.otpEmailForm.getRawValue();
      await firstValueFrom(
        this.http.post("/api/v1/auth/email-otp/send-otp", { email }, { withCredentials: true }),
      );
      this.otpStep.set("verify");
    } catch (err: unknown) {
      this.error.set(getErrorMessage(err) ?? "Failed to send code. Try again.");
    } finally {
      this.loading.set(false);
    }
  }

  async verifyOtp(): Promise<void> {
    if (this.otpVerifyForm.invalid) {
      this.otpVerifyForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const { email } = this.otpEmailForm.getRawValue();
      const { otp } = this.otpVerifyForm.getRawValue();
      await firstValueFrom(
        this.http.post(
          "/api/v1/auth/sign-in/email-otp",
          { email, otp },
          { withCredentials: true },
        ),
      );
      await this.redirectAfterLogin();
    } catch (err: unknown) {
      this.error.set(getErrorMessage(err) ?? "Invalid or expired code.");
    } finally {
      this.loading.set(false);
    }
  }

  signInWithOAuth(provider: "google" | "github" | "gitlab"): void {
    const callbackUrl = encodeURIComponent(window.location.origin + "/auth/callback");
    window.location.href = `/api/v1/auth/oauth/${provider}?callbackURL=${callbackUrl}`;
  }

  private async redirectAfterLogin(): Promise<void> {
    await this.sessionService.loadSession();
    try {
      const workspaces = await firstValueFrom(
        this.http.get<{ slug: string }[]>("/api/v1/workspaces", { withCredentials: true }),
      );
      const slug = workspaces[0]?.slug ?? "";
      await this.router.navigate(slug ? ["/" + slug] : ["/login"]);
    } catch {
      await this.router.navigate(["/login"]);
    }
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
