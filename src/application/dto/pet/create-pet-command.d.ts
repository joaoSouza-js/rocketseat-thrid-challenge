import { PetDependency } from "@/domain/pet/value-object/pet-dependence"
import { PetEnergy } from "@/domain/pet/value-object/pet-energy"
import { PetSize } from "@/domain/pet/value-object/pet-size"

export interface CreatePetCommand {
    name: string
    orgId: string
    state: string
    city: string,
    description: string,
    size: string
    dependence: string
    energy: string
}

export interface CreatePetResponse {
    pet: {
        id: string
    }
}