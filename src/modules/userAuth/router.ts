import UserAuthController from "./controller";

import { Router as ExpressRouter } from "express";
import { loginValidate } from "../../validation";
import { requestHandler } from "../../middleware/requestHandler";
import { auth } from "../../middleware/auth";
import UserAuthValidation from "./validation";

export default class UserAuthRouter {
  private controller: UserAuthController;

  private validator: UserAuthValidation;

  public router: ExpressRouter;

  constructor() {
    this.controller = new UserAuthController();

    this.validator = new UserAuthValidation();

    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    this.router.post(
      "/register",
      this.validator.registerUser,
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
