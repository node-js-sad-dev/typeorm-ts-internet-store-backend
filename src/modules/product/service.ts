import MainService from "../../core/service";
import { Product } from "./model";
import { TProductGetListSearchOptions } from "./type";

export default class ProductService extends MainService<Product> {
  constructor() {
    super("Product");
  }

  public getListAndCountOfProducts = async (
    page: number,
    limit: number,
    search: TProductGetListSearchOptions
  ) => {
    const queryBuilder = this.repository.createQueryBuilder("product");

    queryBuilder
      .leftJoinAndSelect("product.specs", "specs")
      .leftJoinAndSelect("product.categories", "categories");

    if (search.name)
      queryBuilder.andWhere("product.name ILIKE :name", {
        name: `%${search.name}%`,
      });

    if (search.description)
      queryBuilder.andWhere("product.description ILIKE :description", {
        description: `%${search.description}%`,
      });

    if (search.priceFrom)
      queryBuilder.andWhere("product.price >= :priceFrom", {
        priceFrom: search.priceFrom,
      });

    if (search.priceTo)
      queryBuilder.andWhere("product.price <= :priceTo", {
        priceTo: search.priceTo,
      });

    const totalCount = queryBuilder.getCount();

    queryBuilder.skip((page - 1) * limit).take(limit);

    const result = queryBuilder.getMany();

    return Promise.all([result, totalCount]);
  };
}
