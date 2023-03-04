import { createHmac } from "crypto";
import { getRandomInt } from "../../utils/random";

export default class AuthUtils {
  private readonly PASSWORD_SALT_LENGTH = 6;

  public generatePasswordSalt() {
    const alphabet = "qwertyuiopasdfghjklzxcvbnm1234567890";

    const passwordSalt: Array<string> = [];

    for (let i = 0; i < this.PASSWORD_SALT_LENGTH; i++) {
      const index = getRandomInt(0, alphabet.length - 1);

      passwordSalt.push(alphabet[index]);
    }

    return passwordSalt.join("");
  }

  public checkPassword(
    passwordFromUser: string,
    passwordFromDb: string,
    passwordSalt: string
  ) {
    const hashedPasswordFromUser = this.hashPassword(
      passwordFromUser,
      passwordSalt
    );

    return hashedPasswordFromUser === passwordFromDb;
  }

  public hashPassword = (password: string, passwordSalt: string) => {
    const hmac = createHmac("md5", passwordSalt);

    return hmac.update(password).digest("hex");
  };
}
