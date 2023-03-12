import UserService from ".//service";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";

import { Request } from "express";
import UserUtils from "./utils";
import { User } from "../../entity/user";
import AuthUtils from "../../utils/auth";
import DBError from "../../core/errors/DBError";

export default class UserController {
  private service: UserService;

  private utils: UserUtils;

  private authUtils: AuthUtils;

  constructor() {
    this.service = new UserService();

    this.utils = new UserUtils();

    this.authUtils = new AuthUtils();
  }

  public delete = async (req: Request): EndpointReturnType => {
    const { id } = req.user;

    const { result: deleteUser, error: deleteUserError } = await handleAsync(
      this.service.delete({ id })
    );

    if (deleteUserError) throw new DBError("Delete user error");

    return {
      status: 204,
    };
  };

  public update = async (req: Request): EndpointReturnType => {
    const { id } = req.user;

    const { result: usersUpdateResult, error: updateUsersError } =
      await handleAsync(this.utils.updateUser(id, req.body));

    if (updateUsersError) throw new DBError(updateUsersError);

    const { raw: updatedUsers } = usersUpdateResult!;

    if (!updatedUsers || updatedUsers.length === 0)
      throw new BaseError(400, "User update error");

    return {
      status: 200,
      payload: updatedUsers[0],
    };
  };

  public updateByAdmin = async (req: Request): EndpointReturnType => {
    const { id } = req.params;

    const { result: usersUpdateResult, error: updateUsersError } =
      await handleAsync(this.utils.updateUser(parseInt(id), req.body));

    if (updateUsersError) throw new DBError(updateUsersError);

    const { raw: updatedUsers } = usersUpdateResult!;

    if (updatedUsers.length === 0)
      throw new BaseError(400, "User update error");

    return {
      status: 200,
      payload: updatedUsers[0],
    };
  };

  public get = async (req: Request): EndpointReturnType => {
    const { page, limit, ...searchOptions } = req.query;

    const { result: usersListAndCount, error: getListAndCountError } =
      await handleAsync(
        Promise.all([
          this.service.getListOfUsers(
            searchOptions as Partial<User>,
            page ? parseInt(page as string) : 1,
            limit ? parseInt(limit as string) : 10
          ),
          this.service.getCountOfUsers(searchOptions as Partial<User>),
        ])
      );

    if (getListAndCountError) throw new DBError("Get users and count error");

    const [result, totalCount] = usersListAndCount!;

    return {
      status: 200,
      payload: {
        result,
        totalCount,
      },
    };
  };

  public getCurrentUser = async (req: Request): EndpointReturnType => {
    const { result: user, error: userError } = await handleAsync(
      this.service.getOne({ search: { id: req.user.id } })
    );

    if (userError) throw new DBError(userError);

    return {
      status: 200,
      payload: user,
    };
  };

  public getById = async (req: Request): EndpointReturnType => {
    const { id } = req.params;

    const { result: user, error: userError } = await handleAsync(
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
