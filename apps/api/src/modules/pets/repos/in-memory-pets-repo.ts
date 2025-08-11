import { PetsRepo } from "./pets-repo";
import { Pet as DomainPet } from "../entities/pet";

export class InMemoryPetsRepo implements PetsRepo {
  public items: DomainPet[] = [];

  async createPet(org: DomainPet): Promise<void> {
    this.items.push(org);
  }
}
