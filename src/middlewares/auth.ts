import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import BaseError from "../core/errors/BaseError";
import { UserObject } from "../core/types/router";

import { handleAsync } from "../utils/handleAsync";

import { default as TokenService } from "../modules/token/service";
import { default as UserService } from "../modules/user/service";
import { UserRole } from "../modules/auth/type";
import WorkerService from "../modules/worker/service";

export function getToken(authHeader: string) {
  const splitToken = authHeader.split(" ");

  return {
    bearer: splitToken[0],
    token: splitToken[1],
  };
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    throw new BaseError(401, "Authorization token is not provided");

  const { bearer, token } = getToken(authHeader);

  if (bearer !== "Bearer") throw new BaseError(401, "Invalid token format");

  let userObj: UserObject;

  try {
    userObj = jwt.verify(token, process.env.JWT_SECRET as string) as UserObject;
  } catch (e) {
    throw new BaseError(401, "Invalid token");
  }

  const [expiredToken, expiredTokenError] = await handleAsync(
    new TokenService().getOne({ search: { token: token } })
  );

  if (expiredTokenError)
    throw new BaseError(401, "Check if token expired failed");

  if (expiredToken) throw new BaseError(401, "Expired token");

  let entityExist: boolean, entityExistError;

  switch (userObj.role) {
    case UserRole.USER:
      [entityExist, entityExistError] = await handleAsync(
        new UserService().exist({ id: userObj.id })
      );

      if (entityExistError)
        throw new BaseError(400, "Check if user exist error");

      if (!entityExist) throw new BaseError(404, "User not found");

      break;
    case UserRole.ADMIN:
    case UserRole.WORKER:
      [entityExist, entityExistError] = await handleAsync(
        new WorkerService().exist({ id: userObj.id })
      );

      if (entityExistError)
        throw new BaseError(400, "Check if worker exist error");

      if (!entityExist) throw new BaseError(404, "Worker not found");

      break;
  }

  req.user = userObj;

  next();
}
