import { Product } from "../../entity/product";

export default class ProductView {
  public productWithFormattedSpecs = (product: Product) => {
    const specs: Record<string, any> = {};

    product.specs.forEach((spec) => {
      specs[spec.specName] = spec.specValue;
    });

    return {
      ...product,
      specs: specs,
    };
  };

  public productsWithFormattedSpecs = (products: Product[]) => {
    return products.map((product) => this.productWithFormattedSpecs(product));
  };
}
