import express, { Request, Response, Router } from 'express';
import { AppContextController } from 'src/interfaces/app_context_controller.interface';

export class AuthenticationController implements AppContextController {
  private router: Router;
  controllerPath: string;
  constructor() {
    this.router = express.Router();
    this.controllerPath = '/authenticate';
    this.router.get('/login', this.loginRouteHandler);
    this.router.get('/logout', this.logoutHandler);
  }

  private loginRouteHandler(request: Request, response: Response): void {
    response.send('login');
  }

  private logoutHandler(reques: Request, response: Response) {
    response.send('login');
  }

  public getRouter(): { controllerPath: string; router: Router } {
    return { controllerPath: this.controllerPath, router: this.router };
  }
}
