import { IUser } from './user_model.interface';

export interface AppContextAuthenticationService {
  getLoginUrl(options?: Record<string, any>): string | Promise<string>;
  login(code?: any): any | Promise<any>;
  logout(): void | Promise<void>;
  registerUser(userInfo: IUser): IUser | Promise<IUser>;
}
