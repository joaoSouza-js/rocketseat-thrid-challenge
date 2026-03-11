import { makeCreatePetUseCase } from "@/application/use-cases/factories/pet/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const createPetSchema = z.object({
  name: z.string(),
  state: z.string(),
  city: z.string(),
  description: z.string(),
  size: z.enum(["small", "medium", "large"]),
  dependence: z.enum(["low", "medium", "high"]),
  energy: z.enum(["low", "medium", "high"]),
});

export async function createPetController(request: FastifyRequest, reply: FastifyReply) {
  const body = createPetSchema.parse(request.body);
  const createPetUseCase = makeCreatePetUseCase();
  const response = await createPetUseCase.execute({
    city: body.city,
    dependence: body.dependence,
    description: body.description,
    energy: body.energy,
    name: body.name,
    orgId: request.user.sub,
    size: body.size,
    state: body.state,
  });

  reply.status(201).send(response);
}
