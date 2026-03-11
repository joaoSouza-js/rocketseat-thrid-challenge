import { describe, expect, it } from "vitest";
import { BcryptHashGenerator } from "./bcrypt-hash-generator";

describe("BcryptHashGenerator", () => {
  const sut = new BcryptHashGenerator();

  it("should generate a hashed password", async () => {
    const hash = await sut.hash("password123");

    expect(hash).toBeTypeOf("string");
    expect(hash).not.toBe("password123");
  });

  it("should generate different hashes for the same input (salt)", async () => {
    const hash1 = await sut.hash("password123");
    const hash2 = await sut.hash("password123");

    expect(hash1).not.toEqual(hash2);
  });

  it("should return true when comparing correct password", async () => {
    const hash = await sut.hash("password123");

    const result = await sut.compare("password123", hash);

    expect(result).toBe(true);
  });

  it("should return false when comparing incorrect password", async () => {
    const hash = await sut.hash("password123");

    const result = await sut.compare("wrong-password", hash);

    expect(result).toBe(false);
  });
});
