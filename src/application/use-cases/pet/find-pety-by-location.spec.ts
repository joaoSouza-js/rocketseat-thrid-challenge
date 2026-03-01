import { describe, it, expect, beforeAll, vi, beforeEach } from "vitest";
import { FindPetByLocationUseCase } from "./find-pet-by-location";
import { PetRepository } from "@/domain/pet/repositories/pet-repository";
import { InMemoryPetRepository } from "@/infra/repositories/in-memory/pet-in-memory-repository";
import { Pet } from "@/domain/pet/entities/pet";
import { PetDependency } from "@/domain/pet/value-object/pet-dependence";
import { PetEnergy } from "@/domain/pet/value-object/pet-energy";
import { PetSize } from "@/domain/pet/value-object/pet-size";

describe("find pet by location use case ", () => {
    let sut: FindPetByLocationUseCase;
    let petsRepository: PetRepository;

    beforeEach(() => {
        petsRepository = new InMemoryPetRepository();
        sut = new FindPetByLocationUseCase({
            repositories: {
                pets: petsRepository,
            },
        });
    });

    it("should find pets in same location", async () => {
        const petsPromise = Array.from({ length: 10 }, (_, index) => {
            const pet = Pet.create({
                city: "são paulo",
                state: "são paulo",
                dependence: "high" as PetDependency,
                energy: "low" as PetEnergy,
                size: "medium" as PetSize,
                id: `pet-id-${index}`,
                name: `pet-name-${index}`,
                orgId: "org-id",
            });

            return petsRepository.create(pet);
        });

        const selectedState = "Rio";
        const selectedCity = "paraiba";

        const petsSelectedPromise = Array.from({ length: 2 }, (_, index) => {
            const pet = Pet.create({
                city: selectedCity,
                state: selectedState,
                dependence: "high" as PetDependency,
                energy: "low" as PetEnergy,
                size: "medium" as PetSize,
                id: `pet-id-${index}`,
                name: `pet-name-${index}`,
                orgId: "org-id",
            });

            return petsRepository.create(pet);
        });

        await Promise.all(petsPromise);
        await Promise.all(petsSelectedPromise);

        const response = await sut.execute({
            state: selectedState,
            city: selectedCity,
        });

        expect(response.pets).toHaveLength(2);
    });

    it("should find pet with high energy", async () => {
        const selectedState = "Rio";
        const selectedCity = "paraiba";

        const petWithHighEnergy = Pet.create({
            city: selectedCity,
            state: selectedState,
            dependence: "high" as PetDependency,
            energy: "high" as PetEnergy,
            size: "medium" as PetSize,
            id: "pet-id",
            name: "pet-name",
            orgId: "org-id",
        });

        const petWithLowEnergy = Pet.create({
            city: selectedState,
            state: selectedCity,
            dependence: "high" as PetDependency,
            energy: "low" as PetEnergy,
            size: "medium" as PetSize,
            id: "pet-id",
            name: "pet-name",
            orgId: "org-id",
        });

        await Promise.all([
            petsRepository.create(petWithHighEnergy),
            petsRepository.create(petWithLowEnergy),
        ]);

        const response = await sut.execute({
            state: selectedState,
            city: selectedCity,
            query: {
                energy: "high",
            },
        });


        expect(response.pets).toHaveLength(1);
        expect(response.pets).toContainEqual(
            expect.objectContaining({
                energy: "high",
            }),
        );
    });

    it("should find pet with energy low and dependence high", async () => {
        const selectedState = "Rio";
        const selectedCity = "paraiba";

        const firstPet = Pet.create({
            city: selectedCity,
            state: selectedState,
            dependence: "high" as PetDependency,
            energy: "high" as PetEnergy,
            size: "medium" as PetSize,
            id: "pet-id",
            name: "pet-name",
            orgId: "org-id",
        });

        const secondPet = Pet.create({
            city: selectedCity,
            state: selectedState,
            dependence: "high" as PetDependency,
            energy: "low" as PetEnergy,
            size: "medium" as PetSize,
            id: "pet-id",
            name: "pet-name",
            orgId: "org-id",
        });

        await Promise.all([
            petsRepository.create(firstPet),
            petsRepository.create(secondPet),
        ]);

        const response = await sut.execute({
            state: selectedState,
            city: selectedCity,
            query: {
                energy: "low",
                dependence: "high",
            },
        });


        expect(response.pets).toHaveLength(1);
        expect(response.pets).toContainEqual(
            expect.objectContaining({
                energy: "low",
                dependence: "high",
            }),
        );
    })

    it("should find a pet with medium size, high dependence and medium energy", async () => {
        const selectedState = "Rio";
        const selectedCity = "paraiba";
        const firstPet = Pet.create({
            city: selectedCity,
            state: selectedState,
            dependence: "high" as PetDependency,
            energy: "high" as PetEnergy,
            size: "medium" as PetSize,
            id: "pet-id",
            name: "pet-name",
            orgId: "org-id",
        });

        const secondPet = Pet.create({
            city: selectedCity,
            state: selectedState,
            dependence: "high" as PetDependency,
            energy: "medium" as PetEnergy,
            size: "medium" as PetSize,
            id: "pet-id",
            name: "pet-name",
            orgId: "org-id",
        });

        await Promise.all([
            petsRepository.create(firstPet),
            petsRepository.create(secondPet),
        ]);

        const response = await sut.execute({
            state: selectedState,
            city: selectedCity,
            query: {
                size: "medium",
                dependence: "high",
                energy: "medium",
            },
        });


        expect(response.pets).toHaveLength(1);
        expect(response.pets).toContainEqual(
            expect.objectContaining({
                size: "medium",
                dependence: "high",
                energy: "medium",
            }),
        );
    })

    it("should find pets with pagination", async () => {
      
        const selectedState = "Rio";
        const selectedCity = "paraiba";

        const pets = Array.from({ length: 20 }, (_, index) => {
            const pet = Pet.create({
                city: selectedCity,
                state: selectedState,
                dependence: "high" as PetDependency,
                energy: "low" as PetEnergy,
                size: "medium" as PetSize,
                id: `pet-id-${index}`,
                name: `pet-name-${index}`,
                orgId: "org-id",
            });

            return petsRepository.create(pet);
        });

   
        await Promise.all(pets);

        const response = await sut.execute({
            state: selectedState,
            city: selectedCity,
            query:{
                limit: 4,
                page: 2
            }
        });

        expect(response.pets).toHaveLength(4);
    });




});
