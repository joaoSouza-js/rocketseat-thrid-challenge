import { FastifyInstance } from "fastify";
import { createPetController } from "../controller/pet/create-pet.controller";
import { findPetByLocationController } from "../controller/pet/find-pet-by-location.controller";
import { getPetController } from "../controller/pet/get-pet.controller";
import { jwtMiddleware } from "../middleware/jwt-middleware";
import { roleVerifyMiddleware } from "../middleware/role-verify-middleware";

export async function protectRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtMiddleware);
  app.post("/pet", { onRequest: roleVerifyMiddleware(["ORG"]) }, createPetController);
  app.get("/pet/:id", getPetController);
  app.get("/pet", findPetByLocationController);
}
