import { Application } from 'express-serve-static-core';
import { AppContext } from '../../../src/utils/app';
import request from 'supertest';
import { AuthenticationController } from '../../../src/authentication/authentication.controller';

describe('AuthenticationController /login route', () => {
  const appContext: AppContext = new AppContext(
    parseInt(process.env.TEST_PORT ?? process.env.PORT),
  );

  const authService = {
    getLoginUrl: function () {
      return 'abc';
    },
    login: jest.fn(),
    logout: jest.fn(),
    registerUser: jest.fn(),
  };
  appContext.setControllerRoutes(new AuthenticationController(authService));

  let app: Application;

  beforeEach(() => {
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
});
