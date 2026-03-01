import { InvalidPetSizeError } from "@/domain/error/invalid-pet-size-error"
import { InvalidResourceSelectionError } from "@/domain/error/invalid-resource-selection-error"

export type PetSize = "small" | "medium" | "large"

export class PetSizeValueObject {
    private constructor(private readonly petSize: PetSize) {}

    private static readonly sizes: PetSize[] = ["small", "medium", "large"]

    static create(value: PetSize): PetSizeValueObject {
    
        const isValid = this.sizes.some((size) => size === value)
        if (!isValid) throw new InvalidResourceSelectionError(value,this.sizes)
        return new PetSizeValueObject(value)
    }

    get value() {
        return this.petSize
    }

    
}
