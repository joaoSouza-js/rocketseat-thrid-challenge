interface LocationProps {
  state: string;
  city: string;
}

export class LocationValueObject {
  private constructor(private props: LocationProps) {}

  private static normalize(value: string): string {
    return value
      .trim()
      .normalize("NFD") // separate accent from letter
      .replace(/[\u0300-\u036f]/g, "") // remove diacritics
      .toUpperCase();
  }

  static create(props: LocationProps): LocationValueObject {
    const state = this.normalize(props.state);
    const city = this.normalize(props.city);

    if (!state) throw new Error("State is required");
    if (!city) throw new Error("City is required");

    return new LocationValueObject({ state, city });
  }

  get state() {
    return this.props.state;
  }

  get city() {
    return this.props.city;
  }

  equals(other: LocationValueObject): boolean {
    return this.props.state === other.state && this.props.city === other.city;
  }
}
