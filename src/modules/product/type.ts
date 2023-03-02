import { Product } from "../../entity/product";

export type TProductGetListSearchOptions = Partial<
  Product & {
    priceFrom: string;
    priceTo: string;
  }
>;
