import { app } from "./app";
import { env } from "./env";

app.listen({ port: env.PORT }).then(() => {
  console.log("API is running on http://localhost:3333");
});
