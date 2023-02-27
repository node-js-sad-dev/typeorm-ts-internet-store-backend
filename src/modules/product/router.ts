import ProductController from "./controller";

import { Router as ExpressRouter } from "express";
import ProductValidation from "./validation";
import { auth } from "../../middlewares/auth";
import { roleValidation } from "../../middlewares/roleValidation";
import { UserRole } from "../auth/type";
import { requestHandler } from "../../middlewares/requestHandler";

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
    this.router.get(
      "",
      this.validator.getListOfProducts,
      requestHandler(this.controller.get)
    );
    this.router.get(
      "/:id",
      this.validator.getProductById,
      requestHandler(this.controller.getById)
    );
    this.router.post(
      "",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validator.createProduct,
      requestHandler(this.controller.create)
    );
    this.router.put(
      "/:id",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validator.updateProduct,
      requestHandler(this.controller.update)
    );
    this.router.delete(
      "/:id",
      auth,
      roleValidation([UserRole.ADMIN]),
      this.validator.deleteProduct,
      requestHandler(this.controller.delete)
    );
  }
}
