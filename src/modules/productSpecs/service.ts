import MainService from "../../core/service";
import { ProductSpecs } from "../../entity/productSpecs";

export default class ProductSpecsService extends MainService<ProductSpecs> {
  constructor() {
    super("ProductSpecs");
  }
}
