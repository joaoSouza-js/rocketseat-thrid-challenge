import "@fastify/jwt"

type Role = "ORG" | "USER"

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: { sub: string, role: Role } // payload type is used for signing and verifying
        user: {
            sub: string,
            role: Role
        } // user type is return type of `request.user` object
    }
}