export class InvalidPetSizeError extends Error {
  constructor(value: string) {
    super(`Invalid pet size: ${value}`)
    this.name = "InvalidPetSizeError"
  }
}