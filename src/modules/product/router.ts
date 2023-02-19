import ProductController from "./controller";

import { Router as ExpressRouter } from "express";

export default class ProductRouter {
  private controller: ProductController;

  public router: ExpressRouter;

  constructor() {
    this.controller = new ProductController();

    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    this.router.get("");
  }
}
