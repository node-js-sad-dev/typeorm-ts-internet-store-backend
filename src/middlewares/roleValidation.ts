import { UserRole } from "../modules/user/type";
import { ExtendedRequest } from "../core/types/router";
import { NextFunction, Response } from "express";
import BaseError from "../core/errors/BaseError";

export function roleValidation(allowedRoles: Array<UserRole>) {
  return function (req: ExtendedRequest, res: Response, next: NextFunction) {
    if (!req.user) throw new BaseError(403, "Invalid middleware call");

    const validRole = allowedRoles.includes(req.user.role);

    if (validRole) next();
    else
      throw new BaseError(
        403,
        "You dont have enough rights to call this endpoint"
      );
  };
}
