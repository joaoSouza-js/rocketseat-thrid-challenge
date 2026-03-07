import { CredentialError } from "@/application/error/credential-error";
import { ResourceNotFoundError } from "@/application/error/resource-not-found-error";
import { HashGenerator } from "@/application/ports/hash-generator";
import { Org } from "@/domain/org/entities/org";
import { OrgRepository } from "@/domain/org/repositories/org-repository";
import { InMemoryOrgRepository } from "@/infra/repositories/in-memory/org-in-memory-repository";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthenticateOrgUseCase } from "./authenticate-org";

describe("authenticate org use case", () => {
    let sut: AuthenticateOrgUseCase;
    let orgRepository: OrgRepository;
    let hashGenerator: HashGenerator;

    beforeEach(() => {
        orgRepository = new InMemoryOrgRepository();
        hashGenerator = {
            compare: vi.fn((value: string, hash: string) => Promise.resolve(hash.includes(value))),
            hash: vi.fn((value) => Promise.resolve(`hash-${value}`)),
        };
        sut = new AuthenticateOrgUseCase({
            repositories: {
                orgs: orgRepository,
            },
            services: {
                hashGenerator: hashGenerator,
            },
        });
    });

    it("should throw a Resource not Found Error if org dint't exist", async () => {
        await expect(sut.execute({ email: "org@gmail.com", password: "password" })).rejects.instanceof(
            ResourceNotFoundError,
        );
    });

    it("should throw a CredentialError if  user if Credentials are incorrect ", async () => {
        const orgEmail = "ogr.ema@gmai.com";
        const orgPassword = "org-password";
        const orgPasswordHash = await hashGenerator.hash(orgPassword);

        const org = Org.create({
            description: "description",
            email: orgEmail,
            id: "org-id",
            name: "javi",
            passwordHash: orgPasswordHash,
            phone: "30i2-0121289023",
        });

        orgRepository.save(org);

        await expect(sut.execute({ email: orgEmail, password: "wrong-password" })).rejects.instanceOf(
            CredentialError,
        );
    });

    it("should be able to find a org", async () => {
        const orgEmail = "ogr.ema@gmai.com";
        const orgPassword = "org-password";
        const orgPasswordHash = await hashGenerator.hash(orgPassword);

        const org = Org.create({
            description: "description",
            email: "ogr.ema@gmai.com",
            id: "org-id",
            name: "javi",
            passwordHash: orgPasswordHash,
            phone: "30i2-0121289023",
        });

        orgRepository.save(org);

        const response = await sut.execute({
            email: orgEmail,
            password: orgPassword
        })

        expect(response.org.id).toEqual(expect.any(String))
    })
});
