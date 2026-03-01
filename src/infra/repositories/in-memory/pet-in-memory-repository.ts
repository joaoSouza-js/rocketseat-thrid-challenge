import { Pet } from "@/domain/pet/entities/pet";
import { PetRepository } from "@/domain/pet/repositories/pet-repository";

export class InMemoryPetRepository implements PetRepository {
    private pets: Pet[] = [];
    findById(id: string): Promise<Pet | null> {
        const pet = this.pets.find(pet => pet.id === id) ?? null;
        return Promise.resolve(pet);
    }
    findByLocation(state: string, city: string): Promise<Pet[]> {
        const pets = this.pets.filter(pet => pet.state === state && pet.city === city);
        return Promise.resolve(pets);
    }
    delete(id: string): Promise<void> {
        this.pets = this.pets.filter(pet => pet.id !== id);
        return Promise.resolve();
    }

    create(pet: Pet): Promise<void> {
        this.pets.push(pet);
        return Promise.resolve();
    }
}
