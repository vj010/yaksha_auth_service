import express, { Request, Response, Router } from 'express';
import { AppContextAuthenticationService } from 'src/interfaces/app_context_auth_service.interface';
import { AppContextController } from 'src/interfaces/app_context_controller.interface';
import { MethodReturnValue } from 'src/interfaces/method_return_value.interface';

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
    this.router.get('/login', this.loginRouteHandler.bind(this));
  }

  async getLoginUrlHandler(_: Request, response: Response): Promise<void> {
    const url = await this.appContextAuthenticationService.getLoginUrl();
    response.send(url);
  }

  async loginRouteHandler(request: Request, response: Response): Promise<void> {
    const loginStatus: MethodReturnValue<any> =
      await this.appContextAuthenticationService.login(request?.query?.code);

    if (!loginStatus.success) {
      response.status(500);
      response.send(loginStatus.message);
    }

    response.status(200);
    response.send(loginStatus.data);
  }

  logoutHandler(reques: Request, response: Response) {
    response.send('logout');
  }

  getRouter(): Router {
    return this.router;
  }
}
