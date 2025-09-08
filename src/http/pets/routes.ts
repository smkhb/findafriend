import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function petRoutes(app: FastifyInstance) {
  app.post("/pet", create);
}
