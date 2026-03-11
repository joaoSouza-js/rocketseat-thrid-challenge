import { HttpError } from "./http-error";

export class JwtError extends HttpError {
  constructor(message: unknown) {
    super(JSON.stringify(message));
    this.name = "JwtError";
  }
}
