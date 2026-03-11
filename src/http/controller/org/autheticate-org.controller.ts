import { makeAuthenticateOrgUseCase } from "@/application/use-cases/factories/org/make-authenticate-org";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const authenticateOrgSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function authenticateOrgController(request: FastifyRequest, reply: FastifyReply) {
  const body = authenticateOrgSchema.parse(request.body);
  const authenticateOrgUseCase = makeAuthenticateOrgUseCase();
  const response = await authenticateOrgUseCase.execute({
    email: body.email,
    password: body.password,
  });

  const token = await reply.jwtSign({
    sub: response.org.id,
    role: "ORG",
  });

  const refreshToken = await reply.jwtSign(
    {
      sub: response.org.id,
      role: "ORG",
    },
    { expiresIn: "30d" },
  );

  reply.setCookie("refresh_token", refreshToken, {
    path: "/",
    httpOnly: true,
  });
  reply.status(200).send({
    token: token,
    org: response.org,
  });
}
