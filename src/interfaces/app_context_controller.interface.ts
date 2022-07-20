import { Router } from 'express';

export interface AppContextController {
  controllerPath: string;
  getRouter(): Router;
}
