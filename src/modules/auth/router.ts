import { Router as ExpressRouter } from "express";

import AuthController from "./controller";
import AuthValidator from "./validation";

import { requestHandler } from "../../middlewares/requestHandler";
import { auth } from "../../middlewares/auth";

export default class AuthRouter {
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
      this.validator.loginUser,
      requestHandler(this.controller.loginUser)
    );

    this.router.post("/logout", auth, requestHandler(this.controller.logout));
  }
}
