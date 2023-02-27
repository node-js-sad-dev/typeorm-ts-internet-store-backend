import UserService from "../user/service";
import TokenService from "../token/service";

import { EndpointReturnType } from "../../core/types/router";
import AuthUtils from "./utils";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";

import jwt from "jsonwebtoken";
import { getToken } from "../../middlewares/auth";

import { Request } from "express";
import { UserRole } from "./type";
import WorkerService from "../worker/service";

export default class AuthController {
  private userService: UserService;
  private workerService: WorkerService;
  private tokenService: TokenService;

  private utils: AuthUtils;

  constructor() {
    this.userService = new UserService();
    this.workerService = new WorkerService();
    this.tokenService = new TokenService();

    this.utils = new AuthUtils();
  }

  public loginUser = async (req: Request): EndpointReturnType => {
    const { login, password } = req.body;

    const [user, userError] = await handleAsync(
      this.userService.getByLogin(login)
    );

    if (userError) throw new BaseError(400, "Check if user exist error");

    if (!user) throw new BaseError(404, "User with such login not found");

    const validPassword = this.utils.checkPassword(
      password,
      user.password,
      user.passwordSalt
    );

    if (!validPassword) throw new BaseError(403, "Wrong password");

    const token = jwt.sign(
      { id: user.id, role: UserRole.USER },
      process.env.JWT_SECRET as string
    );

    return {
      status: 200,
      payload: {
        user,
        token,
      },
    };
  };

  public loginWorker = async (req: Request): EndpointReturnType => {
    const { login, password } = req.body;

    const [worker, workerError] = await handleAsync(
      this.workerService.getByLogin(login)
    );

    if (workerError) throw new BaseError(400, "Check if worker exist error");

    if (!worker) throw new BaseError(404, "Worker with such login not found");

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

    return {
      status: 200,
      payload: {
        user: worker,
        token,
      },
    };
  };

  public logout = async (req: Request): EndpointReturnType => {
    const { token } = getToken(req.headers.authorization as string);

    try {
      await this.tokenService.create({ token: token });
    } catch (e) {
      throw new BaseError(400, "Token write to db error");
    }

    return {
      status: 204,
    };
  };
}
