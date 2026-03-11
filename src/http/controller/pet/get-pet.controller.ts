import { makeGetPetUseCase } from "@/application/use-cases/factories/pet/meke-get-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const getPetPathParamsSchema = z.object({
  id: z.string(),
});

export async function getPetController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = getPetPathParamsSchema.parse(request.params);
  const getPetUseCase = makeGetPetUseCase();
  const response = await getPetUseCase.execute({
    id: id,
  });

  reply.send(response);
}
