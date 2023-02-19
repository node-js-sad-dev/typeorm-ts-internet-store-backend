import { Product } from "./model";

export type TProductGetListSearchOptions = Partial<
  Product & {
    priceFrom: string;
    priceTo: string;
  }
>;
