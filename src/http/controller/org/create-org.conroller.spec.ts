import { app } from "@/http/app";
import { clearPrismaRepository } from "@/http/utils/clear-prisma-repository";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
describe("create org controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await clearPrismaRepository();
  });

  it("should create an org", async () => {
    const org = {
      name: "joe doe",
      email: "joe@doe.com",
      phone: "123456789",
      password: "any_password",
      description: "any_description",
    };
    const response = await request(app.server).post("/api/org").send(org);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        org: {
          id: expect.any(String),
        },
      }),
    );
  });
});
