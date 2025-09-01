import { Pet as DomainPet } from "../entities/pet";

export abstract class PetsRepo {
  abstract createPet(data: DomainPet): Promise<void>;
  abstract findByOrgID(orgID: string[], page: number): Promise<DomainPet[]>;
}
 