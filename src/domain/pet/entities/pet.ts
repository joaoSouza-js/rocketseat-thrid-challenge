import { LocationValueObject } from "../value-object/location"
import { PetDependenceValueObject } from "../value-object/pet-dependence"
import { PetSizeValueObject } from "../value-object/pet-size"

interface PetProps {
  id: string
  name: string
  orgId: string
  location: LocationValueObject
  createdAt: Date
  size: PetSizeValueObject
  dependence: PetDependenceValueObject,
  energy: PetDependenceValueObject
}

interface CreatePetProps {
  id: string
  name: string
  orgId: string
  state: string
  city: string
  size: string
  dependence: string,
  energy: string
}

export class Pet {
  private constructor(private props: PetProps) { }

  static create(input: CreatePetProps): Pet {
    if (!input.name.trim()) {
      throw new Error("Pet name is required")
    }

    const petSize = PetSizeValueObject.create(input.size)
    const petDependence = PetDependenceValueObject.create(input.dependence)
    const petEnergy = PetDependenceValueObject.create(input.energy)

    return new Pet({
      id: input.id,
      name: input.name.trim(),
      orgId: input.orgId,
      location: LocationValueObject.create({
        state: input.state,
        city: input.city,
      }),
      createdAt: new Date(),
      size: petSize,
      dependence: petDependence,
      energy: petEnergy
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
    this.props.location = LocationValueObject.create({ state, city })
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

  get size() {
    return this.props.size.value
  }

  get dependence() {
    return this.props.dependence.value
  }

  get energy() {
    return this.props.energy.value
  }
}