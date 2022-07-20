import { AuthenticationService } from '../../../src/authentication/authentication.service';
import dontenv from 'dotenv';
import { googleOAuthConfig } from '../../../src/config/google-oauth-config';
dontenv.config();
describe('AuthenticationService test', () => {
  let authService: AuthenticationService;

  beforeEach(() => {
    authService = new AuthenticationService(googleOAuthConfig);
  });

  it('getLoginUrl null check', async () => {
    const loginUrl: string = await authService.getLoginUrl();
    expect(loginUrl).not.toBeNull();
    expect(loginUrl).not.toBeUndefined();
  });

  it('getLoginUrl empty string check', async () => {
    const loginUrl: string = await authService.getLoginUrl();
    console.log(loginUrl);
    expect(loginUrl.length).not.toBeLessThan(1);
  });
});
