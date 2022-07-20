export interface AppContextAuthenticationService {
  getLoginUrl(options?: Record<string, any>): string | Promise<string>;
  login(code: string): void | Promise<void>;
  logout(): void | Promise<void>;
  registerUser(): void | Promise<void>;
}
