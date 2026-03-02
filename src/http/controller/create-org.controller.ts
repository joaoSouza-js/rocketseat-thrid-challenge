import { makeCreateOrgUseCase } from "@/application/use-cases/factories/org/make-create-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export const createOrgSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    phone: z.string(),
    password: z.string(),
    description: z.string()
})


export async function createOrgController(request: FastifyRequest, reply: FastifyReply) {
    const schema = createOrgSchema.parse(request.body)
    const createOrgUseCase = makeCreateOrgUseCase()
    const response = await createOrgUseCase.execute(schema)
    reply.status(201).send(response)
}