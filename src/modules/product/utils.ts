import ProductService from "./service";
import { Product } from "./model";

export default class ProductUtils {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public productsWithFormattedSpecs = (products: Product[]) => {
    return products.map((product) => {
      const specs: Record<string, any> = {};

      product.specs.forEach((spec) => {
        specs[spec.specName] = spec.specValue;
      });

      return {
        ...product,
        specs: specs,
      };
    });
  };
}
