import { Pet } from "@/domain/pet/entities/pet"

export interface PetResponseDTO {
  id: string
  name: string
  orgId: string
  state: string
  city: string
  size: string
  dependence: string
  energy: string
  createdAt: Date
}

export class PetResponseMapper {
  static toDTO(pet: Pet): PetResponseDTO {
    return {
      id: pet.id,
      name: pet.name,
      orgId: pet.orgId,
      state: pet.state,
      city: pet.city,
      size: pet.size,
      dependence: pet.dependence,
      energy: pet.energy,
      createdAt: pet.createdAt,
    }
  }
}