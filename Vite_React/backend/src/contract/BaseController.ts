import 'reflect-metadata';
import { HttpMethod } from '../network/HTTPMethod';
import { RouteMetadata } from '../types/RouteMetaData';

class BaseController {
    BaseRoute: string;
    constructor(baseRoute: string) {
        if(!baseRoute.startsWith('/'))
            baseRoute = '/' + baseRoute;
        this.BaseRoute = baseRoute;
    }

    public static HttpRoute(method: HttpMethod, route: string) {
        return function (target: any, propertyKey: string) {
            const routes: any[] = Reflect.getMetadata('routes', target.constructor) || [];
            // if(!route.startsWith('/')) 
            //     route = '/' + route;
            let data : RouteMetadata = { method, route, handler: propertyKey };
            routes.push(data);
            Reflect.defineMetadata('routes', routes, target.constructor);
        };
    }

    public static Get(route: string) {
        return this.HttpRoute(HttpMethod.GET, route);
    }

    public static Post(route: string) {
        return this.HttpRoute(HttpMethod.POST, route);
    }

    public static Put(route: string) {
        return this.HttpRoute(HttpMethod.PUT, route);
    }

    public static Delete(route: string) {
        return this.HttpRoute(HttpMethod.DELETE, route);
    }
}

export default BaseController;
