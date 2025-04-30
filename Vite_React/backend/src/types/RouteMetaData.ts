import { HttpMethod } from "../network/HTTPMethod";
export type RouteMetadata = {
  method: HttpMethod;
  route: string;
  handler: string;
};