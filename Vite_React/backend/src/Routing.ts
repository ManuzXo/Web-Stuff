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

let controllersData: { [key: string]: string[] } = {};
function Routing(app: express.Express) {
  const controllersPath = path.resolve(__dirname, 'controller');

  console.info('📂 Scanning controllers directory:', controllersPath);

  fs.readdirSync(controllersPath).forEach(async (file) => {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      console.info(`📄 Found controller file: ${file}`);
      const controllerModule = await import(path.join(controllersPath, file));
      const ControllerClass = controllerModule.default;

      if (ControllerClass && typeof ControllerClass === 'function') {
        const instance: BaseController = new ControllerClass();
        const routes: RouteMetadata[] = Reflect.getMetadata('routes', instance.constructor) || [];
        if (routes) {
          console.info(`✅ Found ${routes.length} route(s) in ${file}`);
          routes.forEach((route: RouteMetadata) => {
            const { method, route: routePath, handler } = route;
            const fullRoute = `${instance.BaseRoute}${routePath}`;
            console.info(`🚀 Registering route: [${method}] ${fullRoute} (Handler: ${handler})`);
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
            if (!controllersData[file])
              controllersData[file] = [];
            controllersData[file].push(fullRoute);
          });
        } else {
          console.warn(`⚠️ No routes found in ${file}`);
        }
      } else {
        console.error(`❌ Failed to load controller from ${file}`);
      }
    } else {
      console.warn(`⚠️ Skipping non-controller file: ${file}`);
    }
  });

  app.get('/api/controllers', (req, res) => {
    console.info('📊 Sending controllers data to client');
    res.json(controllersData);
  });
}

export default Routing;
