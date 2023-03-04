import UserController from ".//controller";

import { Router as ExpressRouter } from "express";
import { auth } from "../../middleware/auth";
import UserValidation from "./validation";
import { requestHandler } from "../../middleware/requestHandler";
import { roleValidation } from "../../middleware/roleValidation";
import { UserRole } from "../../core/types/auth";

export default class UserRouter {
  public router: ExpressRouter;

  public validation: UserValidation;

  public controller: UserController;

  constructor() {
    this.router = ExpressRouter();

    this.controller = new UserController();

    this.validation = new UserValidation();

    this.routes();
  }

  private routes() {
    this.router.delete(
      "/delete",
      auth,
      this.validation.deleteUser,
      requestHandler(this.controller.delete)
    );
    this.router.post(
      "/register",
      this.validation.registerUser,
      requestHandler(this.controller.register)
    );
    this.router.put(
      "/update",
      auth,
      this.validation.updateUser,
      requestHandler(this.controller.update)
    );
    this.router.put(
      "/:id/update",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validation.updateUserByAdmin,
      requestHandler(this.controller.updateByAdmin)
    );
    this.router.get(
      "/me",
      auth,
      requestHandler(this.controller.getCurrentUser)
    );
    this.router.get(
      "/:id",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validation.getUserById,
      requestHandler(this.controller.getById)
    );
    this.router.get(
      "/",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validation.getListUsers,
      requestHandler(this.controller.get)
    );
  }
}
