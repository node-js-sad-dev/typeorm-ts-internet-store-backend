import { default as ClientService } from "../client/service";
import { default as TokenService } from "../token/service";

import { EndpointReturnType, ExtendedRequest } from "../../core/types/router";
import { default as AuthUtils } from "./utils";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";

import jwt from "jsonwebtoken";
import { getToken } from "../../middlewares/auth";

export default class Controller {
  private service: ClientService;
  private tokenService: TokenService;

  private utils: AuthUtils;

  constructor() {
    this.service = new ClientService();
    this.tokenService = new TokenService();

    this.utils = new AuthUtils();
  }

  public login = async (req: ExtendedRequest): EndpointReturnType => {
    const { login, password } = req.body;

    const [client, clientError] = await handleAsync(
      this.service.getClientByLogin(login)
    );

    if (clientError) throw new BaseError(400, "Check if client exist error");

    if (!client) throw new BaseError(404, "Client with such login not found");

    const validPassword = this.utils.checkPassword(
      password,
      client.password,
      client.passwordSalt
    );

    if (!validPassword) throw new BaseError(403, "Wrong password");

    const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET as string);

    return {
      status: 200,
      payload: {
        client,
        token,
      },
    };
  };

  public logout = async (req: ExtendedRequest): EndpointReturnType => {
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
