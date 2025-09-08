import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { Age } from "../../modules/pets/entities/enums/age";
import { EnergyLevel } from "../../modules/pets/entities/enums/energy-level";
import { Size } from "../../modules/pets/entities/enums/size";
import { IndependenceLevel } from "../../modules/pets/entities/enums/indepence-level";
import { makeFetchPetsByCity } from "../../modules/orgs/use-cases/factories/make-fetch-pets-by-city";
import { EnvironmentSize } from "../../modules/pets/entities/enums/environment-size";

export async function fetchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPetsByCitySchema = z.object({
    city: z.string().min(1, "City is required"),
    page: z.coerce.number().int().min(1).default(1),
    order: z.enum(["asc", "desc"]).default("desc").optional(),

    age: z.nativeEnum(Age).optional(),
    energyLevel: z.nativeEnum(EnergyLevel).optional(),
    size: z.nativeEnum(Size).optional(),
    independenceLevel: z.nativeEnum(IndependenceLevel).optional(),
    environmentSize: z.nativeEnum(EnvironmentSize).optional(),
  });

  const {
    city,
    page,
    order,
    age,
    energyLevel,
    independenceLevel,
    size,
    environmentSize,
  } = fetchPetsByCitySchema.parse(request.query);

  try {
    const fetchPetsByCityUseCase = makeFetchPetsByCity();

    const { pets } = await fetchPetsByCityUseCase.execute({
      city,
      page,
      order,
      filters: { age, energyLevel, independenceLevel, size, environmentSize },
    });
    return reply.status(200).send({ pets });
  } catch (error) {
    console.error("Error fetching pets:", error);
    return reply.status(500).send({ message: "Internal server error." });
  }
}
