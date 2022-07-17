import { Application } from 'express-serve-static-core';
import { AppContext } from '../../../src/utils/app';
import request from 'supertest';
import { AuthenticationController } from '../../../src/authentication/authentication.controller';

describe('AuthenticationController /login route', () => {
  const appContext: AppContext = new AppContext(
    parseInt(process.env.TEST_PORT ?? process.env.PORT),
  );
  appContext.setControllerRoutes(new AuthenticationController().getRouter());

  let app: Application;

  beforeEach(() => {
    app = appContext.getApp();
    if (!app) throw new Error('could not get app object');
  });

  it('testing get /login route status', async () => {
    const res = await request(app).get('/authenticate/login');
    expect(res.statusCode).toEqual(200);
  });

  it('testing get /login route body', async () => {
    const res = await request(app).get('/authenticate/login');
    console.log(res);
    expect(res.text).not.toBeNull();
  });

  it('testing get /login route body', async () => {
    const res = await request(app).get('/authenticate/login');
    console.log(res);
    expect(res.text).not.toBeNull();
  });
});
