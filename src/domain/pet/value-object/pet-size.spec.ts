import { describe, it, expect } from "vitest"
import { InvalidResourceSelectionError } from "@/domain/error/invalid-resource-selection-error"
import { PetSizeValueObject } from "./pet-size"

describe("PetSizeValueObject", () => {

  describe("create()", () => {

    it("should create valueObject with 'small'", () => {
      const valueObject = PetSizeValueObject.create("small")

      expect(valueObject).toBeInstanceOf(PetSizeValueObject)
      expect(valueObject.value).toBe("small")
    })

    it("should create valueObject with 'medium'", () => {
      const valueObject = PetSizeValueObject.create("medium")

      expect(valueObject.value).toBe("medium")
    })

    it("should create valueObject with 'large'", () => {
      const valueObject = PetSizeValueObject.create("large")

      expect(valueObject.value).toBe("large")
    })

    it("should throw InvalidResourceSelectionError for invalid size", () => {
      expect(() =>
        PetSizeValueObject.create("giant" as any)
      ).toThrow(InvalidResourceSelectionError)
    })

  })

})