import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateORG } from "../../modules/orgs/use-cases/factories/make-create-org";
import { ORGAlreadyExistsError } from "../../core/errors/org-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createORGSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    description: z.string().optional(),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip code is required"),
  });

  const {
    name,
    email,
    password,
    description,
    phone,
    address,
    city,
    state,
    zip,
  } = createORGSchema.parse(request.body);

  try {
    const createORGUseCase = makeCreateORG();

    await createORGUseCase.execute({
      name,
      email,
      password,
      description,
      phone,
      address,
      city,
      state,
      zip,
    });
  } catch (error) {
    if (error instanceof ORGAlreadyExistsError) {
      return reply.status(409).send({ message: "Email already in use" });
    }
    console.error("Error creating organization:", error);
    return reply.status(500).send({ message: "Internal server error" });
  }
  return reply.status(201).send();
}
