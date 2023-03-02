import UserService from ".//service";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";

import AuthUtils from "../auth/utils";

import { Request } from "express";
import UserUtils from "./utils";
import { FindOptionsWhere } from "typeorm";
import { User } from "../../entity/user";

export default class UserController {
  private service: UserService;

  private utils: UserUtils;

  private authUtils: AuthUtils;

  constructor() {
    this.service = new UserService();

    this.utils = new UserUtils();

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

    if (userError) throw new BaseError(400, "Register user error");

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

    const updatedUsers = await this.utils.updateUser(id, req.body);

    if (updatedUsers.length === 0)
      throw new BaseError(400, "User update error");

    return {
      status: 200,
      payload: updatedUsers[0],
    };
  };

  public updateByAdmin = async (req: Request): EndpointReturnType => {
    const { id } = req.params;

    const updatedUsers = await this.utils.updateUser(parseInt(id), req.body);

    if (updatedUsers.length === 0) throw new BaseError(400, "User not found");

    return {
      status: 200,
      payload: updatedUsers[0],
    };
  };

  public get = async (req: Request): EndpointReturnType => {
    const { page, limit, ...searchOptions } = req.query;

    const [[result, totalCount], getAndCountError] = await handleAsync(
      this.service.getListAndCountOfUsers(
        searchOptions as Partial<User>,
        page ? parseInt(page as string) : 1,
        limit ? parseInt(limit as string) : 10
      )
    );

    if (getAndCountError) throw new BaseError(400, "Get users and count error");

    return {
      status: 200,
      payload: {
        result,
        totalCount,
      },
    };
  };

  public getCurrentUser = async (req: Request): EndpointReturnType => {
    const [user, userError] = await handleAsync(
      this.service.getOne({ search: { id: req.user.id } })
    );

    if (userError) throw new BaseError(400, "Get user error");

    return {
      status: 200,
      payload: user,
    };
  };

  public getById = async (req: Request): EndpointReturnType => {
    const { id } = req.params;

    const [user, userError] = await handleAsync(
      this.service.getOne({ search: { id: parseInt(id) } })
    );

    if (userError) throw new BaseError(400, "Get user error");

    if (!user) throw new BaseError(404, "User not found");

    return {
      status: 200,
      payload: user,
    };
  };
}
