import { makeFindPetByLocation } from "@/application/use-cases/factories/pet/make-find-pet-by-location";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const findPetQueryParamsSchema = z.object({
  size: z.enum(["small", "medium", "large"]).optional(),
  dependence: z.enum(["small", "medium", "large"]).optional(),
  energy: z.enum(["low", "medium", "high"]).optional(),
  limit: z.coerce.number().default(10),
  page: z.coerce.number().default(1),
  state: z.string(),
  city: z.string(),
});

export async function findPetByLocationController(request: FastifyRequest, reply: FastifyReply) {
  const queryParams = findPetQueryParamsSchema.parse(request.query);
  const findPetByLocation = makeFindPetByLocation();

  const response = await findPetByLocation.execute({
    city: queryParams.city,
    state: queryParams.state,
    query: {
      size: queryParams.size,
      dependence: queryParams.dependence,
      energy: queryParams.energy,
      limit: queryParams.limit,
      page: queryParams.page,
    },
  });

  reply.send(response);
}
