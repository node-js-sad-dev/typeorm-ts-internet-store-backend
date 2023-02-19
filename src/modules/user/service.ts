import MainService from "../../core/service";
import { User } from "./model";
import { FindOptionsWhere } from "typeorm";

export default class UserService extends MainService<User> {
  constructor() {
    super("User");
  }

  public getUserByLogin = async (login: string) => {
    return this.repository
      .createQueryBuilder("user")
      .where("user.phone = :login OR user.email = :login", { login })
      .getOne();
  };

  public getListAndCountOfUsers = async (options: FindOptionsWhere<User>, page: number, limit: number) => {
    const queryBuilder = this.repository.createQueryBuilder("user");

    if (options.name) queryBuilder.andWhere("user.name ILIKE :name", { name: `%${options.name}%` });

    if (options.lastName) queryBuilder.andWhere("user.lastName ILIKE :lastName", { lastName: `%${options.lastName}%` });

    if (options.phone) queryBuilder.andWhere("user.phone ILIKE :phone", { phone: `%${options.phone}%` });

    if (options.email) queryBuilder.andWhere("user.email ILIKE :email", { email: `%${options.email}%` });

    if (options.role) queryBuilder.andWhere("user.role = :role", { role: options.role });

    if (options.address) queryBuilder.andWhere("user.address ILIKE :address", { address: `%${options.address}%` });

    const totalCount = queryBuilder.getCount();

    queryBuilder.skip((page - 1) * limit).take(limit);

    const result = queryBuilder.getMany();

    console.log(queryBuilder.getSql());

    return Promise.all([result, totalCount]);
  };
}
