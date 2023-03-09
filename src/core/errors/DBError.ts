import BaseError from "./BaseError";

export default class DBError extends BaseError {
  constructor(message: string) {
    super(500, message);
  }
}
