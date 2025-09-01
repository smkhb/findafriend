import { PetsRepo } from "./pets-repo";
import { Pet as DomainPet } from "../entities/pet";

export class InMemoryPetsRepo implements PetsRepo {
  public items: DomainPet[] = [];

  async createPet(org: DomainPet): Promise<void> {
    this.items.push(org);
  }

  async findByOrgID(orgID: string[], page: number): Promise<DomainPet[]> {
    return this.items
      .filter((pet) => orgID.includes(pet.orgID.toString()))
      .slice((page - 1) * 20, page * 20);
  }
}
