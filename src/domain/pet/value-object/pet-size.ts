import { InvalidPetSizeError } from "@/domain/error/invalid-pet-size-error";
import { InvalidResourceSelectionError } from "@/domain/error/invalid-resource-selection-error";

export type PetSize = "small" | "medium" | "large";

export class PetSizeValueObject {
    private constructor(private readonly petSize: PetSize) {}

    private static readonly sizes: PetSize[] = ["small", "medium", "large"];

    private static isValid(value: string): value is PetSize {
        return this.sizes.includes(value as PetSize);
    }

    static create(value: string): PetSizeValueObject {  
        if (this.isValid(value) === false)
            throw new InvalidResourceSelectionError(value, this.sizes);
        return new PetSizeValueObject(value);
    }

    get value() {
        return this.petSize;
    }
}
