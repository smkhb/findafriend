import { Pet as DomainPet } from "../entities/pet";
import { PetsRepo } from "./pets-repo";

import { IndependenceLevel } from "../entities/enums/indepence-level";
import { EnvironmentSize } from "../entities/enums/environment-size";
import { EnergyLevel } from "../entities/enums/energy-level";
import { Size } from "../entities/enums/size";
import { Age } from "../entities/enums/age";

export class InMemoryPetsRepo implements PetsRepo {
  public items: DomainPet[] = [];

  async createPet(org: DomainPet): Promise<void> {
    this.items.push(org);
  }

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
    const rawPets = this.items.filter((pet) =>
      orgID.includes(pet.orgID.toString())
    );

    const filteredPets = rawPets.filter((pet) => {
      return (
        (!filters.age || pet.age === filters.age) &&
        (!filters.size || pet.size === filters.size) &&
        (!filters.energyLevel || pet.energyLevel === filters.energyLevel) &&
        (!filters.independenceLevel ||
          pet.independenceLevel === filters.independenceLevel) &&
        (!filters.environmentSize ||
          pet.environmentSize === filters.environmentSize)
      );
    });

    const sortedPets = filteredPets.sort((a, b) => {
      if (order === "asc") {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    const paginatedPets = sortedPets.slice((page - 1) * 20, page * 20);

    return paginatedPets;
  }

  async findByID(petID: string): Promise<DomainPet | null> {
    const pet = this.items.find((item) => item.id.toString() === petID);
    if (!pet) {
      return null;
    }
    return pet;
  }
}
