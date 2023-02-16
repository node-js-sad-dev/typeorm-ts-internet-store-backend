import { Request } from "express";

export type UserObject = {
  id: number;
};

export type ExtendedRequest = Request & {
  user?: UserObject;
};

export type EndpointReturnType = Promise<
  Partial<{
    status: number;
    payload: any;
  }>
>;

export type ExpressEndpointFunction = (
  req: ExtendedRequest
) => EndpointReturnType;
