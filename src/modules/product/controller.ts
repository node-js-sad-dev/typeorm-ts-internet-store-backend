import ProductService from "./service";
import { Request } from "express";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";
import { TProductGetListSearchOptions } from "./type";
import ProductUtils from "./utils";

export default class ProductController {
  private service: ProductService;

  private utils: ProductUtils;

  constructor() {
    this.service = new ProductService();

    this.utils = new ProductUtils();
  }

  public get = async (req: Request): EndpointReturnType => {
    const { page, limit, ...searchOptions } = req.query;

    const [[products, totalCount], getAndCountError] = await handleAsync(
      this.service.getListAndCountOfProducts(
        page ? parseInt(page as string) : 1,
        limit ? parseInt(limit as string) : 10,
        searchOptions as TProductGetListSearchOptions
      )
    );

    if (getAndCountError) throw new BaseError(400, "Get users and count error");

    const result = this.utils.productsWithFormattedSpecs(products);

    return {
      status: 200,
      payload: {
        result,
        totalCount,
      },
    };
  };

  public getById = async (req: Request): EndpointReturnType => {
    const { id } = req.params;

    const [result, getError] = await handleAsync(
      this.service.getOne({
        search: { id: parseInt(id) },
        relations: {
          categories: true,
          specs: true,
        },
      })
    );

    if (getError) throw new BaseError(400, "Get user error");

    if (!result) throw new BaseError(404, "Product not found");

    return {
      status: 200,
      payload: result,
    };
  };

  public create = async (req: Request): EndpointReturnType => {
    const [result, createError] = await handleAsync(
      this.service.create(req.body)
    );

    if (createError) throw new BaseError(400, "Create user error");

    return {
      status: 201,
      payload: result,
    };
  };

  public delete = async (req: Request): EndpointReturnType => {
    const { id } = req.params;

    const [result, deleteError] = await handleAsync(
      this.service.delete({ id: parseInt(id) })
    );

    if (deleteError) throw new BaseError(400, "Delete user error");

    return {
      status: 200,
      payload: result,
    };
  };

  public update = async (req: Request): EndpointReturnType => {
    const { id } = req.params;

    const [result, updateError] = await handleAsync(
      this.service.update({
        search: { id: parseInt(id) },
        update: req.body,
      })
    );

    if (updateError) throw new BaseError(400, "Update user error");

    return {
      status: 200,
      payload: result,
    };
  };
}
