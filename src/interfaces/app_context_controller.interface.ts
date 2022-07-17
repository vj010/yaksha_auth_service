import { Router } from 'express';

export interface AppContextController {
  controllerPath: string;
  getRouter(): void;
}

export type RoutingInfo = {
  controllerPath: string;
  router: Router;
};
