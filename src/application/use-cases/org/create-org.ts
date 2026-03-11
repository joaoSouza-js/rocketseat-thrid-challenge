import { HashGenerator } from "@/application/ports/hash-generator";
import { Org } from "../../../domain/org/entities/org";
import { OrgRepository } from "../../../domain/org/repositories/org-repository";
import { CreateOrgCommand, CreateOrgResponse } from "../../dto/org/create-org-command";
import { EmailAlreadyExistError } from "../../error/email-already-exist-error";
import { IdGenerator } from "../../ports/id-generator";

interface Repositories {
  orgs: OrgRepository;
}

interface Services {
  idGenerator: IdGenerator;
  hashGenerator: HashGenerator;
}

interface CreateOrgUseCaseDeps {
  repositories: Repositories;
  services: Services;
}

export class CreateOrgUseCase {
  private orgs: OrgRepository;
  private idGenerator: IdGenerator;
  private hashGenerator: HashGenerator;

  constructor(private readonly deps: CreateOrgUseCaseDeps) {
    this.orgs = deps.repositories.orgs;
    this.idGenerator = this.deps.services.idGenerator;
    this.hashGenerator = this.deps.services.hashGenerator;
  }

  async execute(input: CreateOrgCommand): Promise<CreateOrgResponse> {
    const org = await this.orgs.findByEmail(input.email);

    if (org != null) {
      throw new EmailAlreadyExistError(input.email);
    }

    const passwordHash = await this.hashGenerator.hash(input.password);

    const newOrg = Org.create({
      id: this.idGenerator.next(),
      description: input.description,
      passwordHash: passwordHash,
      email: input.email,
      name: input.name,
      phone: input.phone,
    });
    await this.orgs.save(newOrg);

    return {
      org: {
        id: newOrg.id,
      },
    };
  }
}
