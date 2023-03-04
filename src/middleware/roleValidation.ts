import { NextFunction, Request, Response } from "express";
import BaseError from "../core/errors/BaseError";
import { UserRole } from "../core/types/auth";

export function roleValidation(allowedRoles: Array<UserRole>) {
  return function (req: Request, res: Response, next: NextFunction) {
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
