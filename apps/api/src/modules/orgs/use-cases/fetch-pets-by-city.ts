import { Pet as PetDomain } from "../../pets/entities/pet";
import { PetsRepo } from "../../pets/repos/pets-repo";
import { ORGSRepo } from "../repos/orgs-repo";

interface FetchPetsByCityUseCaseRequest {
  city: string;
  page: number;
}

interface FetchPetsByCityUseCaseResponse {
  pets: PetDomain[];
}

export class FetchPetsByCityUseCase {
  constructor(private orgsRepo: ORGSRepo, private petsRepo: PetsRepo) {}

  async execute({
    city,
    page = 1,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const orgs = await this.orgsRepo.findByCity(city);
    const orgsIDs = orgs.map((org) => org.id.toString());
    const pets = await this.petsRepo.findByOrgID(orgsIDs, page);
    return {
      pets,
    };
  }
}
