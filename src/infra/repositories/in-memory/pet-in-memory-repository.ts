import { Pet } from "@/domain/pet/entities/pet";
import { PetRepository } from "@/domain/pet/repositories/pet-repository";
import { PetDependency } from "@/domain/pet/value-object/pet-dependence";
import { PetEnergy } from "@/domain/pet/value-object/pet-energy";
import { PetSize } from "@/domain/pet/value-object/pet-size";

export class InMemoryPetRepository implements PetRepository {
    private pets: Pet[] = [];
    findById(id: string): Promise<Pet | null> {
        const pet = this.pets.find((pet) => pet.id === id) ?? null;
        return Promise.resolve(pet);
    }
    findByLocation(props: {
        location: { state: string; city: string };
        query: { size: PetSize; dependence: PetDependency; energy: PetEnergy };
    }): Promise<Pet[]> {
        const { state, city } = props.location;
        const { size, dependence, energy } = props.query;
        const pets = this.pets.filter(
            (pet) =>
                pet.state === state &&
                pet.city === city &&
                pet.size === size &&
                pet.dependence === dependence &&
                pet.energy === energy,
        );
        return Promise.resolve(pets);
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
