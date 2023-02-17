import { Request } from "express";
import { UserRole } from "../../modules/user/type";

export type UserObject = {
  id: number;
  role: UserRole;
};

export type EndpointReturnType = Promise<
  Partial<{
    status: number;
    payload: any;
  }>
>;

export type ExpressEndpointFunction = (req: Request) => EndpointReturnType;
