import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getPet } from "./get-pet";

export async function petRoutes(app: FastifyInstance) {
  app.post("/pet", create);
  app.get("/pet", getPet);
}
