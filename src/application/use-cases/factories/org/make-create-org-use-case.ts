import { BcryptHashGenerator } from "@/infra/hash-generator/bcrypt-hash-generator";
import { NodeIdGenerator } from "@/infra/id-generator/node-id-generator";
import { PrismaOrgRepository } from "@/infra/repositories/prisma/prisma-org-repository";
import { CreateOrgUseCase } from "../../org/create-org";

export function makeCreateOrgUseCase() {
    const orgsRepository = new PrismaOrgRepository()
    const idGenerator = new NodeIdGenerator()
    const hasGenerator = new BcryptHashGenerator()
    const createOrgUseCase = new CreateOrgUseCase({
        repositories: {
            orgs: orgsRepository,
        },
        services: {
            idGenerator: idGenerator,
            hashGenerator: hasGenerator
        }

    })

    return createOrgUseCase
}