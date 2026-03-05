export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  /** BetterAuth uses `name` field; maps to username */
  name: string;
}

export interface OtpSendRequest {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  slug: string;
}
