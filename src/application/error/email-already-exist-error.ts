import { AppError } from "./application-error";

export class EmailAlreadyExistError extends AppError {
    statusCode = 404
    constructor(email:string){
        super(`${email} already exist try another`)
        this.name = "EmailAlreadyExistError"
    }
}