import { ExtendedRequest } from "../../core/types/router";
import { NextFunction, Response } from "express";
import Joi from "joi";
import BaseError from "../../core/errors/BaseError";

export default class Validation {
  public loginClient = (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const validation = Joi.object({
      login: Joi.string().required(),
      password: Joi.string().required().min(8).max(16),
    }).validate(body);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };
}
