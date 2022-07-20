import { Application } from 'express-serve-static-core';
import { AppContextAuthenticationService } from 'src/interfaces/app_context_auth_service.interface';
import request from 'supertest';
import { AuthenticationController } from '../../../src/authentication/authentication.controller';
import { AppContext } from '../../../src/utils/app';

const authService: AppContextAuthenticationService = {
  getLoginUrl: jest.fn(async () => 'abc'),
  login: jest.fn(),
  logout: jest.fn(),
  registerUser: jest.fn(),
};

let app: Application;

describe('AuthenticationController /getLoginUrl tests', () => {
  const appContext: AppContext = new AppContext(
    parseInt(process.env.TEST_PORT ?? process.env.PORT),
  );

  beforeEach(() => {
    appContext.setControllerRoutes(new AuthenticationController(authService));
    app = appContext.getApp();
    if (!app) throw new Error('could not get app object');
  });

  it('testing get /getLoginUrl route status', async () => {
    const res = await request(app).get('/authenticate/getLoginUrl');
    expect(res.statusCode).toEqual(200);
  });

  it('testing get /getLoginUrl response', async () => {
    const res = await request(app).get('/authenticate/getLoginUrl');
    expect(res.body).not.toBeNull();
    expect(res.body).not.toBeUndefined();
  });

  it('testing get /getLoginUrl response text', async () => {
    const res = await request(app).get('/authenticate/getLoginUrl');
    expect(res.text).toEqual('abc');
  });

  it('testing get /getLoginUrl service method call', async () => {
    await request(app).get('/authenticate/getLoginUrl');
    const authServiceSpy = jest.spyOn(authService, 'getLoginUrl');
    expect(authServiceSpy).toHaveBeenCalled();
  });
});
