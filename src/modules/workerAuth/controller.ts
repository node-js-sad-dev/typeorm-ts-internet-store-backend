import WorkerAuthService from "./service";
import AuthUtils from "../../utils/auth";
import WorkerService from "../worker/service";
import { Request } from "express";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";
import jwt from "jsonwebtoken";
import { getToken } from "../../middleware/auth";
import DBError from "../../core/errors/DBError";
import NotFoundError from "../../core/errors/NotFoundError";

export default class WorkerAuthController {
  private service: WorkerAuthService;
  private utils: AuthUtils;

  private workerService: WorkerService;

  constructor() {
    this.service = new WorkerAuthService();
    this.utils = new AuthUtils();

    this.workerService = new WorkerService();
  }

  public register = async (req: Request): EndpointReturnType => {
    const { body: workerInfo } = req;

    const { result: worker, error: workerError } = await handleAsync(
      this.service.create(workerInfo)
    );

    if (workerError) throw new DBError(workerError);

    try {
    } catch (e) {}

    return {
      status: 200,
    };
  };

  public login = async (req: Request): EndpointReturnType => {
    const { login, password } = req.body;

    const { result: worker, error: workerError } = await handleAsync(
      this.workerService.getByLogin(login)
    );

    if (workerError) throw new DBError(workerError);

    if (!worker) throw new NotFoundError("Worker with such login not found");

    const validPassword = this.utils.checkPassword(
      password,
      worker.password,
      worker.passwordSalt
    );

    if (!validPassword) throw new BaseError(403, "Wrong password");

    const token = jwt.sign(
      { id: worker.id, role: worker.role },
      process.env.JWT_SECRET as string
    );

    const { result: workerAuth, error: workerAuthError } = await handleAsync(
      this.service.create({ worker: { id: worker.id }, token: token })
    );

    if (workerAuthError) throw new DBError(workerAuthError);

    return {
      status: 200,
      payload: {
        worker,
        token,
      },
    };
  };

  public logout = async (req: Request): EndpointReturnType => {
    const { token } = getToken(req.headers.authorization as string);

    try {
      await this.service.update({
        search: { token: token },
        update: { isExpired: true },
      });
    } catch (e) {
      throw new BaseError(400, "Token write to db error");
    }

    return {
      status: 204,
    };
  };
}
