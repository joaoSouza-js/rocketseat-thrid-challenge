import { FastifyInstance } from "fastify";
import { authenticateOrgController } from "../controller/org/autheticate-org.controller";
import { createOrgController } from "../controller/org/create-org.controller";
import { protectRoutes } from "./protected";

export async function appRoutes(app: FastifyInstance) {
  app.post("/org", createOrgController);
  app.post("/org/session", authenticateOrgController);
  app.register(protectRoutes);
}
