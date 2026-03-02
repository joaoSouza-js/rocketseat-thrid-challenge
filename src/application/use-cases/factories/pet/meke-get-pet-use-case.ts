import { PrismaPetRepository } from "@/infra/repositories/prisma/prisma-pet-repository";
import { GetPetUseCase } from "../../pet/get-pet";

export function makeGetPetUseCase() {
    const petsRepository = new PrismaPetRepository();
    const getPetUseCase = new GetPetUseCase({
        repositories: {
            pets: petsRepository,
        },
    });

    return getPetUseCase
}