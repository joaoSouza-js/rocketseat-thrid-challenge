import { Pet } from "@/domain/pet/entities/pet";
import {
    FindByLocation,
    PetAvailableQuery,
    PetRepository,
} from "@/domain/pet/repositories/pet-repository";

export class InMemoryPetRepository implements PetRepository {
    findByLocation(props: {
        location: FindByLocation;
        query?: PetAvailableQuery;
    }): Promise<Pet[]> {
        const { location, query } = props;
        const limit = query?.limit ?? 10
        const page = query?.page ?? 1
      
        const pets = this.pets.filter((pet) => {
            console.log(pet.city)
            const isCorrectLocation =
                pet.state === location.state && pet.city === location.city

            return isCorrectLocation
        });

       

        return Promise.resolve(pets);
    }
    private pets: Pet[] = [];
    findById(id: string): Promise<Pet | null> {
        const pet = this.pets.find((pet) => pet.id === id) ?? null;
        return Promise.resolve(pet);
    }

    matchesOptionalFilter(
        filterValue: string | undefined | null,
        actualValue: string,
    ): boolean {
        return filterValue == null || filterValue === actualValue;
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
