import { Pet as DomainPet } from "../entities/pet";

import { IndependenceLevel } from "../entities/enums/indepence-level";
import { EnvironmentSize } from "../entities/enums/environment-size";
import { EnergyLevel } from "../entities/enums/energy-level";
import { Size } from "../entities/enums/size";
import { Age } from "../entities/enums/age";

export abstract class PetsRepo {
  abstract createPet(data: DomainPet): Promise<void>;
  abstract findByID(petID: string): Promise<DomainPet | null>;
  abstract searchMany(
    orgID: string[],
    page: number,
    order: "asc" | "desc",
    filters: {
      age?: Age;
      size?: Size;
      energyLevel?: EnergyLevel;
      independenceLevel?: IndependenceLevel;
      environmentSize?: EnvironmentSize;
    },
  ): Promise<DomainPet[]>;
}
