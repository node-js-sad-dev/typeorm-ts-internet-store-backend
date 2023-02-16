import { Router as ExpressRouter } from "express";

import { default as AuthController } from "./controller";
import { default as AuthValidator } from "./validation";

import { requestHandler } from "../../middlewares/requestHandler";
import { auth } from "../../middlewares/auth";

export default class Router {
  public router: ExpressRouter;

  private controller: AuthController;

  private validator: AuthValidator;

  constructor() {
    this.controller = new AuthController();

    this.validator = new AuthValidator();

    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    this.router.post(
      "/login",
      this.validator.loginClient,
      requestHandler(this.controller.login)
    );

    this.router.post("/logout", auth, requestHandler(this.controller.logout));
  }
}
