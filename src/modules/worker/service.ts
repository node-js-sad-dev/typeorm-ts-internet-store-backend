import MainService from "../../core/service";
import { Worker } from "../../entity/worker";

export default class WorkerService extends MainService<Worker> {
  constructor() {
    super("Worker");
  }

  public getByLogin = async (login: string) => {
    return this.repository
      .createQueryBuilder("worker")
      .where("worker.login = :login", { login })
      .getOne();
  };
}
