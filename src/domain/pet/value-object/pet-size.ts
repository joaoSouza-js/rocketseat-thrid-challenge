import { InvalidPetSizeError } from "@/domain/error/invalid-pet-size-error"

export type PetSize = "small" | "medium" | "large"

export class PetSizeValueObject {
    private constructor(private readonly value: PetSize) {}

    static create(value: PetSize): PetSizeValueObject {
        const sizes = ["small", "medium", "large"]
        const isValid = sizes.some((size) => size === value)
        if (!isValid) throw new InvalidPetSizeError(value)
        return new PetSizeValueObject(value)
    }

    
}
