import ProductSpecsService from "./service";
import { Request } from "express";

export default class ProductSpecsController {
  private service: ProductSpecsService;

  constructor() {
    this.service = new ProductSpecsService();
  }

  public getList = async (req: Request) => {};
  public getOne = async (req: Request) => {};
  public create = async (req: Request) => {};
  public update = async (req: Request) => {};
  public delete = async (req: Request) => {};
}
