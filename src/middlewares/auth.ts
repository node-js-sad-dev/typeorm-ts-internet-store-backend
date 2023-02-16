import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import BaseError from "../core/errors/BaseError";
import { ExtendedRequest, UserObject } from "../core/types/router";

import { handleAsync } from "../utils/handleAsync";

import { default as TokenService } from "../modules/token/service";
import { default as ClientService } from "../modules/client/service";

export function getToken(authHeader: string) {
  const splitToken = authHeader.split(" ");

  return {
    bearer: splitToken[0],
    token: splitToken[1],
  };
}

export async function auth(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
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

  const [clientExist, clientExistError] = await handleAsync(
    new ClientService().exist({ id: userObj.id })
  );

  if (clientExistError) throw new BaseError(400, "Check if client exist error");

  if (!clientExist) throw new BaseError(404, "Client not found");

  req.user = userObj;

  next();
}
