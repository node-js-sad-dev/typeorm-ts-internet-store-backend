import ProductService from "./service";
import { Request } from "express";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";
import { TProductGetListSearchOptions } from "./type";
import ProductUtils from "./utils";
import DBError from "../../core/errors/DBError";
import ProductView from "./view";

export default class ProductController {
  private service: ProductService;
  private utils: ProductUtils;
  private view: ProductView;

  constructor() {
    this.service = new ProductService();
    this.utils = new ProductUtils();
    this.view = new ProductView();
  }

  public get = async (req: Request): EndpointReturnType => {
    const { page, limit, ...searchOptions } = req.query;

    const { result: productListAndCount, error: getAndCountError } =
      await handleAsync(
        this.service.getListAndCountOfProducts(
          page ? parseInt(page as string) : 1,
          limit ? parseInt(limit as string) : 10,
          searchOptions as TProductGetListSearchOptions
        )
      );

    if (getAndCountError) throw new DBError(getAndCountError);

    const [products, totalCount] = productListAndCount!;

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

    const { result, error: getError } = await handleAsync(
      this.service.getOne({
        search: { id: parseInt(id) },
        relations: {
          categories: true,
          specs: true,
        },
      })
    );

    if (getError) throw new DBError(getError);

    if (!result) throw new BaseError(404, "Product not found");

    return {
      status: 200,
      payload: result,
    };
  };

  public create = async (req: Request): EndpointReturnType => {
    const { result, error: createError } = await handleAsync(
      this.service.create(req.body)
    );

    if (createError) throw new DBError(createError);

    return {
      status: 201,
      payload: result,
    };
  };

  public delete = async (req: Request): EndpointReturnType => {
    const { id } = req.params;

    const { result, error: deleteError } = await handleAsync(
      this.service.delete({ id: parseInt(id) })
    );

    if (deleteError) throw new DBError(deleteError);

    return {
      status: 200,
      payload: result,
    };
  };

  public update = async (req: Request): EndpointReturnType => {
    const { id } = req.params;

    const { result, error: updateError } = await handleAsync(
      this.service.update({
        search: { id: parseInt(id) },
        update: req.body,
      })
    );

    if (updateError) throw new DBError(updateError);

    return {
      status: 200,
      payload: result,
    };
  };
}
