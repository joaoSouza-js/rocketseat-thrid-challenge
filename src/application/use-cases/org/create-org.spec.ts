import { describe, it, expect, vi, beforeEach } from "vitest";
import { OrgRepository } from "@/domain/org/repositories/org-repository";
import { InMemoryOrgRepository } from "@/infra/repositories/in-memory/org-in-memory-repository";
import { IdGenerator } from "@/application/ports/id-generator";
import { randomUUID } from "node:crypto";
import { CreateOrgUseCase } from "./create-org";
import { EmailAlreadyExistError } from "@/application/error/email-already-exist-error";
describe("create org user case", () => {
  let sut: CreateOrgUseCase;
  let orgs: OrgRepository;
  let idGenerator: IdGenerator;
  beforeEach(() => {
    orgs = new InMemoryOrgRepository();
    idGenerator = {
      next: vi.fn(() => randomUUID()),
    };
    sut = new CreateOrgUseCase({
      repositories: { orgs },
      services: { idGenerator },
    });
  });

  it("should create a new org", async () => {
    const org = {
      name: "joe doe",
      email: "joe@doe.com",
      phone: "123456789",
      description: "any_description",
    };
    const response = await sut.execute(org);
    expect(response.org.id).toEqual(expect.any(String));
    expect(await orgs.findByEmail("joe@doe.com")).not.toBeNull();
  });

  it("should throw EmailAlreadyExistError if email already exist", async () => {
    const user = {
      name: "joe doe",
      email: "joe@doe.com",
      phone: "123456789",
      description: "any_description",
    };

    await sut.execute(user);
    await expect(sut.execute(user)).rejects.toBeInstanceOf(EmailAlreadyExistError);
  });
});
