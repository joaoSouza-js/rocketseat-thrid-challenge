import { PetSize } from "@/domain/pet/value-object/pet-size"

export interface CreatePetCommand {
    name: string
    orgId: string
    state: string
    city: string,
    size: PetSize
}

export interface CreatePetResponse {
    pet: {
        id: string
    }
}