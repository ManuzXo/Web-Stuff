import express from 'express';
import path from 'path';
import fs from 'fs';
import 'reflect-metadata';
import { HttpMethod } from './network/HTTPMethod';
import BaseController from './contract/BaseController';
import { RouteMetadata } from './types/RouteMetaData';


export default class RouterManager {
  private app: express.Express;
  private controllersData: { [key: string]: string[] } = {};

  constructor(app: express.Express) {
    this.app = app;
  }

  public async initialize() {
    const controllersPath = path.resolve(__dirname, 'controller');
    const controllerFiles = this.scanControllersDirectory(controllersPath);
    for (const file of controllerFiles) {
      await this.processControllerFile(file, controllersPath);
    }
    this.setupControllersEndpoint();
  }

  private scanControllersDirectory(controllersPath: string): string[] {
    console.info('📂 Scanning controllers directory:', controllersPath);
    return fs.readdirSync(controllersPath).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
  }

  private async loadController(file: string, controllersPath: string): Promise<BaseController | null> {
    console.info(`📄 Found controller file: ${file}`);
    const controllerModule = await import(path.join(controllersPath, file));
    const ControllerClass = controllerModule.default;

    if (ControllerClass && typeof ControllerClass === 'function') {
      return new ControllerClass();
    } else {
      console.error(`❌ Failed to load controller from ${file}`);
      return null;
    }
  }

  private registerRoute(instance: BaseController, route: RouteMetadata, file: string) {
    const { method, route: routePath, handler } = route;
    const fullRoute = `${instance.BaseRoute}${routePath}`;
    console.info(`🚀 Registering route: [${method}] ${fullRoute} (Handler: ${handler})`);

    const handlerFunction = instance[handler as keyof BaseController] as unknown as (...args: any[]) => void;
    const loggedHandlerFunction = (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.info(`📥 Incoming request: [${method}] ${fullRoute}`);
      handlerFunction.call(instance, req, res, next);
    };

    switch (method) {
      case HttpMethod.GET:
        this.app.get(fullRoute, loggedHandlerFunction);
        break;
      case HttpMethod.POST:
        this.app.post(fullRoute, loggedHandlerFunction);
        break;
      case HttpMethod.PUT:
        this.app.put(fullRoute, loggedHandlerFunction);
        break;
      case HttpMethod.DELETE:
        this.app.delete(fullRoute, loggedHandlerFunction);
        break;
    }

    if (!this.controllersData[file]) this.controllersData[file] = [];
    this.controllersData[file].push(fullRoute);
  }

  private async processControllerFile(file: string, controllersPath: string) {
    const instance = await this.loadController(file, controllersPath);
    if (instance) {
      const routes: RouteMetadata[] = Reflect.getMetadata('routes', instance.constructor) || [];
      if (routes.length > 0) {
        console.info(`✅ Found ${routes.length} route(s) in ${file}`);
        routes.forEach((route) => this.registerRoute(instance, route, file));
      } else {
        console.warn(`⚠️ No routes found in ${file}`);
      }
    }
  }

  private setupControllersEndpoint() {
    this.app.get('/api/controllers', (req, res) => {
      console.info('📊 Sending controllers data to client');
      res.json(this.controllersData);
    });
  }

}
