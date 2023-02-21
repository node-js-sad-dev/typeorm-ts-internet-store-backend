import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import BaseError from "../../core/errors/BaseError";

export default class ProductValidation {
  public getListOfProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { query } = req;

    const validation = Joi.object({
      page: Joi.number().min(1),
      limit: Joi.number().min(1),
      name: Joi.string(),
      description: Joi.string(),
      priceFrom: Joi.number().min(0),
      priceTo: Joi.number().min(1),
    }).validate(query);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };

  public getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const validation = Joi.number().required().validate(id);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };

  public createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const validation = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(0).required(),
      specs: Joi.array().items(Joi.number()).required(),
      categories: Joi.array().items(Joi.number()).required(),
    }).validate(body);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };

  public updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const validationId = Joi.number().required().validate(id);

    if (validationId.error)
      throw new BaseError(400, validationId.error.message);

    const { body } = req;

    const validationBody = Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number().min(0),
      specs: Joi.array().items(Joi.number()),
      categories: Joi.array().items(Joi.number()),
    }).validate(body);

    if (validationBody.error)
      throw new BaseError(400, validationBody.error.message);

    return next();
  };

  public deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const validation = Joi.number().required().validate(id);

    if (validation.error) throw new BaseError(400, validation.error.message);

    return next();
  };
}
