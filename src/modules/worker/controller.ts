import WorkerService from "./service";
import { Request } from "express";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";
import DBError from "../../core/errors/DBError";

export default class WorkerController {
  private service: WorkerService;

  constructor() {
    this.service = new WorkerService();
  }

  public getMe = async (req: Request): EndpointReturnType => {
    const { result: worker, error: workerError } = await handleAsync(
      this.service.getOne({
        search: { id: req.user.id },
      })
    );

    if (workerError) throw new DBError(workerError);

    return {
      status: 200,
      payload: worker,
    };
  };

  public getList = async (req: Request): EndpointReturnType => {
    // const [[result, totalCount], resultError] = await this.service.getList({});
    return {
      status: 200,
    };
  };

  public getOne = async (req: Request): EndpointReturnType => {
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

    const { result: workerExist, error: workerExistError } = await handleAsync(
      this.service.exist({ id: parseInt(id) })
    );

    if (workerExistError) throw new DBError(workerExistError);

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
