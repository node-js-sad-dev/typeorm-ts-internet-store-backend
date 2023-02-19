import MainService from "../../core/service";
import { Product } from "./model";

export default class ProductService extends MainService<Product> {
  constructor() {
    super("Product");
  }
}
