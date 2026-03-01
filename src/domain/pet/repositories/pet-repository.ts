import { Pet } from "../entities/pet"
import { PetDependenceValueObject, PetDependency } from "../value-object/pet-dependence"
import { PetEnergy, PetEnergyValueObject } from "../value-object/pet-energy"
import { PetSize, PetSizeValueObject } from "../value-object/pet-size"


export interface  PetAvailableQuery  {
  page?: number,
  limit?: number
  size?: PetSizeValueObject,
  dependence?: PetDependenceValueObject
  energy?: PetEnergyValueObject
}
export interface  FindByLocation  {
  state: string
  city: string
}

export interface PetRepository {
  create(pet: Pet): Promise<void>

  findById(id: string): Promise<Pet | null>

  findByLocation(props: {location: FindByLocation, query?: PetAvailableQuery}): Promise<Pet[]>

  delete(id: string): Promise<void>
}