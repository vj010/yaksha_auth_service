import { RequestSession } from 'express-session';
import { IUser } from './user_model.interface';

export interface AppContextAuthenticationService {
  getLoginUrl(options?: Record<string, any>): string | Promise<string>;
  login(session: RequestSession, code?: any): any | Promise<any>;
  logout?(session: RequestSession): void | Promise<void>;
  registerUser(userInfo: IUser): IUser | Promise<IUser>;
}
