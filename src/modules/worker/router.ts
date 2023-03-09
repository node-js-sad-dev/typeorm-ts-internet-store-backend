import WorkerController from "./controller";
import { Router as ExpressRouter } from "express";
import { roleValidation } from "../../middleware/roleValidation";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../core/types/auth";
import { requestHandler } from "../../middleware/requestHandler";

export default class WorkerRouter {
  private controller: WorkerController;

  public router: ExpressRouter;

  constructor() {
    this.controller = new WorkerController();

    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    this.router.get(
      "/me",
      auth,
      roleValidation([UserRole.ADMIN, UserRole.WORKER]),
      requestHandler(this.controller.getMe)
    );
    this.router.get(
      "/",
      auth,
      roleValidation([UserRole.ADMIN]),
      requestHandler(this.controller.getList)
    );
    this.router.get(
      "/:id",
      auth,
      roleValidation([UserRole.ADMIN]),
      requestHandler(this.controller.getOne)
    );
    this.router.put(
      "/:id",
      auth,
      roleValidation([UserRole.ADMIN]),
      requestHandler(this.controller.update)
    );
    this.router.delete(
      "/:id",
      auth,
      roleValidation([UserRole.ADMIN]),
      requestHandler(this.controller.delete)
    );
  }
}
