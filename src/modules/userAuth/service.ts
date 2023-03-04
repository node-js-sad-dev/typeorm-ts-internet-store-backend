import MainService from "../../core/service";
import { UserAuth } from "../../entity/userAuth";

export default class UserAuthService extends MainService<UserAuth> {
  constructor() {
    super("UserAuth");
  }
}
