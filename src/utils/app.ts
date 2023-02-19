import express from 'express';
import { Application, RequestHandler } from 'express-serve-static-core';
import { AppContextController } from 'src/interfaces/app_context_controller.interface';
import { Server } from 'http';
export class AppContext {
  private app: Application;
  private port: number;
  private server: Server;
  constructor();
  constructor(port?: number);

  constructor(port?: number) {
    this.app = express();
    this.port = port;
  }

  public startServer(port: number): void {
    this.server = this.app.listen(port ?? this.port, () => {
      console.log(`server started at PORT:${this.port ?? port}`);
    });
  }

  public stopServer(): void {
    console.log('closing the server');
    this.server.close();
    process.exit(0);
  }

  public addMiddleWare(...middleWares: Array<RequestHandler>): void {
    for (const middleWare of middleWares) this.app.use(middleWare);
  }

  public setControllerRoutes(controller: AppContextController): void {
    this.app.use(controller.controllerPath, controller.getRouter());
  }

  public getApp(): Application {
    const cloneApp = express();
    for (const attribute in this.app) {
      if (typeof this[attribute] === 'object') {
        cloneApp[attribute] = this[attribute].clone();
      } else {
        cloneApp[attribute] = this.app[attribute];
      }
    }
    return cloneApp;
  }
}
