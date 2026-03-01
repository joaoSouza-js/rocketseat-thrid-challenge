import { OrgRepository } from "@/domain/org/repositories/org-repository"
import { PetRepository } from "@/domain/pet/repositories/pet-repository"
import { CreatePetCommand, CreatePetResponse } from "../../dto/pet/create-pet-command"
import { ResourceNotFoundError } from "../../error/resource-not-found-error"
import { Pet } from "@/domain/pet/entities/pet"
import { IdGenerator } from "../../ports/id-generator"

interface Repositories {
    orgs: OrgRepository,
    pets: PetRepository
}


interface Services {
    idGenerator: IdGenerator
}

interface CreatePetUseCaseDeps {
    repositories: Repositories
    services: Services
}


export class CreatePetUseCase {
    orgs: OrgRepository
    pets: PetRepository
    idGenerator: IdGenerator
    constructor(private readonly deps: CreatePetUseCaseDeps) {
        this.orgs = deps.repositories.orgs
        this.pets = deps.repositories.pets
        this.idGenerator = this.deps.services.idGenerator
    }

    async execute(input: CreatePetCommand): Promise<CreatePetResponse> {
        const org = await this.orgs.findById(input.orgId)
        if(org == null){
            throw new ResourceNotFoundError("Org")
        }
        const newPet = Pet.create({
            city: input.city,
            id: this.idGenerator.next(),
            name: input.name,
            orgId: input.orgId,
            state: input.state,
            size: input.size,
            dependence: input.dependence,
            energy: input.energy
        })

        return {
            pet: {
                id: newPet.id
            }
        }
    }
}