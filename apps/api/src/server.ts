import { env } from "./env";
import fastify from "fastify";
import { orgRoutes } from "./http/orgs/routes";

export const app = fastify();

app.register(orgRoutes);

app
  .listen({ port: env.PORT })
  .then(() => {
  console.log("API is running on http://localhost:3333");
});
