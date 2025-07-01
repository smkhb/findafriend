import { env } from "./env";
import fastify from "fastify";
import { orgRoutes } from "./http/orgs/routes";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, { secret: env.JWT_SECRET });
app.register(orgRoutes);

app.listen({ port: env.PORT }).then(() => {
  console.log("API is running on http://localhost:3333");
});
