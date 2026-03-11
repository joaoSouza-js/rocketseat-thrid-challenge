import { PetDependency } from "@/domain/pet/value-object/pet-dependence";
import { PetEnergy } from "@/domain/pet/value-object/pet-energy";
import { PetSize } from "@/domain/pet/value-object/pet-size";
import { app } from "@/http/app";
import { clearPrismaRepository } from "@/http/utils/clear-prisma-repository";
import { orgAuthSessionRequest } from "@/http/utils/org-auth-session-session";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("create pet controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await clearPrismaRepository();
  });

  it("should create a pet when authenticated org sends valid data", async () => {
    const pet = {
      city: "selectedCity",
      state: "selectedState",
      description: "description",
      dependence: "high" as PetDependency,
      energy: "high" as PetEnergy,
      size: "medium" as PetSize,
      name: "pet-name",
    };
    const agent = request(app.server);
    const session = await orgAuthSessionRequest(agent);

    const response = await agent
      .post("/api/pet")
      .set("Authorization", `Bearer ${session.token}`)
      .send(pet);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("pet");
    expect(response.body.pet).toHaveProperty("id");
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });
});
