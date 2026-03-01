import { InvalidResourceSelectionError } from "@/domain/error/invalid-resource-selection-error"

export type PetEnergy = "low" | "medium" | "high"

export class PetEnergyValueObject {
    private constructor(private readonly petEnergy: PetEnergy) {}

    private static readonly energies: PetEnergy[] = ["low", "medium", "high"]

    static create(petEnergy: PetEnergy): PetEnergyValueObject {
        const isValid = this.energies.some((energy) => energy === petEnergy)
        if (isValid === false) throw new InvalidResourceSelectionError(petEnergy, this.energies)
        return new PetEnergyValueObject(petEnergy)
    }

    get value() {
        return this.petEnergy
    }
}