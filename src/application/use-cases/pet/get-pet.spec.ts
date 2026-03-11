import { ResourceNotFoundError } from "@/application/error/resource-not-found-error";
import { Pet } from "@/domain/pet/entities/pet";
import { PetDependency } from "@/domain/pet/value-object/pet-dependence";
import { PetEnergy } from "@/domain/pet/value-object/pet-energy";
import { PetSize } from "@/domain/pet/value-object/pet-size";
import { InMemoryPetRepository } from "@/infra/repositories/in-memory/pet-in-memory-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetUseCase } from "./get-pet";

describe("get pet use case", () => {
  let sut: GetPetUseCase;
  let petRepository: InMemoryPetRepository;
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new GetPetUseCase({
      repositories: {
        pets: petRepository,
      },
    });
  });

  it("should  find a pet", async () => {
    const petId = "pet-id";
    const pet = Pet.create({
      city: "selectedCity",
      state: "selectedState",
      dependence: "high" as PetDependency,
      energy: "high" as PetEnergy,
      size: "medium" as PetSize,
      id: petId,
      name: "pet-name",
      orgId: "org-id",
    });

    await petRepository.create(pet);

    const response = await sut.execute({
      id: "pet-id",
    });

    expect(response.pet.id).toBe(petId);
  });

  it("should trow a ResourceNotFoundError if pet din't exist", async () => {
    const petId = "pet-id";

    await expect(sut.execute({ id: petId })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
