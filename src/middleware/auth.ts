import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import BaseError from "../core/errors/BaseError";
import { UserObject } from "../core/types/router";

import { handleAsync } from "../utils/handleAsync";

import UserService from "../modules/user/service";
import WorkerService from "../modules/worker/service";
import { UserRole } from "../core/types/auth";
import DBError from "../core/errors/DBError";
import AccessDeniedError from "../core/errors/AccessDeniedError";

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

  // todo -> change logic to check userAuth or workerAuth tables to check if token expired
  // const [expiredToken, expiredTokenError] = await handleAsync(
  //   new TokenService().getOne({ search: { token: token } })
  // );
  //
  // if (expiredTokenError)
  //   throw new BaseError(401, "Check if token expired failed");
  //
  // if (expiredToken) throw new BaseError(401, "Expired token");

  switch (userObj.role) {
    case UserRole.USER:
      const { result: userExist, error: userExistError } = await handleAsync(
        new UserService().exist({ id: userObj.id })
      );

      if (userExistError) throw new DBError("Check if user exist error");

      if (!userExist) throw new BaseError(404, "User not found");

      break;
    case UserRole.ADMIN:
    case UserRole.WORKER:
      const { result: worker, error: workerError } = await handleAsync(
        new WorkerService().getOne({
          search: { id: userObj.id },
          select: { isDeleted: true },
        })
      );

      if (workerError) throw new DBError("Check if worker exist error");

      if (!worker) throw new BaseError(404, "Worker not found");

      if (worker.isDeleted) throw new AccessDeniedError("Worker deleted");

      break;
  }

  req.user = userObj;

  next();
}
