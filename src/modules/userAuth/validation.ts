import { NextFunction, Request, Response } from "express";
import BaseError from "../../core/errors/BaseError";
import Joi from "joi";
import { passwordValidation } from "../../validation";

export default class UserAuthValidation {
  public registerUser = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    if (!body.email && !body.phone)
      throw new BaseError(400, "Email or phone should be specified");

    const validation = Joi.object({
      email: Joi.string(),
      phone: Joi.string(),
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      password: passwordValidation,
    }).validate(body);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };
}
