import { FastifyRequest } from "fastify";
import { Role } from "../@types/fastify";
import { RoleError } from "../errors/role-error";

export function roleVerifyMiddleware(roles: Role[]) {
    const verify = async (request: FastifyRequest) => {
        const roleIsAllowed = roles.includes(request.user.role)
        if (roleIsAllowed === false) {
            throw new RoleError(roles, request.user.role)
        }
    }

    return verify
}