import { Router as ExpressRouter } from "express";

import AuthController from "./controller";
import AuthValidator from "./validation";

import { requestHandler } from "../../middleware/requestHandler";
import { auth } from "../../middleware/auth";
import { User } from "../../entity/user";
import { Worker } from "../../entity/worker";

export default class AuthRouter {
  public router: ExpressRouter;

  private controller: AuthController;

  private validator: AuthValidator;

  constructor(entity: typeof User | typeof Worker) {
    this.controller = new AuthController();

    this.validator = new AuthValidator();

    this.router = ExpressRouter();

    switch (entity) {
      case User:
        this.userRoutes();
        break;
      case Worker:
        this.workerRoutes();
        break;
    }
  }

  private userRoutes() {
    this.router.post(
      "/login",
      this.validator.login,
      requestHandler(this.controller.loginUser)
    );

    this.router.post("/logout", auth, requestHandler(this.controller.logout));
  }

  private workerRoutes() {
    this.router.post(
      "/login",
      this.validator.login,
      requestHandler(this.controller.loginWorker)
    );

    this.router.post("/logout", auth, requestHandler(this.controller.logout));
  }
}
