import { BcryptHashGenerator } from "@/infra/hash-generator/bcrypt-hash-generator";
import { PrismaOrgRepository } from "@/infra/repositories/prisma/prisma-org-repository";
import { AuthenticateOrgUseCase } from "../../org/authenticate-org";

export function makeAuthenticateOrgUseCase() {
    const orgRepository = new PrismaOrgRepository()
    const hashGenerator = new BcryptHashGenerator()

    const useCase = new AuthenticateOrgUseCase({
        repositories: {
            orgs: orgRepository
        },
        services: {
            hashGenerator: hashGenerator
        }
    })

    return useCase
}