import BaseError from "./BaseError";

export default class AccessDeniedError extends BaseError {
  constructor(message: string) {
    super(403, message);
  }
}
