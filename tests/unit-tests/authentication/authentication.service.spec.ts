import dontenv from 'dotenv';
import { AuthenticationService } from '../../../src/authentication/authentication.service';
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

describe('Authentication Service getGoogleAuthTokens', () => {
  let authService: AuthenticationService;
  beforeEach(() => {
    authService = new AuthenticationService(googleOAuthConfig);
  });

  it('error response', async () => {
    const getGoogleAuthTokensSpy = jest.spyOn(
      authService,
      'getGoogleAuthTokens',
    );

    await expect(
      authService.getGoogleAuthTokens('dummyCode'),
    ).rejects.toMatchObject(
      new Error('google api responded with:ERR_BAD_REQUEST'),
    );

    expect(getGoogleAuthTokensSpy).toHaveBeenCalledTimes(1);
    expect(getGoogleAuthTokensSpy).toHaveBeenCalledWith('dummyCode');
  });
});

describe('Authentication Service getGoogleUserInfo test', () => {
  let authenticationService: AuthenticationService;
  beforeEach(() => {
    authenticationService = new AuthenticationService(googleOAuthConfig);
  });

  it('called with dumy access token', async () => {
    const getGoogleUserInfoSpy = jest.spyOn(
      authenticationService,
      'getGoogleUserInfo',
    );

    await expect(
      authenticationService.getGoogleUserInfo('dummyAccessToken'),
    ).rejects.toMatchObject(
      new Error('google api responded with:ERR_BAD_REQUEST'),
    );

    expect(getGoogleUserInfoSpy).toHaveBeenCalled();
    expect(getGoogleUserInfoSpy).toHaveBeenCalledTimes(1);
  });
});

describe('AuthenticationService login test', () => {
  let authService: AuthenticationService;

  beforeEach(() => {
    authService = new AuthenticationService(googleOAuthConfig);
  });

  it('login token method without error', async () => {
    const getGoogleAuthTokensSpy = jest
      .spyOn(authService, 'getGoogleAuthTokens')
      .mockImplementation(() =>
        Promise.resolve({
          access_token: 'abc',
          expires_in: 12456789,
          refresh_token: 'ghi',
          scope: 'jkl',
          id_token: 'mno',
          token_type: '',
        }),
      );

    const getGoogleUserInfoSpy = jest
      .spyOn(authService, 'getGoogleUserInfo')
      .mockImplementation((code: string) =>
        Promise.resolve({
          name: 'john doe',
          givenName: 'johm',
          email: 'johndoe@gmail.com',
          picture: 'https://johndoeimgae.com',
        }),
      );

    await authService.login('abc');
    expect(getGoogleAuthTokensSpy).toHaveBeenCalledTimes(1);
    expect(getGoogleUserInfoSpy).toHaveBeenCalledTimes(1);
    expect(getGoogleUserInfoSpy).toHaveBeenCalledWith('abc');
    expect(getGoogleAuthTokensSpy).toReturn();
    expect(getGoogleAuthTokensSpy).toReturnWith(
      Promise.resolve({
        access_token: 'abc',
        expires_in: 12456789,
        refresh_token: 'ghi',
        scope: 'jkl',
        id_token: 'mno',
      }),
    );
  });
});
