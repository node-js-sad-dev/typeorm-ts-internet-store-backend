import { Router as ExpressRouter } from "express";

import { default as AuthRouter } from "./modules/auth/router";
import UserRouter from "./modules/user/router";
import ProductRouter from "./modules/product/router";

export default class RootRouter {
  public router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    this.router.use("/auth", new AuthRouter().router);
    this.router.use("/user", new UserRouter().router);
    this.router.use("/product", new ProductRouter().router);
  }
}
