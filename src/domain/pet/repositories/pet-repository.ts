import { Pet } from "../entities/pet"
import { PetDependency } from "../value-object/pet-dependence"
import { PetEnergy } from "../value-object/pet-energy"
import { PetSize } from "../value-object/pet-size"


type PetAvailableQuery = {
  size: PetSize,
  dependence: PetDependency,
  energy: PetEnergy
}
type FindByLocation = {
  state: string
  city: string
}

export interface PetRepository {
  create(pet: Pet): Promise<void>

  findById(id: string): Promise<Pet | null>

  findByLocation(props: {location: FindByLocation, query: PetAvailableQuery}): Promise<Pet[]>

  delete(id: string): Promise<void>
}