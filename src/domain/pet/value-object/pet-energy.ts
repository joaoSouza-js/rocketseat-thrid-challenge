import { InvalidResourceSelectionError } from "@/domain/error/invalid-resource-selection-error";

export type PetEnergy = "low" | "medium" | "high";

export class PetEnergyValueObject {
  private constructor(private readonly petEnergy: PetEnergy) {}

  private static readonly energies: PetEnergy[] = ["low", "medium", "high"];

  private static isValid(value: string): value is PetEnergy {
    return this.energies.includes(value as PetEnergy);
  }

  static create(petEnergy: string): PetEnergyValueObject {
    if (this.isValid(petEnergy) === false) {
      throw new InvalidResourceSelectionError(petEnergy, this.energies);
    }
    return new PetEnergyValueObject(petEnergy);
  }

  get value() {
    return this.petEnergy;
  }
}
