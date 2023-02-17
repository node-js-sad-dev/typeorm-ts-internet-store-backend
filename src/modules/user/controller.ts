import { default as UserService } from ".//service";
import { EndpointReturnType, ExtendedRequest } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";

import { default as AuthUtils } from "../auth/utils";

export default class Controller {
  private service: UserService;

  private authUtils: AuthUtils;

  constructor() {
    this.service = new UserService();

    this.authUtils = new AuthUtils();
  }

  public register = async (req: ExtendedRequest): EndpointReturnType => {
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
}
