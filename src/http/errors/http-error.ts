export abstract class HttpError extends Error {
  protected constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
