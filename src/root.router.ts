import { Router as ExpressRouter } from "express";

import { default as AuthRouter } from "./modules/auth/router";
import UserRouter from "./modules/user/router";
import ProductRouter from "./modules/product/router";
import WorkerRouter from "./modules/worker/router";
import { User } from "./entity/user";
import { Worker } from "./entity/worker";

export default class RootRouter {
  public router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    this.router.use("/user/auth", new AuthRouter(User).router);
    this.router.use("/user", new UserRouter().router);
    this.router.use("/product", new ProductRouter().router);
    this.router.use("/worker/auth", new AuthRouter(Worker).router);
    this.router.use("/worker", new WorkerRouter().router);
  }
}
