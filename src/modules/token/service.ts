import MainService from "../../core/service";
import { Token } from "../../entity/token";

export default class TokenService extends MainService<Token> {
  constructor() {
    super("Token");
  }
}
