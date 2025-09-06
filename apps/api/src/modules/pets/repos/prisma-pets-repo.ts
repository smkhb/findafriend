import { prisma } from "../../../lib/prisma";
import { Age } from "../entities/enums/age";
import { EnergyLevel } from "../entities/enums/energy-level";
import { EnvironmentSize } from "../entities/enums/environment-size";
import { IndependenceLevel } from "../entities/enums/indepence-level";
import { Size } from "../entities/enums/size";
import { Pet as DomainPet } from "../entities/pet";
import { PrismaPetMapper } from "../mapper/prisma-pet-mapper";
import { PetsRepo } from "./pets-repo";

export class PrismaPetsRepo implements PetsRepo {
  async searchMany(
    orgID: string[],
    page: number,
    order: "asc" | "desc",
    filters: {
      age?: Age;
      size?: Size;
      energyLevel?: EnergyLevel;
      independenceLevel?: IndependenceLevel;
      environmentSize?: EnvironmentSize;
    }
  ): Promise<DomainPet[]> {
    const data = await prisma.pet.findMany({
      where: {
        orgId: { in: orgID },
        ...filters,
      },
    });

    return data.map(PrismaPetMapper.toDomain);
  }

  async createPet(raw: DomainPet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(raw);

    await prisma.pet.create({
      data,
    });
  }
}
