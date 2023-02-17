import { default as UserController } from ".//controller";

import { Router as ExpressRouter } from "express";

export default class Router {
  public router: ExpressRouter;

  public controller: UserController;

  constructor() {
    this.router = ExpressRouter();

    this.controller = new UserController();
  }
}
