import ProductService from "./service";
import { Product } from "../../entity/product";

export default class ProductUtils {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public productsWithFormattedSpecs = (products: Product[]) => {
    return products.map((product) => {});
  };
}
