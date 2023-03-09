import WorkerAuthController from "./controller";

import { Router as ExpressRouter } from "express";
import { loginValidate } from "../../utils/validate";
import { requestHandler } from "../../middleware/requestHandler";
import { auth } from "../../middleware/auth";
import { roleValidation } from "../../middleware/roleValidation";
import { UserRole } from "../../core/types/auth";
import WorkerAuthValidation from "./validation";

export default class WorkerAuthRouter {
  private controller: WorkerAuthController;

  public router: ExpressRouter;

  private validator: WorkerAuthValidation;

  constructor() {
    this.controller = new WorkerAuthController();

    this.router = ExpressRouter();

    this.validator = new WorkerAuthValidation();

    this.routes();
  }

  private routes() {
    this.router.post(
      "/register",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validator.workerRegisterValidation,
      requestHandler(this.controller.register)
    );
    this.router.post(
      "/login",
      loginValidate,
      requestHandler(this.controller.login)
    );

    this.router.post("/logout", auth, requestHandler(this.controller.logout));
  }
}
