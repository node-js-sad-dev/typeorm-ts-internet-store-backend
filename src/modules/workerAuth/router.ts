import WorkerAuthController from "./controller";

import { Router as ExpressRouter } from "express";
import { loginValidate } from "../../utils/validate";
import { requestHandler } from "../../middleware/requestHandler";
import { auth } from "../../middleware/auth";

export default class WorkerAuthRouter {
  private controller: WorkerAuthController;

  public router: ExpressRouter;

  constructor() {
    this.controller = new WorkerAuthController();

    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    this.router.post(
      "/login",
      loginValidate,
      requestHandler(this.controller.login)
    );

    this.router.post("/logout", auth, requestHandler(this.controller.logout));
  }
}
