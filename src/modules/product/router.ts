import ProductController from "./controller";

import { Router as ExpressRouter } from "express";
import ProductValidation from "./validation";
import { auth } from "../../middlewares/auth";
import { roleValidation } from "../../middlewares/roleValidation";
import { UserRole } from "../auth/type";

export default class ProductRouter {
  private controller: ProductController;

  private validator: ProductValidation;

  public router: ExpressRouter;

  constructor() {
    this.controller = new ProductController();

    this.validator = new ProductValidation();

    this.router = ExpressRouter();

    this.routes();
  }

  private routes() {
    this.router.get("", this.validator.getListOfProducts, this.controller.get);
    this.router.get(
      "/:id",
      this.validator.getProductById,
      this.controller.getById
    );
    this.router.post(
      "",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validator.createProduct,
      this.controller.create
    );
    this.router.put(
      "/:id",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validator.updateProduct,
      this.controller.update
    );
    this.router.delete(
      "/:id",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validator.deleteProduct,
      this.controller.delete
    );
  }
}
