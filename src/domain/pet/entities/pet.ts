import { Location } from "../value-object/location"
import { PetSize, PetSizeValueObject } from "../value-object/pet-size"

interface PetProps {
  id: string
  name: string
  orgId: string
  location: Location
  createdAt: Date
  size: PetSizeValueObject
}

interface CreatePetProps {
  id: string
  name: string
  orgId: string
  state: string
  city: string
  size: PetSize
}

export class Pet {
  private constructor(private props: PetProps) {}

  static create(input: CreatePetProps): Pet {
    if (!input.name.trim()) {
      throw new Error("Pet name is required")
    }

    const petSize =  PetSizeValueObject.create(input.size)

    return new Pet({
      id: input.id,
      name: input.name.trim(),
      orgId: input.orgId,
      location: Location.create({
        state: input.state,
        city: input.city,
      }),
      createdAt: new Date(),
      size: petSize
    })
  }

  static rehydrate(props: PetProps): Pet {
    return new Pet(props)
  }

  changeName(name: string) {
    if (!name.trim()) {
      throw new Error("Invalid pet name")
    }

    this.props.name = name.trim()
  }

  changeLocation(state: string, city: string) {
    this.props.location = Location.create({ state, city })
  }

  // getters

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get orgId() {
    return this.props.orgId
  }

  get state() {
    return this.props.location.state
  }

  get city() {
    return this.props.location.city
  }

  get createdAt() {
    return this.props.createdAt
  }
}