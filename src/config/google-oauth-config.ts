import { GoogleOAuthConfig } from 'src/types/googleOAuthConfig';

export const googleOAuthConfig: GoogleOAuthConfig = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUrl: process.env.GOOGLE_REDIRECT_URL,
  authRootUrl: process.env.GOOGLE_AUTH_ROOT_URL,
  accessType: process.env.GOOGLE_AUTH_ACCESS_TYPE,
  responseType: process.env.GOOGLE_AUTH_RESPONSE_TYPE,
  prompt: process.env.GOOGLE_AUTH_PROMPT,
  scope: (process.env.GOOGLE_AUTH_SCOPE as string)?.split(','),
  googleTokenUrl: process.env.GOOGLE_AUTH_TOKEN_URL,
  grantType: process.env.GOOGLE_AUTH_GRANT_TYPE,
  profileInfoUrl: process.env.GOOGLE_PROFILE_INFO_URL,
};
