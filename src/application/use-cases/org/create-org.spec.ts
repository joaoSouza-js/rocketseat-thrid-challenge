import { EmailAlreadyExistError } from "@/application/error/email-already-exist-error";
import { HashGenerator } from "@/application/ports/hash-generator";
import { IdGenerator } from "@/application/ports/id-generator";
import { OrgRepository } from "@/domain/org/repositories/org-repository";
import { InMemoryOrgRepository } from "@/infra/repositories/in-memory/org-in-memory-repository";
import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateOrgUseCase } from "./create-org";
describe("create org user case", () => {
  let sut: CreateOrgUseCase;
  let orgs: OrgRepository;
  let idGenerator: IdGenerator;
  let hashGenerator: HashGenerator
  beforeEach(() => {
    orgs = new InMemoryOrgRepository();
    idGenerator = {
      next: vi.fn(() => randomUUID()),
    };
    hashGenerator = {
      compare: vi.fn(() => Promise.resolve(false)),
      hash: vi.fn(() => Promise.resolve("hash")),
    }
    sut = new CreateOrgUseCase({
      repositories: { orgs },
      services: { idGenerator, hashGenerator },
    });
  });

  it("should create a new org", async () => {
    const org = {
      name: "joe doe",
      email: "joe@doe.com",
      phone: "123456789",
      password: "any_password",
      description: "any_description",
    };
    const response = await sut.execute(org);
    expect(response.org.id).toEqual(expect.any(String));
    expect(await orgs.findByEmail("joe@doe.com")).not.toBeNull();
  });

  it("should throw EmailAlreadyExistError if email already exist", async () => {
    const org = {
      name: "joe doe",
      password: "any_password",
      email: "joe@doe.com",
      phone: "123456789",
      description: "any_description",
    };

    await sut.execute(org);
    await expect(sut.execute(org)).rejects.toBeInstanceOf(EmailAlreadyExistError);
  });
});
