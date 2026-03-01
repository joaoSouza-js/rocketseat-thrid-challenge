import { InvalidResourceSelectionError } from "@/domain/error/invalid-resource-selection-error";
import { describe, expect, it } from "vitest";
import { PetEnergyValueObject } from "./pet-energy";

describe("PetEnergyValueObject", () => {
  describe("create()", () => {
    it("should create valueObject with 'low' energy", () => {
      const valueObject = PetEnergyValueObject.create("low");

      expect(valueObject).toBeInstanceOf(PetEnergyValueObject);
      expect(valueObject.value).toBe("low");
    });

    it("should create valueObject with 'medium' energy", () => {
      const valueObject = PetEnergyValueObject.create("medium");

      expect(valueObject.value).toBe("medium");
    });

    it("should create valueObject with 'high' energy", () => {
      const valueObject = PetEnergyValueObject.create("high");

      expect(valueObject.value).toBe("high");
    });

    it("should throw InvalidResourceSelectionError for invalid energy", () => {
      expect(() => PetEnergyValueObject.create("extreme")).toThrow(InvalidResourceSelectionError);
    });
  });
});
