import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetPet } from "../../modules/pets/use-cases/factories/make-get-pet";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetSchema = z.object({
    petID: z.string().uuid("Invalid Pet ID"),
  });

  const { petID } = createPetSchema.parse(request.query);

  try {
    const getPetUseCase = makeGetPet();

    const pet = await getPetUseCase.execute({
      petID,
    });
    return reply.status(200).send({ pet });
  } catch (error) {
    console.error("Error getting Pet:", error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}
