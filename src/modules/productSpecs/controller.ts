import ProductSpecsService from "./service";
import { Request } from "express";

export default class ProductSpecsController {
  private service: ProductSpecsService;

  constructor() {
    this.service = new ProductSpecsService();
  }

  public getList = async (req: Request) => {};
}
