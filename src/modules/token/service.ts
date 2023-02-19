import MainService from "../../core/service";
import { Token } from "./model";

export default class TokenService extends MainService<Token> {
  constructor() {
    super("Token");
  }
}
