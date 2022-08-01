export type GoogleOAuthConfig = {
  googleClientId: string;
  googleClientSecret: string;
  redirectUrl: string;
  authRootUrl: string;
  accessType: string;
  responseType: string;
  prompt: string;
  scope: string[];
  googleTokenUrl: string;
  grantType: string;
  profileInfoUrl: string;
};
