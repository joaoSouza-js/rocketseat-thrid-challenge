import { GetPetCommand, GetPetCommandResponse } from "@/application/dto/pet/get-pet-command";
import { ResourceNotFoundError } from "@/application/error/resource-not-found-error";
import { PetResponseMapper } from "@/application/mappers/pet-response-mapper";
import { PetRepository } from "@/domain/pet/repositories/pet-repository";

interface Repositories {
  pets: PetRepository;
}

interface GetPetUseCaseDeps {
  repositories: Repositories;
}

export class GetPetUseCase {
  private pets: PetRepository;
  constructor(private readonly deps: GetPetUseCaseDeps) {
    this.pets = deps.repositories.pets;
  }

  async execute(props: GetPetCommand): Promise<GetPetCommandResponse> {
    const pet = await this.pets.findById(props.id);
    if (pet === null) {
      throw new ResourceNotFoundError("pet");
    }

    const petMapper = PetResponseMapper.toDTO(pet);

    return {
      pet: petMapper,
    };
  }
}
