import MainService from "../../core/service";
import Worker from "./model";

export default class WorkerService extends MainService<Worker> {
  constructor() {
    super("Worker");
  }
}
