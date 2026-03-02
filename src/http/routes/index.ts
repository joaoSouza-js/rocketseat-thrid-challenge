import { FastifyInstance } from "fastify";
import { createOrgController } from "../controller/create-org.controller";

export async function appRoutes(app: FastifyInstance) {
    app.post("/org", createOrgController)
}