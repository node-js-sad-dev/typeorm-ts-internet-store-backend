import { default as ClientController } from "../client/controller";

import { Router as ExpressRouter } from "express";

export default class Router {
  public router: ExpressRouter;

  public controller: ClientController;

  constructor() {
    this.router = ExpressRouter();

    this.controller = new ClientController();
  }
}
