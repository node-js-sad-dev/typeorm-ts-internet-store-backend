import MainService from "../../core/service";
import { Client } from "./model";

export default class Service extends MainService<Client> {
  constructor() {
    super("Client");
  }

  public getClientByLogin = async (login: string) => {
    return this.repository
      .createQueryBuilder("client")
      .where("client.phone = :login OR client.email = :login", { login })
      .getOne();
  };
}
