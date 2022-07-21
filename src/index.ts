import dotenv from 'dotenv';
dotenv.config();

import express, { urlencoded } from 'express';
import { AppContext } from './utils/app';

import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { googleOAuthConfig } from './config/google-oauth-config';

const appContext: AppContext = new AppContext();

appContext.addMiddleWare(express.json(), urlencoded({ extended: true }));

appContext.setControllerRoutes(
  new AuthenticationController(new AuthenticationService(googleOAuthConfig)),
);

appContext.startServer(parseInt(process.env.PORT));
