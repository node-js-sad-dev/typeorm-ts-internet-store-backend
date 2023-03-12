import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ValidationError from "../../core/errors/ValidationError";
import { UserRole } from "../../core/types/auth";
import { passwordValidation } from "../../validation";

export default class WorkerAuthValidation {
  public workerRegisterValidation = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    if (!body.phone || !body.email)
      throw new ValidationError("Or phone or email should be specified");

    const validation = Joi.object({
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string(),
      email: Joi.string(),
      password: passwordValidation,
      role: Joi.allow(UserRole),
    }).validate(body);

    if (validation.error) throw new ValidationError(validation.error.message);

    return next();
  };
}
