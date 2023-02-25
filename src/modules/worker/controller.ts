import WorkerService from "./service";
import { Request } from "express";
import { EndpointReturnType } from "../../core/types/router";

export default class WorkerController {
  private workerService: WorkerService;

  constructor() {
    this.workerService = new WorkerService();
  }

  public getList = async (req: Request): EndpointReturnType => {
    return {
      status: 200,
    };
  };

  public getOne = async (req: Request): EndpointReturnType => {
    return {
      status: 200,
    };
  };

  public create = async (req: Request): EndpointReturnType => {
    return {
      status: 200,
    };
  };

  public update = async (req: Request): EndpointReturnType => {
    return {
      status: 200,
    };
  };

  public delete = async (req: Request): EndpointReturnType => {
    return {
      status: 200,
    };
  };
}
