import { Email } from "@/domain/value-object/email";
import { OrgModel } from "@/generated/models";
import { Org } from "../../../domain/org/entities/org";
import { OrgRepository } from "../../../domain/org/repositories/org-repository";
import { prisma } from "./index";

export class PrismaOrgRepository implements OrgRepository {
  private formatOrg(org: OrgModel): Org {
    const orgEmail = Email.fromString(org.email);
    const orgFormatted = Org.rehydrate({
      createdAt: org.createdAt,
      description: org.description,
      passwordHash: org.password,
      email: orgEmail,
      id: org.id,
      name: org.name,
      phone: org.phone,
    });
    return orgFormatted;
  }
  async save(input: Org): Promise<void> {
    await prisma.org.create({
      data: {
        password: input.passwordHash,
        id: input.id,
        description: input.description,
        email: input.email.toString(),
        name: input.name,
        phone: input.phone,
      },
    });
  }
  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });
    if (org === null) return null;
    return this.formatOrg(org);
  }
  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });
    if (org === null) return null;
    return this.formatOrg(org);
  }
}
