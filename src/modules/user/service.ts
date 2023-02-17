import MainService from "../../core/service";
import { User } from "./model";

export default class Service extends MainService<User> {
  constructor() {
    super("User");
  }

  public getUserByLogin = async (login: string) => {
    return this.repository
      .createQueryBuilder("User")
      .where("user.phone = :login OR user.email = :login", { login })
      .getOne();
  };
}
