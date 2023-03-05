import { Product } from "../../entity/product";

export type TProductGetListSearchOptions = Partial<
  Product & {
    priceFrom: string;
    priceTo: string;
  }
>;

export enum ProductSpecType {
  NUMBER = "number",
  STRING = "string",
  OBJECT = "object",
  BOOLEAN = "bool",
}
