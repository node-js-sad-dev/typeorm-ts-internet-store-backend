import WorkerController from "./controller";
import { Router as ExpressRouter } from "express";
import { roleValidation } from "../../middleware/roleValidation";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../core/types/auth";

export default class WorkerRouter {
  private controller: WorkerController;

  public router: ExpressRouter;

  constructor() {
    this.controller = new WorkerController();

    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    this.router.get("/", this.controller.getList);
    this.router.get("/:id", this.controller.getOne);
    this.router.post(
      "/",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.controller.register
    );
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }
}
