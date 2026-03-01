import { InvalidResourceSelectionError } from "@/domain/error/invalid-resource-selection-error";

export type PetDependency = "low" | "medium" | "high";

export class PetDependenceValueObject {
    private constructor(private readonly  petDependency: PetDependency) {}
    
    private static readonly dependencies: PetDependency[] = ["low", "medium", "high"]

    static create(PetDependency: PetDependency): PetDependenceValueObject {
        const isValid = this.dependencies.some((dependence) => dependence === PetDependency)
        if (isValid === false) throw new InvalidResourceSelectionError(PetDependency, this.dependencies)
        return new PetDependenceValueObject(PetDependency)

    }

    get value () {
        return this.petDependency
    }
}