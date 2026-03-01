import { AppError } from "./application-error";

export class ResourceNotFoundError extends AppError {
    statusCode = 404
    constructor(resourceName: string) {
        super(`${resourceName} not found or does not exist`);
        this.name = "ResourceNotFoundError";
    }
}