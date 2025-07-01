import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticateORG } from "../../modules/orgs/use-cases/factories/make-authenticate-org";
import { InvalidCredentialsError } from "../../core/errors/invalid-credentials-error";
import { ORGNotFoundError } from "../../core/errors/org-not-found.error";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateORGSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const { email, password } = authenticateORGSchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateORG();

    const { org } = await authenticateUseCase.execute({ email, password });
    const token = await reply.jwtSign({ role: org.name });
    return reply.status(201).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }
    console.error("Error creating organization:", error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}
