import { Pet as DomainPet } from "../entities/pet";

export abstract class PetsRepo {
  abstract createPet(data: DomainPet): Promise<void>;
}
 