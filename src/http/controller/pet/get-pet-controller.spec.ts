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

    it("should be able to get a pet by id", async () => {
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

        const petCreationResponse = await agent
            .post("/api/pet")
            .set("Authorization", `Bearer ${session.token}`)
            .send(pet);

        await agent
            .post("/api/pet")
            .set("Authorization", `Bearer ${session.token}`)
            .send({
                ...pet,
                city: "otherCity",
            });

        const response = await agent.get(`/api/pet/${petCreationResponse.body.pet.id}`).set("Authorization", `Bearer ${session.token}`)

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("pet");
        expect(response.body.pet).toHaveProperty("id");

    })
})