export interface LoginRequestDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponseDto {
  status: string; // success
  success: boolean;
  access_token?: string;
  user?: {
    role: string //admin
  }
}