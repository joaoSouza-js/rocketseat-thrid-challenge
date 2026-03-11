import { prisma } from "../../infra/repositories/prisma/index";
export async function clearPrismaRepository() {

  await prisma.pet.deleteMany();
  await prisma.org.deleteMany();
}
