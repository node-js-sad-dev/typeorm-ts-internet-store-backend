import MainService from "../../core/service";
import { Client } from "./model";

export default class ClientService extends MainService<Client> {
  constructor() {
    super("Client");
  }
}
