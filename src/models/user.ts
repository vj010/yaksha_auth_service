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
  locale: { type: String },
});

interface UserModelInterface extends mongoose.Model<UserDoc> {
  build(user: IUser): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

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

export const User = mongoose.model<UserDoc, UserModelInterface>(
  'User',
  userSchema,
);
