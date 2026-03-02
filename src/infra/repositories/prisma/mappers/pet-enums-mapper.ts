import { PetDependency } from "@/domain/pet/value-object/pet-dependence";
import { PetEnergy } from "@/domain/pet/value-object/pet-energy";
import { PetSize } from "@/domain/pet/value-object/pet-size";
import {
    PetDependence as PrismaPetDependence,
    PetEnergy as PrismaPetEnergy,
    PetSize as PrismaPetSize,
} from "@/generated/enums";

const prismaPetSizeMapper: Record<PetSize, PrismaPetSize> = {
    small: "SMALL",
    medium: "MEDIUM",
    large: "LARGE",
};

const prismaPetEnergyMapper: Record<PetEnergy, PrismaPetEnergy> = {
    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH",
};

const prismaPetDependenceMapper: Record<PetDependency, PrismaPetDependence> = {
    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH",
};

const petRepositoryPetSizeMapper: Record<PrismaPetSize, PetSize> = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
};

const petRepositoryPetDependenceMapper: Record<PrismaPetDependence, PetDependency> = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
};

const petRepositoryPetEnergyMapper: Record<PrismaPetEnergy, PetEnergy> = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
};

export const petEnumMapperPrismaToDomain = {
    petRepositoryPetSizeMapper,
    petRepositoryPetDependenceMapper,
    petRepositoryPetEnergyMapper
}

export const petEnumMapperDomainToPrisma = {
    prismaPetSizeMapper,
    prismaPetEnergyMapper,
    prismaPetDependenceMapper
}
