import { FastifyRequest } from "fastify";
import { JwtError } from "../errors/jwt-error";

export async function jwtMiddleware(request: FastifyRequest) {
  try {
    request.jwtVerify();
  } catch (error) {
    throw new JwtError(error);
  }
}
