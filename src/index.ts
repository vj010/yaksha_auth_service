import express, { urlencoded } from 'express';
import { AppContext } from './utils/app';
import dotenv from 'dotenv';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';

const appContext: AppContext = new AppContext();
dotenv.config();

appContext.addMiddleWare(express.json(), urlencoded({ extended: true }));

appContext.setControllerRoutes(
  new AuthenticationController(
    new AuthenticationService(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    ),
  ),
);

appContext.startServer(parseInt(process.env.PORT));
