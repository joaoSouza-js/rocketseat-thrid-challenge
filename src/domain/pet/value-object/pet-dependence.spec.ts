import { describe, it, expect } from "vitest"
import { InvalidResourceSelectionError } from "@/domain/error/invalid-resource-selection-error"
import { PetDependenceValueObject } from "./pet-dependence"

describe("PetDependenceValueObject", () => {

  describe("create()", () => {

    it("should create a valueObject with dependency 'low'", () => {
      const valueObject = PetDependenceValueObject.create("low")

      expect(valueObject).toBeInstanceOf(PetDependenceValueObject)
      expect(valueObject.value).toBe("low")
    })

    it("should create a valueObject with dependency 'medium'", () => {
      const valueObject = PetDependenceValueObject.create("medium")

      expect(valueObject.value).toBe("medium")
    })

    it("should create a valueObject with dependency 'high'", () => {
      const valueObject = PetDependenceValueObject.create("high")

      expect(valueObject.value).toBe("high")
    })

    it("should throw InvalidResourceSelectionError when dependency is invalid", () => {
      expect(() =>
        PetDependenceValueObject.create("extreme")
      ).toThrow(InvalidResourceSelectionError)
    })

  })

})