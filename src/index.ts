import express, { urlencoded } from 'express';
import { AppContext } from './utils/app';
import dotenv from 'dotenv';
import { AuthenticationController } from './authentication/authentication.controller';

const appContext: AppContext = new AppContext();
dotenv.config();

appContext.addMiddleWare(express.json(), urlencoded({ extended: true }));

appContext.startServer(parseInt(process.env.PORT));

appContext.setControllerRoutes(new AuthenticationController().getRouter());
