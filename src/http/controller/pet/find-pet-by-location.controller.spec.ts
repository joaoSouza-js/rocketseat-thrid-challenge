import { PetDependency } from "@/domain/pet/value-object/pet-dependence";
import { PetEnergy } from "@/domain/pet/value-object/pet-energy";
import { PetSize } from "@/domain/pet/value-object/pet-size";
import { app } from "@/http/app";
import { clearPrismaRepository } from "@/http/utils/clear-prisma-repository";
import { orgAuthSessionRequest } from "@/http/utils/org-auth-session-session";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("get pet controller e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await clearPrismaRepository();
  });

  it.only("should be able to get a pet by location", async () => {
    const petState = "findpetState";
    const petCity = "findpetCity";
    const pet = {
      city: petCity,
      state: petState,
      description: "description",
      dependence: "high" as PetDependency,
      energy: "high" as PetEnergy,
      size: "medium" as PetSize,
      name: "pet-name",
    };
    const agent = request(app.server);
    const session = await orgAuthSessionRequest(agent);

    await agent.post("/api/pet").set("Authorization", `Bearer ${session.token}`).send(pet);

    const response = await agent
      .get(`/api/pet?state=${petState}&city=${petCity}`)
      .set("Authorization", `Bearer ${session.token}`);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.total).toBe(1);
    expect(response.body.pets).toHaveLength(1);

    expect(response.body).toEqual(
      expect.objectContaining({
        total: 1,
        pets: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
          }),
        ]),
      }),
    );
  });
});
