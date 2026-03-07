import { AuthenticateOrgCommand, AuthenticateOrgResponse } from "@/application/dto/org/authenticate-org";
import { CredentialError } from "@/application/error/credential-error";
import { ResourceNotFoundError } from "@/application/error/resource-not-found-error";
import { OrgResponseMapper } from "@/application/mappers/org-response-mapper";
import { HashGenerator } from "@/application/ports/hash-generator";
import { OrgRepository } from "../../../domain/org/repositories/org-repository";

interface Repositories {
    orgs: OrgRepository;
}

interface Services {
    hashGenerator: HashGenerator
}

interface AuthenticateOrgUseCaseDeps {
    repositories: Repositories;
    services: Services;
}


export class AuthenticateOrgUseCase {
    private orgs: OrgRepository;
    private hashGenerator: HashGenerator

    constructor(private readonly deps: AuthenticateOrgUseCaseDeps) {
        this.orgs = deps.repositories.orgs;
        this.hashGenerator = this.deps.services.hashGenerator
    }

    async execute(input: AuthenticateOrgCommand): Promise<AuthenticateOrgResponse> {
        const org = await this.orgs.findByEmail(input.email);

        if (org === null) {
            throw new ResourceNotFoundError("Org")
        }

        const isCorrectPassword = await this.hashGenerator.compare(input.password, org.passwordHash)

        if (isCorrectPassword === false) {
            throw new CredentialError()
        }
        const orgMapper = OrgResponseMapper.toDTO(org)

        return {
            org: orgMapper
        }

    }
}