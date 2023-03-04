import { Router as ExpressRouter } from "express";

import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./utils/swagger/swagger.setup";

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
    if (process.env.NODE_ENV !== "production") {
      this.router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
    }

    this.router.use("/user/auth", new AuthRouter(User).router);
    this.router.use("/user", new UserRouter().router);
    this.router.use("/product", new ProductRouter().router);
    this.router.use("/worker/auth", new AuthRouter(Worker).router);
    this.router.use("/worker", new WorkerRouter().router);

    this.router.get("/version", (req, res) => res.json({ version: 1 }));
    this.router.get("/health", (req, res) => res.json({ status: "ok" }));
  }
}
