import { Request } from "express";

export type UserObject = {};

export type ExtendedRequest = Request & {
  user: UserObject;
};

export type EndpointReturnType = Partial<{
  status: number;
  payload: any;
}>;

export type ExpressEndpointFunction = (
  req: ExtendedRequest
) => Promise<EndpointReturnType>;
