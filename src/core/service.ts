import { AppDataSource } from "../db";
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { TGetListArgs, TGetOneArgs } from "./types/service";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import UserService from "../modules/user/service";
import { handleAsync } from "../utils/handleAsync";

export default class MainService<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  protected repositoryName: string;

  constructor(repository: string) {
    this.repositoryName = repository;

    this.repository = AppDataSource.getRepository(repository);
  }

  public create = async (data: DeepPartial<T>) => {
    const result = await this.repository.save(data);

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

  public update = async ({
    search,
    update,
  }: {
    search: FindOptionsWhere<T>;
    update: QueryDeepPartialEntity<T>;
  }) => {
    const [result, resultError] = await handleAsync(
      this.repository
        .createQueryBuilder()
        .update(update)
        .where(search)
        .returning("*")
        .updateEntity(true)
        .execute()
    );

    if (resultError) throw new Error("Update error");

    return result.raw;
  };

  public delete = async (search: FindOptionsWhere<T>) => {
    return this.repository.delete(search);
  };

  public exist = async (search: FindOptionsWhere<T>) => {
    return this.repository.exist({ where: search });
  };
}

// setTimeout(async () => {
//   console.log(
//     await new UserService().update({
//       search: { id: 6 },
//       update: { address: "Улица Пушкина дом Колотушкина" },
//     })
//   );
// }, 1000);
