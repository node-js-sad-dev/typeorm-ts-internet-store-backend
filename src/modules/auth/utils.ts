import { createHmac } from "crypto";
import { getRandomInt } from "../../utils/random";

export default class Utils {
  private readonly PASSWORD_SALT_LENGTH = 6;

  public generatePasswordSalt() {
    const alphabet = "qwertyuiopasdfghjklzxcvbnm1234567890";

    const passwordSalt = [];

    for (let i = 0; i < this.PASSWORD_SALT_LENGTH; i++) {
      const index = getRandomInt(0, alphabet.length - 1);

      passwordSalt.push(alphabet[index]);
    }

    return passwordSalt.join("");
  }

  public checkPassword(
    passwordFromClient: string,
    passwordFromDb: string,
    passwordSalt: string
  ) {
    const hashedPasswordFromClient = this.hashPassword(
      passwordFromClient,
      passwordSalt
    );

    return hashedPasswordFromClient === passwordFromDb;
  }

  public hashPassword = (password: string, passwordSalt: string) => {
    const hmac = createHmac("md5", passwordSalt);

    return hmac.update(password).digest("hex");
  };
}
