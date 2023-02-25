import MainService from "../../core/service";
import { ProductSpecs } from "./model";

export default class ProductSpecsService extends MainService<ProductSpecs> {
  constructor() {
    super("ProductSpecs");
  }
}
