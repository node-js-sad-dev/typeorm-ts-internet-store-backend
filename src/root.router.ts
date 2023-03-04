import { Router as ExpressRouter } from "express";

import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./utils/swagger/swagger.setup";

import UserRouter from "./modules/user/router";
import ProductRouter from "./modules/product/router";
import WorkerRouter from "./modules/worker/router";
import UserAuthRouter from "./modules/userAuth/router";
import WorkerAuthRouter from "./modules/workerAuth/router";

export default class RootRouter {
  public router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    if (process.env.NODE_ENV !== "production") {
      this.router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
    }

    this.router.use("/user/auth", new UserAuthRouter().router);
    this.router.use("/user", new UserRouter().router);
    this.router.use("/product", new ProductRouter().router);
    this.router.use("/worker/auth", new WorkerAuthRouter().router);
    this.router.use("/worker", new WorkerRouter().router);

    this.router.get("/version", (req, res) => res.json({ version: 1 }));
    this.router.get("/health", (req, res) => res.json({ status: "ok" }));
  }
}
