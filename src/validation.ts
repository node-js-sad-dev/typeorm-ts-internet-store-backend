import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import BaseError from "./core/errors/BaseError";

export const passwordValidation = Joi.string().min(8).max(16);

export const loginValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  const validation = Joi.object({
    login: Joi.string().required(),
    password: passwordValidation,
  }).validate(body);

  if (validation.error) throw new BaseError(400, validation.error.message);

  return next();
};
