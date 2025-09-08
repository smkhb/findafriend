import { Prisma, Pet as PrismaPet } from "@prisma/client";
import { Pet as DomainPet } from "../entities/pet";
import { Age } from "../entities/enums/age";
import { UniqueEntityID } from "../../../core/utils/unique-entity-id";
import { EnergyLevel } from "../entities/enums/energy-level";
import { IndependenceLevel } from "../entities/enums/indepence-level";
import { Size } from "../entities/enums/size";
import { EnvironmentSize } from "../entities/enums/environment-size";

export class PrismaPetMapper {
  static toDomain(raw: PrismaPet): DomainPet {
    return DomainPet.create({
      name: raw.name,
      orgID: new UniqueEntityID(raw.orgId),
      age: raw.age as Age,
      energyLevel: raw.energyLevel as EnergyLevel,
      independenceLevel: raw.independenceLevel as IndependenceLevel,
      size: raw.size as Size,
      environmentSize: raw.environmentSize as EnvironmentSize,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ? raw.updatedAt : undefined,
    });
  }

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
