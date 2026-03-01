import { PetDependency } from "@/domain/pet/value-object/pet-dependence"
import { PetEnergy } from "@/domain/pet/value-object/pet-energy"
import { PetSize } from "@/domain/pet/value-object/pet-size"

export interface CreatePetCommand {
    name: string
    orgId: string
    state: string
    city: string,
    size: PetSize
    description: string,
    dependence: PetDependency
    energy: PetEnergy
}

export interface CreatePetResponse {
    pet: {
        id: string
    }
}