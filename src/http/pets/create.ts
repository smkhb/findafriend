import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreatePet } from "../../modules/pets/use-cases/factories/make-create-pet";

import { Age } from "../../modules/pets/entities/enums/age";
import { EnergyLevel } from "../../modules/pets/entities/enums/energy-level";
import { Size } from "../../modules/pets/entities/enums/size";
import { IndependenceLevel } from "../../modules/pets/entities/enums/indepence-level";
import { EnvironmentSize } from "../../modules/pets/entities/enums/environment-size";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetSchema = z.object({
    name: z.string().min(1, "Name is required"),
    orgID: z.string().uuid("Invalid organization ID format"),
    description: z.string().optional(),

    age: z.nativeEnum(Age),
    energyLevel: z.nativeEnum(EnergyLevel),
    size: z.nativeEnum(Size),
    independenceLevel: z.nativeEnum(IndependenceLevel),
    environmentSize: z.nativeEnum(EnvironmentSize),
  });

  const {
    name,
    orgID,
    description,
    age,
    energyLevel,
    independenceLevel,
    size,
    environmentSize,
  } = createPetSchema.parse(request.body);

  try {
    const createPetUseCase = makeCreatePet();

    await createPetUseCase.execute({
      name,
      orgID,
      description,
      age,
      energyLevel,
      independenceLevel,
      size,
      environmentSize,
    });
  } catch (error) {
    console.error("Error creating Pet:", error);
    return reply.status(500).send({ message: "Internal server error" });
  }
  return reply.status(201).send();
}
