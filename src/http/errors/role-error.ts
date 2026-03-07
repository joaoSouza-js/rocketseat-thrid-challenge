import { Role } from "../@types/fastify";
import { HttpError } from "./http-error";

export class RoleError extends HttpError {
    constructor(roleAllowed: Role[], role: Role) {
        const roleAllowedFormatted = roleAllowed.join(",")
        const message = ` Role ${role} not allowed. Allowed roles: ${roleAllowedFormatted}`
        super(message)
        this.name = "RoleError"
    }
}