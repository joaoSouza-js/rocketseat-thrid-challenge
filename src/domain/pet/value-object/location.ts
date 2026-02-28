interface LocationProps {
  state: string
  city: string
}

export class Location {
  private constructor(private props: LocationProps) {}

  static create(props: LocationProps): Location {
    const state = props.state.trim().toUpperCase()
    const city = props.city.trim().toLowerCase()

    if (!state) throw new Error("State is required")
    if (!city) throw new Error("City is required")

    return new Location({ state, city })
  }

  get state() {
    return this.props.state
  }

  get city() {
    return this.props.city
  }

  equals(other: Location): boolean {
    return (
      this.props.state === other.state &&
      this.props.city === other.city
    )
  }
}