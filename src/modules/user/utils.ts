import UserService from "./service";
import { User } from "../../entity/user";
import BaseError from "../../core/errors/BaseError";
import { handleAsync } from "../../utils/handleAsync";

import AuthUtils from "../auth/utils";

export default class UserUtils {
  private service: UserService;

  private authUtils: AuthUtils;

  constructor() {
    this.service = new UserService();

    this.authUtils = new AuthUtils();
  }

  public updateUser = async (id: number, updateFields: Partial<User>) => {
    if (updateFields.password) {
      const passwordSalt = this.authUtils.generatePasswordSalt();

      const password = this.authUtils.hashPassword(
        updateFields.password,
        passwordSalt
      );

      updateFields.password = password;
      updateFields.passwordSalt = passwordSalt;
    }

    const [user, userError] = await handleAsync(
      this.service.update({
        search: { id },
        update: updateFields,
      })
    );

    if (userError) throw new BaseError(400, "Update user error");

    return user;
  };
}
