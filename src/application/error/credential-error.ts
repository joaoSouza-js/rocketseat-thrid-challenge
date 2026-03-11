import { AppError } from "./application-error";

export class CredentialError extends AppError {
  statusCode = 404;

  constructor() {
    super("Credentials invalid: check your email or password");
    this.name = "CredentialError";
  }
}
