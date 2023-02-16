import MainService from "../../core/service";
import { Token } from "./model";

export default class Service extends MainService<Token> {
  constructor() {
    super("Token");
  }
}
