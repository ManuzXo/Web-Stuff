import express from 'express';
import path from 'path';
import fs from 'fs';
import 'reflect-metadata';
import { HttpMethod } from './network/HTTPMethod';
import BaseController from './contract/BaseController';

type RouteMetadata = {
  method: HttpMethod;
  route: string;
  handler: string;
};

function Routing(app: express.Express) {
  const controllersPath = path.resolve(__dirname, 'controller');
  
  fs.readdirSync(controllersPath).forEach(async (file) => {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      console.log(`Found controller file: ${file}`);
      const controllerModule = await import(path.join(controllersPath, file));
      const ControllerClass = controllerModule.default;

      if (ControllerClass && typeof ControllerClass === 'function') {
        console.log(`Initializing controller: ${ControllerClass.name}`);
        const instance: BaseController = new ControllerClass();
        console.log(`Controller initialized: ${ControllerClass.name}`);

        const routes: RouteMetadata[] = Reflect.getMetadata('routes', instance.constructor) || [];
        console.log('Route metadata:', routes);

        if (routes) {
          routes.forEach((route: RouteMetadata) => {
            const { method, route: routePath, handler } = route;
            const fullRoute = `${instance.BaseRoute}${routePath}`;
            console.log(`Registering route: ${method} ${fullRoute}`);
            const handlerFunction = instance[handler as keyof BaseController] as unknown as (...args: any[]) => void;

            if (method === HttpMethod.GET) {
              app.get(fullRoute, handlerFunction.bind(instance));
            } else if (method === HttpMethod.POST) {
              app.post(fullRoute, handlerFunction.bind(instance));
            } else if (method === HttpMethod.PUT) {
              app.put(fullRoute, handlerFunction.bind(instance));
            } else if (method === HttpMethod.DELETE) {
              app.delete(fullRoute, handlerFunction.bind(instance));
            }
          });
        }
      }
    }
  });
}

export default Routing;
