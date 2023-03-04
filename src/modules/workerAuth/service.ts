import MainService from "../../core/service";
import { WorkerAuth } from "../../entity/workerAuth";

export default class WorkerAuthService extends MainService<WorkerAuth> {
  constructor() {
    super("WorkerAuth");
  }
}
