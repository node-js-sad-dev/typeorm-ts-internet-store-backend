import WorkerService from "./service";
import { Request } from "express";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";

export default class WorkerController {
  private service: WorkerService;

  constructor() {
    this.service = new WorkerService();
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

  public register = async (req: Request): EndpointReturnType => {
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
    const { id } = req.params;

    const [workerExist, workerExistError] = await handleAsync(
      this.service.exist({ id: parseInt(id) })
    );

    if (workerExistError)
      throw new BaseError(400, "Error while checking worker exist");

    if (!workerExist) throw new BaseError(404, "Worker not found");

    try {
      await this.service.update({
        search: {
          id: parseInt(id),
        },
        update: {
          isDeleted: true,
        },
      });
    } catch (e) {
      throw new BaseError(400, "Error while marking worker as deleted");
    }

    return {
      status: 200,
    };
  };
}
