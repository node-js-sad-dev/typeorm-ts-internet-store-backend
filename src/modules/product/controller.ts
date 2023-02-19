import ProductService from "./service";

export default class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }
}
