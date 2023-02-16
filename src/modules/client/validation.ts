import { ExtendedRequest } from "../../core/types/router";
import { NextFunction, Response } from "express";
import Joi from "joi";
import BaseError from "../../core/errors/BaseError";

export default class Validation {
  public registerClient = (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const validation = Joi.object({
      email: Joi.string(),
      phone: Joi.string(),
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required().min(8).max(16),
    }).validate(body);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };
}
