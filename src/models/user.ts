import mongoose from 'mongoose';
import { IUser } from 'src/interfaces/user_model.interface';

const userSchema = new mongoose.Schema({
  sub: { type: String },
  name: { type: String },
  givenName: { type: String },
  familyName: { type: String },
  picture: { type: String },
  email: { type: String },
  emailVerified: { type: Boolean },
  locale: { type: Boolean },
});

interface UserModelInterface extends mongoose.Model<any> {
  build(user: IUser): any;
}

export const User = mongoose.model<any, UserModelInterface>('User', userSchema);

userSchema.statics.build = (user: IUser) => {
  return new User({
    sub: user.sub,
    name: user.name,
    givenName: user.given_name,
    familyName: user.family_name,
    picture: user.picture,
    email: user.email,
    emailVerified: user.email_verified,
    locale: user.locale,
  });
};
