import { default as UserService } from ".//service";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";

import { default as AuthUtils } from "../auth/utils";

import { Request } from "express";

export default class Controller {
  private service: UserService;

  private authUtils: AuthUtils;

  constructor() {
    this.service = new UserService();

    this.authUtils = new AuthUtils();
  }

  public register = async (req: Request): EndpointReturnType => {
    const registerFields = req.body;

    const passwordSalt = this.authUtils.generatePasswordSalt();

    const password = this.authUtils.hashPassword(
      registerFields.password,
      passwordSalt
    );

    const [user, userError] = await handleAsync(
      this.service.create({
        ...registerFields,
        password: password,
        passwordSalt: passwordSalt,
      })
    );

    if (userError) throw new BaseError(400, userError);

    return {
      status: 201,
      payload: user,
    };
  };

  public delete = async (req: Request): EndpointReturnType => {
    const { id } = req.user;

    const [deleteUser, deleteUserError] = await handleAsync(
      this.service.delete({ id })
    );

    if (deleteUserError) throw new BaseError(400, "Delete user error");

    return {
      status: 204,
    };
  };

  public update = async (req: Request): EndpointReturnType => {
    const { id } = req.user;

    return {
      status: 200,
    };
  };

  public updateByAdmin = async (req: Request): EndpointReturnType => {
    return {
      status: 200,
    };
  };
}
