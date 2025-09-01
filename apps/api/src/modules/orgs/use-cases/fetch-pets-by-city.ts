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
    const org = await this.orgsRepo.findByCity(city);
    const pets = await this.petsRepo.findByOrgID(org[0].id.toString()); //! Fetch only pets from the first org found in the city [FIX]
    return {
      pets,
    };
  }
}
