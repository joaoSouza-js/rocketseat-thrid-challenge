import { InvalidResourceSelectionError } from "@/domain/error/invalid-resource-selection-error";

export type PetDependency = "low" | "medium" | "high";

export class PetDependenceValueObject {
  private constructor(private readonly petDependency: PetDependency) {}

  private static readonly dependencies: PetDependency[] = ["low", "medium", "high"];

  private static isValid(value: string): value is PetDependency {
    return this.dependencies.includes(value as PetDependency);
  }

  static create(value: string): PetDependenceValueObject {
    if (!this.isValid(value)) {
      throw new InvalidResourceSelectionError(value, this.dependencies);
    }

    return new PetDependenceValueObject(value);
  }

  get value() {
    return this.petDependency;
  }
}
