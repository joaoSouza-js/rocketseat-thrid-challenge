import { NodeIdGenerator } from "@/infra/id-generator/node-id-generator";
import { PrismaOrgRepository } from "@/infra/repositories/prisma/prisma-org-repository";
import { PrismaPetRepository } from "@/infra/repositories/prisma/prisma-pet-repository";
import { CreatePetUseCase } from "../../pet/create-pet";

export function makeCreatePetUseCase() {
    const petsRepository = new PrismaPetRepository();
    const orgsRepository = new PrismaOrgRepository()
    const idGenerator = new NodeIdGenerator()
    const createPetUseCase = new CreatePetUseCase({
        repositories: {
            orgs: orgsRepository,
            pets: petsRepository,
        },
        services: {
            idGenerator: idGenerator
        }
    })

    return createPetUseCase
}