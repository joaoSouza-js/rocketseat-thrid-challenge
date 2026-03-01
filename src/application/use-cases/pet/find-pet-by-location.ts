import {
  FindPetByLocationCommand,
  FindPetByLocationResponse,
} from "@/application/dto/pet/find-pet-by-location-command";
import { PetResponseMapper } from "@/application/mappers/pet-response-mapper";
import { PetRepository } from "@/domain/pet/repositories/pet-repository";
import { LocationValueObject } from "@/domain/pet/value-object/location";
import { PetDependenceValueObject } from "@/domain/pet/value-object/pet-dependence";
import { PetEnergyValueObject } from "@/domain/pet/value-object/pet-energy";
import { PetSizeValueObject } from "@/domain/pet/value-object/pet-size";

interface Repositories {
  pets: PetRepository;
}
interface FindPetByLocationUseCaseDeps {
  repositories: Repositories;
}

export class FindPetByLocationUseCase {
  pets: PetRepository;
  constructor(deps: FindPetByLocationUseCaseDeps) {
    this.pets = deps.repositories.pets;
  }

  async execute(input: FindPetByLocationCommand): Promise<FindPetByLocationResponse> {
    const petDependence = input.query?.dependence
      ? PetDependenceValueObject.create(input.query.dependence)
      : undefined;

    const petSize = input.query?.size ? PetSizeValueObject.create(input.query.size) : undefined;

    const petEnergy = input.query?.energy
      ? PetEnergyValueObject.create(input.query.energy)
      : undefined;

    const Location = LocationValueObject.create({
      state: input.state,
      city: input.city,
    });

    const pets = await this.pets.findByLocation({
      location: Location,
      query: {
        dependence: petDependence,
        energy: petEnergy,
        size: petSize,
        limit: input.query?.limit,
        page: input.query?.page,
      },
    });

    const petsMapper = pets.map(PetResponseMapper.toDTO);

    return {
      pets: petsMapper,
      total: petsMapper.length,
    };
  }
}
