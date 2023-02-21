import { NextFunction, Response, Request } from "express";
import Joi from "joi";
import BaseError from "../../core/errors/BaseError";

export default class UserValidation {
  public registerUser = (req: Request, res: Response, next: NextFunction) => {
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

  public updateUser = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const validation = Joi.object({
      name: Joi.string(),
      lastName: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      email: Joi.string(),
      password: Joi.string().min(8).max(16),
    }).validate(body);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };

  public updateUserByAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const { id } = req.params;

    const validationId = Joi.number().required().validate(id);

    if (validationId.error)
      throw new BaseError(400, validationId.error.message);

    const validationBody = Joi.object({
      name: Joi.string(),
      lastName: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      email: Joi.string(),
      role: Joi.string(),
      password: Joi.string().min(8).max(16),
    }).validate(body);

    if (validationBody.error)
      throw new BaseError(400, validationBody.error.message);

    return next();
  };

  public getUserById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const validation = Joi.number().required().validate(id);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };

  public getListUsers = (req: Request, res: Response, next: NextFunction) => {
    const { query } = req;

    const validation = Joi.object({
      page: Joi.number().min(1),
      limit: Joi.number().min(1),
      name: Joi.string(),
      lastName: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      email: Joi.string(),
      role: Joi.string(),
    }).validate(query);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };

  public deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const validation = Joi.number().required().validate(id);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };
}
