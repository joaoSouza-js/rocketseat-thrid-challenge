import { describe, it, expect, beforeAll, vi, beforeEach } from "vitest";
import { FindPetByLocationUseCase } from "./find-pet-by-location";
import { PetRepository } from "@/domain/pet/repositories/pet-repository";
import { InMemoryPetRepository } from "@/infra/repositories/in-memory/pet-in-memory-repository";
import { Pet } from "@/domain/pet/entities/pet";
import { PetDependency } from "@/domain/pet/value-object/pet-dependence";
import { PetEnergy } from "@/domain/pet/value-object/pet-energy";
import { PetSize } from "@/domain/pet/value-object/pet-size";


describe("find pet by location use case ", () => {
    let sut: FindPetByLocationUseCase
    let petsRepository: PetRepository

    beforeEach(() => {
        petsRepository = new InMemoryPetRepository()
        sut: new FindPetByLocationUseCase({
            repositories: {
                pets: petsRepository
            }
        })
    })

    it("should find pets in same location", async () => {
        const petsPromise = Array.from({length: 10},(_,index)=> {
            const pet = Pet.create({
                city: "são paulo",
                state: "são paulo",
                dependence: "high" as PetDependency,
                energy: "low" as PetEnergy,
                size: "medium" as PetSize,
                id: `pet-id-${index}`,
                name: `pet-name-${index}`,
                orgId: "org-id" 
            })

            return petsRepository.create(pet)
        })

        const selectedState = "Rio"
        const selectedCity = "paraiba"


        const petsSelectedPromise = Array.from({length: 10},(_,index)=> {
            const pet = Pet.create({
                city: selectedCity,
                state: selectedState,
                dependence: "high" as PetDependency,
                energy: "low" as PetEnergy,
                size: "medium" as PetSize,
                id: `pet-id-${index}`,
                name: `pet-name-${index}`,
                orgId: "org-id" 
            })

            return petsRepository.create(pet)
        })

        await Promise.all(petsPromise)
        await Promise.all(petsSelectedPromise)

        const response = await petsRepository.findByLocation({
            location: {
                city: selectedCity,
                state:selectedState
            }
        })

        console.log(response)
    })
})