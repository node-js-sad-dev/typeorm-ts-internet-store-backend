import MainService from "../../core/service";
import { Worker } from "../../entity/worker";

export default class WorkerService extends MainService<Worker> {
  constructor() {
    super("Worker");
  }

  public getByLogin = async (login: string) => {
    return this.repository
      .createQueryBuilder("worker")
      .where("worker.phone = :login OR worker.email = :login", { login })
      .getOne();
  };

  public getListAndCountBuilder = (options: Partial<Worker>) => {
    const queryBuilder = this.repository.createQueryBuilder("worker");

    if (options.name)
      queryBuilder.andWhere("worker.name ILIKE :name", {
        name: `%${options.name}%`,
      });

    if (options.lastName)
      queryBuilder.andWhere("worker.lastName ILIKE :lastName", {
        lastName: `%${options.lastName}%`,
      });

    if (options.phone)
      queryBuilder.andWhere("worker.phone ILIKE :phone", {
        phone: `%${options.phone}%`,
      });

    if (options.email)
      queryBuilder.andWhere("worker.email ILIKE :email", {
        email: `%${options.email}%`,
      });

    if (options.role)
      queryBuilder.andWhere("worker.role = :role", { role: options.role });

    return queryBuilder;
  };

  public getListOfWorkers = async (
    options: Partial<Worker>,
    page: number,
    limit: number
  ) => {
    return this.getListAndCountBuilder(options)
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  };

  public getCountOfWorkers = async (options: Partial<Worker>) => {
    return this.getListAndCountBuilder(options).getCount();
  };
}
