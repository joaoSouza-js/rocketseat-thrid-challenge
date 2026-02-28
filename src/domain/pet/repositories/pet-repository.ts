import { Pet } from "../entities/pet"

export interface PetRepository {
  create(pet: Pet): Promise<void>

  findById(id: string): Promise<Pet | null>

  findByLocation(state: string, city: string): Promise<Pet[]>

  delete(id: string): Promise<void>
}