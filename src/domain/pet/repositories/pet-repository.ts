import { Pet } from "../entities/pet"
import { LocationValueObject } from "../value-object/location"
import { PetDependenceValueObject } from "../value-object/pet-dependence"
import { PetEnergyValueObject } from "../value-object/pet-energy"
import { PetSizeValueObject } from "../value-object/pet-size"


export interface PetAvailableQuery {
  page?: number,
  limit?: number
  size?: PetSizeValueObject,
  dependence?: PetDependenceValueObject
  energy?: PetEnergyValueObject
}

export interface PetRepository {
  create(pet: Pet): Promise<void>

  findById(id: string): Promise<Pet | null>

  findByLocation(props: { location: LocationValueObject, query?: PetAvailableQuery }): Promise<Pet[]>

  delete(id: string): Promise<void>
}