import { prisma } from "../../../lib/prisma";
import { Pet as DomainPet } from "../entities/pet";
import { PrismaPetMapper } from "../mapper/prisma-pet-mapper";
import { PetsRepo } from "./pets-repo";

export class PrismaPetsRepo implements PetsRepo {
  async createPet(raw: DomainPet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(raw);

    await prisma.pet.create({
      data,
    });
  }
}
