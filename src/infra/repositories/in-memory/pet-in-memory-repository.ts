import { Pet } from "@/domain/pet/entities/pet";
import { PetAvailableQuery, PetRepository } from "@/domain/pet/repositories/pet-repository";
import { LocationValueObject } from "@/domain/pet/value-object/location";

export class InMemoryPetRepository implements PetRepository {
  findByLocation(props: {
    location: LocationValueObject;
    query?: PetAvailableQuery;
  }): Promise<Pet[]> {
    const { location, query } = props;
    const limit = query?.limit ?? 10;
    const page = query?.page ?? 1;

    const pets = this.pets.filter((pet) => {
      const isCorrectLocation = pet.state === location.state && pet.city === location.city;

      const isCorrectParams =
        this.matchesOptionalFilter(query?.dependence?.value, pet.dependence) &&
        this.matchesOptionalFilter(query?.energy?.value, pet.energy) &&
        this.matchesOptionalFilter(query?.size?.value, pet.size);

      return isCorrectLocation && isCorrectParams;
    });

    const start = (page - 1) * limit;
    const end = start + limit;

    const petsPagination = pets.slice(start, end);

    return Promise.resolve(petsPagination);
  }
  private pets: Pet[] = [];
  findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id) ?? null;
    return Promise.resolve(pet);
  }

  matchesOptionalFilter(filterValue: string | undefined | null, actualValue: string): boolean {
    const match = filterValue == null || filterValue === actualValue;

    return match;
  }

  delete(id: string): Promise<void> {
    this.pets = this.pets.filter((pet) => pet.id !== id);
    return Promise.resolve();
  }

  create(pet: Pet): Promise<void> {
    this.pets.push(pet);
    return Promise.resolve();
  }
}
