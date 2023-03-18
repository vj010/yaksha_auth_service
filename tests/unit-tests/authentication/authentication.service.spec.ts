import dontenv from 'dotenv';
import { IUser } from 'src/interfaces/user_model.interface';
import { AuthenticationService } from '../../../src/authentication/authentication.service';
import { googleOAuthConfig } from '../../../src/config/google-oauth-config';
import { Request } from 'express';
import { RequestSession, Session, SessionData } from 'express-session';
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

  it('getLoginUrl login url check', async () => {
    const loginUrl: string = await authService.getLoginUrl();
    expect(loginUrl).toBe(
      'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthenticate%2Flogin&client_id=32693438658-m7lqhhcnqekfp85tsor2rbpmcqrqaaee.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email',
    );
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

// describe('AuthenticationService login test', () => {
//   let authService: AuthenticationService;

//   beforeEach(() => {
//     authService = new AuthenticationService(googleOAuthConfig);
//   });

//   it('login token method without error', async () => {
//     const userInfo: IUser = {
//       sub: '1234dskdsf',
//       name: 'john doe',
//       given_name: 'johnny',
//       family_name: 'doe',
//       picture: 'https://url.com',
//       email: 'john@doe.com',
//       email_verified: false,
//       locale: 'en-GB"',
//     };

//     const getGoogleAuthTokensSpy = jest
//       .spyOn(authService, 'getGoogleAuthTokens')
//       .mockImplementation(() =>
//         Promise.resolve({
//           access_token: 'abc',
//           expires_in: 12456789,
//           refresh_token: 'ghi',
//           scope: 'jkl',
//           id_token: 'mno',
//           token_type: '',
//         }),
//       );

//     const getGoogleUserInfoSpy = jest
//       .spyOn(authService, 'getGoogleUserInfo')
//       .mockImplementation((code: string) => Promise.resolve(userInfo));

//     const registerUserSpy = jest
//       .spyOn(authService, 'registerUser')
//       .mockImplementation(async (userInfo: IUser) => {
//         return Promise.resolve(userInfo);
//       });

//       const requestSession:RequestSession = {} as Partial<Session & Partial<SessionData>>

//     await authService.login(,'abc');
//     expect(getGoogleAuthTokensSpy).toHaveBeenCalledTimes(1);
//     expect(getGoogleUserInfoSpy).toHaveBeenCalledTimes(1);
//     expect(getGoogleUserInfoSpy).toHaveBeenCalledWith('abc');
//     expect(getGoogleAuthTokensSpy).toReturn();
//     expect(getGoogleAuthTokensSpy).toReturnWith(
//       Promise.resolve({
//         access_token: 'abc',
//         expires_in: 12456789,
//         refresh_token: 'ghi',
//         scope: 'jkl',
//         id_token: 'mno',
//       }),
//     );
//     expect(registerUserSpy).toHaveBeenCalledTimes(1);
//     expect(registerUserSpy).toReturnWith(Promise.resolve(userInfo));
//   });
// });
