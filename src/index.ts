import dotenv from 'dotenv';
dotenv.config();

import express, { urlencoded } from 'express';
import { AppContext } from './utils/app';

import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { googleOAuthConfig } from './config/google-oauth-config';
import mongoose from 'mongoose';
import session, { SessionOptions } from 'express-session';
import { Redis } from 'ioredis';
import redisStoreInitialization, { RedisStore } from 'connect-redis';
import { cookieParser } from 'cookie-parser';

const appContext: AppContext = new AppContext();
const redisStore: RedisStore = redisStoreInitialization(session);

redisStore.client = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: new redisStore({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    client: new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    }),
  }),
  resave: false,
  saveUninitialized: false,
};

appContext.addMiddleWare(
  express.json(),
  urlencoded({ extended: true }),
  session(sessionOptions),
  // cookieParser(process.env.SESSION_SECRET),
);

mongoose.connect(process.env.MONGO_CONNECTION_URL, (error) => {
  if (error) {
    console.log('mongo connection failed', error);
    appContext.stopServer();
  } else {
    console.log('mongo connected');
  }
});

appContext.setControllerRoutes(
  new AuthenticationController(new AuthenticationService(googleOAuthConfig)),
);

appContext.startServer(parseInt(process.env.PORT));
