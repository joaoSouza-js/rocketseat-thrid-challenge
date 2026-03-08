import { app } from "@/http/app";
import { clearPrismaRepository } from "@/http/utils/clear-prisma-repository";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("authenticate org controller", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        app.close()
    })

    beforeEach(async () => {
        await clearPrismaRepository()
    })

    it("should authenticate a org", async () => {
        const orgEmail = "org@gmail.com"
        const orgPassword = "org-password"
        const org = {
            name: "joe doe",
            email: orgEmail,
            password: orgPassword,
            phone: "123456789",
            description: "any_description",
        };
        const agent = request(app.server)
        await agent.post('/api/org').send(org)
        const response = await agent.post("/api/org/session").send({
            email: orgEmail,
            password: orgPassword
        })
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.objectContaining({
            token: expect.any(String),
            org: expect.objectContaining({
                id: expect.any(String),
            })
        }))

    })
})