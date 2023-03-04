import UserAuthService from "./service";
import AuthUtils from "../../utils/auth";
import UserService from "../user/service";
import { Request } from "express";
import { EndpointReturnType } from "../../core/types/router";
import { handleAsync } from "../../utils/handleAsync";
import BaseError from "../../core/errors/BaseError";
import jwt from "jsonwebtoken";
import { getToken } from "../../middleware/auth";
import { UserRole } from "../../core/types/auth";

export default class UserAuthController {
  private service: UserAuthService;
  private utils: AuthUtils;

  private userService: UserService;

  constructor() {
    this.service = new UserAuthService();
    this.utils = new AuthUtils();

    this.userService = new UserService();
  }

  public login = async (req: Request): EndpointReturnType => {
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

    const [userAuth, userAuthError] = await handleAsync(
      this.service.create({ userId: user.id, token: token })
    );

    if (userAuthError) throw new BaseError(400, "User auth create error");

    return {
      status: 200,
      payload: {
        user,
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
