import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResourceNotFoundError } from "@/application/error/resource-not-found-error";
import { IdGenerator } from "@/application/ports/id-generator";
import { Org } from "@/domain/org/entities/org";
import { InMemoryOrgRepository } from "@/infra/repositories/in-memory/org-in-memory-repository";
import { InMemoryPetRepository } from "@/infra/repositories/in-memory/pet-in-memory-repository";
import { CreatePetUseCase } from "./create-pet";

describe("CreatePetUseCase use case", () => {
  let sut: CreatePetUseCase;
  let orgs: InMemoryOrgRepository;
  let pets: InMemoryPetRepository;
  let idGenerator: IdGenerator;

  beforeEach(() => {
    orgs = new InMemoryOrgRepository();
    pets = new InMemoryPetRepository();

    idGenerator = {
      next: vi.fn(() => "fixed-pet-id"),
    };

    sut = new CreatePetUseCase({
      repositories: {
        orgs: orgs,
        pets: pets,
      },
      services: {
        idGenerator,
      },
    });
  });

  it("should create a pet when org exists", async () => {
    const org = Org.create({
      id: "org-1",
      name: "Org",
      passwordHash: "passwordHash",
      email: "org@mail.com",
      phone: "123",
      description: "desc",
    });
    await orgs.save(org);

    const response = await sut.execute({
      orgId: "org-1",
      name: "Thor",
      size: "small",
      city: "City",
      state: "State",
      dependence: "low",
      description: "desc",
      energy: "low",
    });

    expect(response.pet.id).toBe("fixed-pet-id");
  });

  it("should throw ResourceNotFoundError if org does not exist", async () => {
    await expect(() =>
      sut.execute({
        orgId: "org-1",
        name: "Thor",
        size: "small",
        city: "City",
        state: "State",
        description: "desc",

        dependence: "low",
        energy: "low",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
