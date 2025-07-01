import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../../core/utils/jwt-verify";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/signup", create);
  app.post("/signin", authenticate);
}
