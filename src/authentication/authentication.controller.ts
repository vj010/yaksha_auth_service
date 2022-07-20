import express, { Request, Response, Router } from 'express';
import { AppContextAuthenticationService } from 'src/interfaces/app_context_auth_service.interface';
import { AppContextController } from 'src/interfaces/app_context_controller.interface';

export class AuthenticationController implements AppContextController {
  private router: Router;
  controllerPath: string;
  private appContextAuthenticationService: AppContextAuthenticationService;
  constructor(
    appContextAuthenticationService: AppContextAuthenticationService,
  ) {
    this.router = express.Router();
    this.appContextAuthenticationService = appContextAuthenticationService;
    this.controllerPath = '/authenticate';
    this.router.get('/getLoginUrl', this.getLoginUrlHandler.bind(this));
    this.router.get('/logout', this.logoutHandler.bind(this));
    this.router.post('/login');
  }

  async getLoginUrlHandler(_: Request, response: Response): Promise<void> {
    const url = await this.appContextAuthenticationService.getLoginUrl();
    response.send(url);
  }

  loginRouteHandler(request: Request, response: Response): void {
    response.send('vj');
  }

  logoutHandler(reques: Request, response: Response) {
    response.send('logout');
  }

  getRouter(): Router {
    return this.router;
  }
}
