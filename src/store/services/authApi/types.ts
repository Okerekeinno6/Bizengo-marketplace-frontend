export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ILoginResponse {
  access_token?: string;
  message: string; // Login successful
  user?: {
    email: string;
    role: string //admin
  }
}