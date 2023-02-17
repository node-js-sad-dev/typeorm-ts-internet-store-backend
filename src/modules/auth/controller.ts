import { default as UserService } from "../user/service";
import { default as TokenService } from "../token/service";

import { EndpointReturnType, ExtendedRequest } from "../../core/types/router";
import { default as AuthUtils } from "./utils";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";

import jwt from "jsonwebtoken";
import { getToken } from "../../middlewares/auth";

export default class Controller {
  private service: UserService;
  private tokenService: TokenService;

  private utils: AuthUtils;

  constructor() {
    this.service = new UserService();
    this.tokenService = new TokenService();

    this.utils = new AuthUtils();
  }

  public login = async (req: ExtendedRequest): EndpointReturnType => {
    const { login, password } = req.body;

    const [user, userError] = await handleAsync(
      this.service.getUserByLogin(login)
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
      { id: user.id, role: user.role },
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
