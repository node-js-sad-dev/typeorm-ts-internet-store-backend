import ProductService from "./service";
import { Request } from "express";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import { User } from "../user/model";
import BaseError from "../../core/errors/BaseError";
import { Product } from "./model";
import { TProductGetListSearchOptions } from "./type";

export default class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public get = async (req: Request): EndpointReturnType => {
    const { page, limit, ...searchOptions } = req.query;

    const [[result, totalCount], getAndCountError] = await handleAsync(
      this.service.getListAndCountOfProducts(
        page ? parseInt(page as string) : 1,
        limit ? parseInt(limit as string) : 10,
        searchOptions as TProductGetListSearchOptions
      )
    );

    if (getAndCountError) throw new BaseError(400, "Get users and count error");

    return {
      status: 200,
      payload: {
        result,
        totalCount,
      },
    };
  };
}
