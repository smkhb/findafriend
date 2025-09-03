import { Prisma, Pet as PrismaPet } from "@prisma/client";
import { Pet as DomainPet } from "../entities/pet";

import { UniqueEntityID } from "../../../core/utils/unique-entity-id";
import { Age } from "../entities/enums/age";
import { EnergyLevel } from "../entities/enums/energy-level";
import { IndependenceLevel } from "../entities/enums/indepence-level";
import { Size } from "../entities/enums/size";
import { EnvironmentSize } from "../entities/enums/environment-size";

export class PrismaPetMapper {
  // static toDomain(raw: PrismaPet): DomainPet {
  //   return DomainPet.create(
  //     {
  //       name: raw.name,
  //       description: raw.description,
  //       age: Age,
  //       energyLevel: EnergyLevel,
  //       independenceLevel: IndependenceLevel,
  //       size: Size,
  //       environmentSize: EnvironmentSize,
  //       orgId: raw.orgId,
  //       createdAt: raw.createdAt,
  //       updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : null,
  //     },
  //     new UniqueEntityID(raw.id)
  //   );
  // }

  static toPrisma(pet: DomainPet): Prisma.PetUncheckedCreateInput {
    return {
      id: pet.id.toString(),
      name: pet.name,
      orgId: pet.orgID.toString(),
      description: pet.description,
      age: pet.age,
      energyLevel: pet.energyLevel,
      independenceLevel: pet.independenceLevel,
      size: pet.size,
      environmentSize: pet.environmentSize,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt ? pet.updatedAt : undefined,
    };
  }
}
