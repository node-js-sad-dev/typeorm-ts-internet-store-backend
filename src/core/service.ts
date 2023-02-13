import { AppDataSource } from "../db";
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { TGetListArgs, TGetOneArgs } from "./types";

export default class MainService<T extends ObjectLiteral> {
  private repository: Repository<T>;

  constructor(repository: string) {
    this.repository = AppDataSource.getRepository(repository);
  }

  public create = async (data: DeepPartial<T>) => {
    const result = this.repository.create(data);

    //TODO -> add localization if needed

    return result;
  };

  public getList = async ({
    search = {},
    limit = 10,
    skip = 0,
    select = {},
    order = {},
    relations = {},
  }: TGetListArgs<T>) => {
    const result = await this.repository.find({
      where: search,
      skip: skip,
      take: limit,
      select: select,
      order: order,
      relations: relations,
    });

    // TODO -> add localization

    return result;
  };

  public getOne = async ({
    search = {},
    select = {},
    order = {},
    relations = {},
  }: TGetOneArgs<T>) => {
    const result = await this.repository.findOne({
      where: search,
      select: select,
      order: order,
      relations: relations,
    });

    // TODO -> add localization

    return result;
  };

  public getCount = async (search: FindOptionsWhere<T>) => {
    return this.repository.count({ where: search });
  };
}
