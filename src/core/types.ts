import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  ObjectLiteral,
} from "typeorm";

export type TGetListArgs<T extends ObjectLiteral> = Partial<{
  search: FindOptionsWhere<T>;
  limit: number;
  skip: number;
  select: FindOptionsSelect<T>;
  order: FindOptionsOrder<T>;
  relations: FindOptionsRelations<T>;
}>;

export type TGetOneArgs<T extends ObjectLiteral> = Omit<
  TGetListArgs<T>,
  "limit" | "skip"
>;
