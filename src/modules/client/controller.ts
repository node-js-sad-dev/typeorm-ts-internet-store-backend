import { default as ClientService } from "../client/service";
import { EndpointReturnType, ExtendedRequest } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";

import { default as AuthUtils } from "../auth/utils";

export default class Controller {
  private service: ClientService;

  private authUtils: AuthUtils;

  constructor() {
    this.service = new ClientService();

    this.authUtils = new AuthUtils();
  }

  public register = async (req: ExtendedRequest): EndpointReturnType => {
    const registerFields = req.body;

    const passwordSalt = this.authUtils.generatePasswordSalt();

    const password = this.authUtils.hashPassword(
      registerFields.password,
      passwordSalt
    );

    const [client, clientError] = await handleAsync(
      this.service.create({
        ...registerFields,
        password: password,
        passwordSalt: passwordSalt,
      })
    );

    if (clientError) throw new BaseError(400, clientError);

    return {
      status: 201,
      payload: client,
    };
  };
}
