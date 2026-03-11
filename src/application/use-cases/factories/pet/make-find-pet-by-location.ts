import { PrismaPetRepository } from "@/infra/repositories/prisma/prisma-pet-repository";
import { FindPetByLocationUseCase } from "../../pet/find-pet-by-location";

export function makeFindPetByLocation() {
  const petsRepository = new PrismaPetRepository();
  const findPetByLocationUseCase = new FindPetByLocationUseCase({
    repositories: {
      pets: petsRepository,
    },
  });

  return findPetByLocationUseCase;
}
