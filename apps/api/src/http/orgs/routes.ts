import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { fetchPetsByCity } from "./fetch-pets-by-city";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/signup", create);
  app.post("/signin", authenticate);
  app.get("/pets", fetchPetsByCity);
}
