import fastify from "fastify";

const app = fastify();

app.get("/", () => {
  return "Welcome to the Find a Friend API!";
});

app.listen({ port: 3333 }).then(() => {
  console.log("API is running on http://localhost:3333");
});
