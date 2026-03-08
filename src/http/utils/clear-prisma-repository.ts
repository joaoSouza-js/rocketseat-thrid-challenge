import { env } from "@/config/env";
import { prisma } from "../../infra/repositories/prisma/index";
export async function clearPrismaRepository() {
    const { NODE_ENV } = env

    if (NODE_ENV !== "test") {
        throw new Error("clearPrismaRepository can only be used in test environment")
    }


    await prisma.pet.deleteMany()
    await prisma.org.deleteMany()



}