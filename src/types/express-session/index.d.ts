import { IUser } from 'src/interfaces/user_model.interface';
import 'express-session';
import session from 'express-session';
declare module 'express-session' {
  type RequestSession = session.Session & Partial<session.SessionData>;
  interface SessionData {
    user: IUser;
  }
}
