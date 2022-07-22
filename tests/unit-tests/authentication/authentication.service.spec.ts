import { AuthenticationService } from '../../../src/authentication/authentication.service';
import dontenv from 'dotenv';
import { googleOAuthConfig } from '../../../src/config/google-oauth-config';
dontenv.config();

describe('AuthenticationService getLoginUrl test', () => {
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
    expect(loginUrl.length).not.toBeLessThan(1);
  });
});

describe('AuthenticationService login test', () => {
  let authService: AuthenticationService;

  beforeEach(() => {
    authService = new AuthenticationService(googleOAuthConfig);
  });

  it('login token method without error', async () => {
    const getGoogleAuthTokens = jest
      .spyOn(authService, 'getGoogleAuthTokens')
      .mockImplementation(() =>
        Promise.resolve({
          access_token: 'abc',
          expires_in: 12456789,
          refresh_token: 'ghi',
          scope: 'jkl',
          id_token: 'mno',
        }),
      );

    await authService.login('abc');
    expect(getGoogleAuthTokens).toHaveBeenCalledTimes(1);
    expect(getGoogleAuthTokens).toReturn();
    expect(getGoogleAuthTokens).toReturnWith(
      Promise.resolve({
        access_token: 'abc',
        expires_in: 12456789,
        refresh_token: 'ghi',
        scope: 'jkl',
        id_token: 'mno',
      }),
    );
  });

  it('login token method without error', async () => {
    const getGoogleAuthTokens = jest
      .spyOn(authService, 'getGoogleAuthTokens')
      .mockImplementation(() => {
        throw new Error('test error');
      });

    try {
      const a = await authService.login('abc');
      console.log('hello world');
    } catch (error) {
      expect(error).toEqual(new Error('test error'));
    }
    expect(getGoogleAuthTokens).toThrow('test error');
  });
});
